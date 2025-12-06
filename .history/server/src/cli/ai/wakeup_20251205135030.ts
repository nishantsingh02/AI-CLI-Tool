import chalk from "chalk";
import { Command } from "commander";
import yoctoSpinner from "yocto-spinner";
import { getStoredToken } from "../../lib/token.js";
import prisma from "../../lib/db.js";
import { select } from "@clack/prompts"

const wakeUpAction = async () => {
    const token = await getStoredToken();

    if(!token?.access_token) {
        console.log(chalk.red("Not Authenticated. Please Login"))
        return;
    }

    const spinner = yoctoSpinner({text: "Fetching User information..."})
    spinner.start()

    const user = await prisma.user.findFirst({
        where: {
            sessions: {
                some: {
                    token:token.access_token
                }
            }
        },
        select: {
            id:true,
            name: true,
            email: true,
            image: true
        }
    })
    spinner.stop()

    if(!user) {
        console.log(chalk.red("User not found."));
    }

    console.log(chalk.green(`Welcome back, ${user?.name}!\n`))
}