import chalk from "chalk";
import { Command } from "commander";
import yoctoSpinner from "yocto-spinner";
import { getStoredToken } from "../../lib/token.js";
import prisma from "../../lib/db.js";
import { select } from "@clack/prompts"

const wakeUpAction = async () => {
    const token = await getStoredToken();

    if(!token?.access_token) {
        console.log(chalk.red("Not Authenticated "))
    }
}