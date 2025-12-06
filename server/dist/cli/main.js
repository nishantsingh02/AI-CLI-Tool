#!/usr/bin/env node
import dotenv from "dotenv";
import chalk from "chalk";
import figlet from "figlet";
import gradient from "gradient-string";
import { Command } from "commander";
import { login, logout, whoami } from "../commands/auth/login.js";
import { wakeUp } from "./ai/wakeUp.js";
dotenv.config();
function main() {
    try {
        // console.clear(); // clean the console first
        const rynexGradient = gradient(["#00f2fe", "#4facfe", "#00c6ff"]);
        const subtitleGradient = gradient(["#a8edea", "#fed6e3"]);
        // display the banner
        const banner = figlet.textSync("RYNEX CLI", {
            font: "ANSI Shadow",
            horizontalLayout: "default",
        });
        console.log(rynexGradient.multiline(banner));
        // Decorative line
        console.log(chalk.cyan("═".repeat(60)));
        // Subtitle with icon and gradient
        console.log(subtitleGradient("  ✨ AI that lives in your command line ✨"));
        console.log(chalk.cyan("═".repeat(60)));
        console.log();
        // Additional fancy info
        console.log(chalk.dim("  Version: ") + chalk.bold.green("1.0.0"));
        console.log(chalk.dim("  Status:  ") + chalk.bold.green("● ") + chalk.green("Ready"));
        console.log();
        // Tips section
        console.log(chalk.yellow("  💡 Quick Start:"));
        console.log(chalk.gray("     • Type") +
            chalk.cyan(" 'help' ") +
            chalk.gray("to see available commands"));
        console.log(chalk.gray("     • Type") +
            chalk.cyan(" 'chat' ") +
            chalk.gray("to start a conversation"));
        console.log();
        console.log(chalk.dim("─".repeat(60)));
        console.log();
        const program = new Command("rynax"); // acces the command with rynex prefix
        // program.action(() => {
        //   program.help();
        // });
        program
            .name("rynex")
            .description("Your personal coder in the terminal")
            .version("1.0.0", "-v, --version");
        program.addCommand(login); // from login.ts
        program.addCommand(logout);
        program.addCommand(whoami);
        program.addCommand(wakeUp);
        program.configureHelp({ helpWidth: 0 });
        program.helpOption(false); // removes -h and --help
        program.addHelpCommand(false); // removes "help" subcommand
        program.parse();
    }
    catch (error) {
        console.log(chalk.red("Error running Rynex CLI:"), error);
        process.exit(1);
    }
}
main();
// import dotenv from "dotenv"
// import chalk from "chalk"
// import figlet from "figlet"
// import { Command } from "commander"
// dotenv.config();
// function main() {
//     // display a banner
//     console.log(
//         chalk.cyan(
//             figlet.textSync("Rynex CLI",{
//                 font: "Standard",
//                 horizontalLayout: "default"
//             })
//         )
//     )
//     console.log(chalk.gray("AI that lives in your command line. \n"))
// }
// main();
//# sourceMappingURL=main.js.map