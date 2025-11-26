import { cancel, confirm, intro, isCancel, outro } from "@clack/prompts";
import { logger } from "better-auth";
import { createAuthClient } from "better-auth/client";
import { deviceAuthorizationClient } from "better-auth/client/plugins";
import chalk from "chalk";
import { Command } from "commander";
import fs from "node:fs/promises"; // node inbuild allow file opeartaion
import open from "open";
import os from "os";
import path from "path";
import yoctoSpinner from "yocto-spinner"; // show a spinner in a terminal
import * as z from "zod";
import dotenv from "dotenv";
import prisma from "../../lib/db.js";
import { clearStoredToken, getStoredToken, isTokenExpired, requireAuth, storeToken } from "../../lib/token.js";
dotenv.config();
const URL = "http://localhost:3001"; // backend URL
const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
export const CONFIG_DIR = path.join(os.homedir(), ".better-auth"); // create a hidden folder in the user hoom dir
export const TOKEN_FILE = path.join(CONFIG_DIR, "token.json"); // inside that folder save a token.json file
export async function loginAction() {
    const options = z.object({
        serverUrl: z.string().optional(),
        clientId: z.string().optional(),
    });
    // extract the input
    const { serverUrl, clientId } = options.parse({});
    const url = serverUrl || URL;
    const id = clientId || CLIENT_ID || "";
    intro(chalk.bold("Auth CLI Login"));
    // token mangment
    const existingToken = await getStoredToken();
    const expired = await isTokenExpired();
    // this line checks whether the user canceled the request OR said “no.”
    // this confirm return true or false. user cancle the process or not
    if (existingToken && !expired) {
        const shouldReAuth = await confirm({
            message: "You are already loggedIn. Do you want to login Again.",
            initialValue: false,
        });
        // if user cancle the login process by pressing Esc or Ctrl+c
        if (isCancel(shouldReAuth) || !shouldReAuth) {
            cancel("Login Cancelled");
            process.exit(0);
        }
    }
    const authClient = createAuthClient({
        baseURL: url,
        plugins: [deviceAuthorizationClient()],
    });
    // add a spinner in the terminal
    const spinner = yoctoSpinner({ text: "Requesting Device authorization..." });
    spinner.start();
    try {
        const { data, error } = await authClient.device.code({
            client_id: id,
            scope: "openid profile email",
        });
        spinner.stop();
        if (error || !data) {
            logger.error(`Failed to request device authorization: ${error.error_description}`);
            process.exit(1);
        }
        const { device_code, user_code, verification_uri, verification_uri_complete, expires_in, interval, } = data;
        // display auth instruction
        console.log(chalk.cyan("Device Authorization Required"));
        console.log(`please visit" ${chalk.underline.blue(verification_uri_complete || verification_uri)} `);
        console.log(`Enter code: ${chalk.bold.green(user_code)}`);
        // ask user wants to open the browser
        const shouldOpen = await confirm({
            message: "Open browser automatically",
            initialValue: true,
        });
        if (!isCancel(shouldOpen) && shouldOpen) {
            const urlToOpen = verification_uri_complete || verification_uri;
            await open(urlToOpen);
        }
        // start polling
        console.log(chalk.gray(`Waiting for authorization (expires in ${Math.floor(expires_in / 60)} minutes)...`));
        // polling for the token
        const token = await pollForToken({
            authClient,
            device_code,
            clientId: id,
            interval,
        });
        if (token) {
            const saved = await storeToken(token);
            if (!saved) {
                console.log(chalk.yellow("\n⚠️  Warning: Could not save authentication token."));
                console.log(chalk.yellow("   You may need to login again on next use."));
            }
            //TODO: get the user data
            outro(chalk.gray("You can use AI Commands without loggin again.\n"));
            console.log(chalk.gray(`\n📁 Token saved to: ${TOKEN_FILE}`));
            console.log(chalk.gray("   You can now use AI commands without logging in again.\n"));
        }
    }
    catch (error) {
        spinner.stop();
        console.log(chalk.red("Unexpected error during authorization"), error);
        process.exit(1);
    }
}
async function pollForToken({ authClient, device_code, clientId, interval }) {
    let pollingInterval = interval ?? 5;
    const spinner = yoctoSpinner({ text: "", color: "cyan" });
    let dots = 0;
    let timeoutId = null; // track the timeout
    // clean up function 
    const cleanup = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
        if (spinner.isSpinning) {
            spinner.stop(); // stop the spinner
        }
    };
    // this promiss is from better-auth docs
    return new Promise((resolve, reject) => {
        const poll = async () => {
            dots = (dots + 1) % 4;
            spinner.text = chalk.gray(`Polling for authorization${".".repeat(dots)}${" ".repeat(3 - dots)}}`);
            if (!spinner.isSpinning)
                spinner.start();
            // polling implimantaion
            try {
                const { data, error } = await authClient.device.token({
                    grant_type: "urn:ietf:params:oauth:grant-type:device_code",
                    device_code: device_code,
                    client_id: clientId, // client_id: clientId, try this if something brakes
                    fetchOptions: {
                        headers: {
                            "user-agent": `My CLI`,
                        },
                    },
                });
                // console.log("DEBUG TOKEN RESPONSE:", data);
                if (data?.access_token) {
                    console.log(chalk.bold.yellow(`Your access token: ${data.access_token}`));
                    cleanup();
                    resolve(data); // promiss is getting resloved here
                    return; // stop further execution
                }
                else if (error) {
                    switch (error.error) {
                        case "authorization_pending":
                            // Continue polling
                            timeoutId = setTimeout(poll, pollingInterval * 1000);
                            break;
                        case "slow_down":
                            pollingInterval += 5;
                            timeoutId = setTimeout(poll, pollingInterval * 1000);
                            break;
                        case "access_denied":
                            cleanup();
                            console.error("Access was denied by the user");
                            reject(new Error("Access Denied"));
                            return;
                        case "expired_token":
                            cleanup();
                            console.error("The device code has expired. Please try again.");
                            reject(new Error("Token expired"));
                            return;
                        default:
                            cleanup();
                            logger.error(`Error: ${error.error_description}`); // logger is from better auth
                            reject(new Error(error.error_description || "Unknown error"));
                            return;
                    }
                }
                else {
                    // Continue polling if no data and no error
                    timeoutId = setTimeout(poll, pollingInterval * 1000);
                }
            }
            catch (error) {
                cleanup();
                logger.error(`Network error: ${error}`); // logger is from better auth
                reject(error);
            }
        };
        // start the first poll
        timeoutId = setTimeout(poll, pollingInterval * 1000);
    });
}
export async function logoutAction() {
    intro(chalk.bold("Logout"));
    const token = await getStoredToken();
    if (!token) {
        console.log(chalk.yellow("you're not logged in."));
        process.exit(0);
    }
    const shouldLogout = await confirm({
        message: "Are you sure you want to logout",
        initialValue: false,
    });
    if (isCancel(shouldLogout) || !shouldLogout) {
        cancel("Logout Cancelled");
        process.exit(0);
    }
    const cleared = await clearStoredToken();
    if (cleared) {
        outro(chalk.green("Successfully logged out!"));
    }
    else {
        console.log(chalk.yellow("Could not clear token file."));
    }
}
// who am i action
export async function whoamiAction() {
    const token = await requireAuth();
    if (!token?.access_token) {
        console.log("No access token found. Please login.");
        process.exit(1);
    }
    const user = await prisma.user.findFirst({
        where: {
            sessions: {
                some: {
                    token: token.access_token
                }
            }
        },
        select: {
            id: true,
            name: true,
            email: true,
            image: true
        }
    });
    console.log(chalk.bold.greenBright('\n┌─────────────────────────────────────────┐'));
    console.log(chalk.bold.greenBright('│') + chalk.bold.whiteBright('        USER INFORMATION         ') + chalk.bold.greenBright('        │'));
    console.log(chalk.bold.greenBright('├─────────────────────────────────────────┤'));
    console.log(chalk.bold.greenBright('│ ') + chalk.cyan('Name:  ') + chalk.white(user?.name?.padEnd(28)) + chalk.bold.greenBright(' │'));
    console.log(chalk.bold.greenBright('│ ') + chalk.cyan('Email: ') + chalk.white(user?.email?.padEnd(28)) + chalk.bold.greenBright(' │'));
    console.log(chalk.bold.greenBright('│ ') + chalk.cyan('ID:    ') + chalk.white(user?.id?.padEnd(28)) + chalk.bold.greenBright(' │'));
    console.log(chalk.bold.greenBright('└─────────────────────────────────────────┘\n'));
}
// command setup
export const login = new Command("login")
    .description("Authenticate your CLI and link it with your account.")
    .option("--server-url <url>", "The Better Auth server URL", URL)
    .option("--client-id <id>", "The OAuth client ID", CLIENT_ID)
    .action(loginAction);
export const logout = new Command("logout")
    .description("Authenticate your CLI and link it with your account.")
    .description("Logout and clear the stored credentials")
    .action(logoutAction);
export const whoami = new Command("whoami")
    .description("Authenticate your CLI and link it with your account.")
    .option("--server-url <url>", "The Better Auth server URL", URL)
    .action(whoamiAction);
//# sourceMappingURL=login.js.map