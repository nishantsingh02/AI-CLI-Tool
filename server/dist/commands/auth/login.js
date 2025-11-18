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
dotenv.config();
const URL = "http://localhost:3001";
const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CONFIG_DIR = path.join(os.homedir(), ".better-auth"); // create a hidden folder in the user hoom dir
const TOKEN_FILE = path.join(CONFIG_DIR, "token.json"); // inside that folder save a token.json file
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
    // TODO: Change this with token mangment utils
    const existingToken = false;
    const expired = false;
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
            logger.error(`Failed to request device authorization: ${error?.error_description}`);
            process.exit(1);
        }
        const { device_code, user_code, verification_uri, verification_uri_complete, expires_in, interval, } = data;
        // Choose correct URL
        const urlToOpen = verification_uri_complete ||
            verification_uri ||
            "";
        console.log(chalk.cyan("\nDevice Authorization Required"));
        console.log(`Visit: ${chalk.underline.blue(urlToOpen)}`);
        console.log(`Enter Code: ${chalk.bold.green(user_code)}\n`);
        // Ask user to auto-open browser
        const shouldOpen = await confirm({
            message: "Open browser automatically?",
            initialValue: true,
        });
        if (isCancel(shouldOpen)) {
            cancel("Login cancelled.");
            process.exit(0);
        }
        if (shouldOpen) {
            console.log(chalk.gray("Opening browser..."));
            await open(urlToOpen); // 🔥 Browser will open here
        }
        console.log(chalk.gray(`Waiting for authorization (expires in ${Math.floor(expires_in / 60)} minutes)...`));
    }
    catch (error) {
        spinner.stop();
        console.log(chalk.red("Unexpected error during authorization"));
    }
}
// command setup
export const login = new Command("login")
    .description("Authenticate your CLI and link it with your account.")
    .option("--server-url <url>", "The Better Auth server URL", URL)
    .option("--client-id <id>", "The OAuth client ID", CLIENT_ID)
    .action(loginAction);
//# sourceMappingURL=login.js.map