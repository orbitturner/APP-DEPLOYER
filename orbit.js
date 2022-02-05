#! /usr/bin/env node

/***
 *    ██╗    ██╗██╗   ██╗██████╗ ██╗   ██╗███████╗       ██████╗██╗     ██╗
 *    ██║    ██║██║   ██║██╔══██╗██║   ██║██╔════╝      ██╔════╝██║     ██║
 *    ██║ █╗ ██║██║   ██║██████╔╝██║   ██║███████╗█████╗██║     ██║     ██║
 *    ██║███╗██║██║   ██║██╔══██╗██║   ██║╚════██║╚════╝██║     ██║     ██║
 *    ╚███╔███╔╝╚██████╔╝██║  ██║╚██████╔╝███████║      ╚██████╗███████╗██║
 *     ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝       ╚═════╝╚══════╝╚═╝
 *                                                                         
 */


import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { Command } from 'commander';
import { createSpinner } from 'nanospinner';
import { sleep, isEmpty } from "./core/utils.js";
import { mainMenuStream, menuChoice, moduleList } from "./core/main-menu.js";
import { InitDeployModule } from "./core/deploy/deployer.js";

// ===============================
// INITIALIZATION
// ===============================
let APP_REPO = '';
let APP_NAME = '';
let APP_PATH = '';
const program  = new Command();
await BootStrap();
// ===============================

// ====================================================
// BOOT PARAMS HANDLING
// ====================================================
async function BootStrap() {
    program
    .name('WURUS-CLI')
    .description('A CLI that helps you deploy, update & monitor your Front/Back-end JS App in few steps easily.')
    .version("1.0.1"); // Todo: Find a way to read the package.json without using --experimental-json-modules.

    program
        .option('-d, --deploy <repo>', 'Switch to deployment process with given Repository.')
        .option('-u, --update <path>', 'Update app at given Path with his default Repository.')
        .option('-m, --monitor <app_name>', 'Switch to MONITORING Mode of The Given App.');
    // allow commander to parse `process.argv`
    program.parse();

    const options = program.opts();

    if (options.deploy) {
        APP_REPO = options.deploy;
        welcome(`-> Launched in DEPLOY MODE. Given Repo : [${APP_REPO}]`);
    }
    if (options.update) {
        APP_PATH = options.update;
        welcome(`-> Launched in UPDATE MODE. Given Path : [${APP_PATH}]`);
    }
    if (options.monitor) {
        APP_NAME = options.monitor;
        welcome(`-> Launched in MONITORING MODE. Given App NAME : [${APP_NAME}]`);
    }
    if (isEmpty(options)) {
        await welcome();
        await sleep(100);
        return _ShowMainMenu();
    }
}; 

// ====================================================


// ====================================================
// 🚩 MAIN 🚀
// ====================================================
export function _ShowMainMenu() {
    console.log(gradient.pastel.multiline(mainMenuStream) + '\n');
    inquirer.prompt(menuChoice).then((answer) =>{
        console.log(answer, typeof answer)

        switch (answer.choosedMenu) {
            case 1:
                console.log(chalk.green(`🔰 Entering Module: ${moduleList.DEPLOY} 🔰`))
                InitDeployModule();
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
            case 0:
                bye();
                break;
        }
    });
}

async function welcome(message = 'You Called the CLI without params.\nBootstraping to Main Menu...\n') {
    console.clear();
    console.clear(); // Dumb Bug Where Console doesn't get properly cleared.
    await sleep(100);

    const rainbowTitle = chalkAnimation.rainbow(
        message
    );

    await sleep(100);
    rainbowTitle.stop();
    return figlet(`WURUS-CLI`, (err, data) => {
        console.log(gradient.pastel.multiline(data) + '\n');
    });

    
}

async function bye(){
    console.clear();
    console.clear(); // Dumb Bug Where Console doesn't get properly cleared.
    await sleep(100);

    const rainbowTitle = chalkAnimation.rainbow(
        `😉 See you later 👋🏾\n🚩 Checkout my website and my Github Profile For more !🚀\n
        🌌 https://orbitturner.com/ 🌌\n
        🔮 https://github.com/orbitturner 🔮\n\n`
    );

    await sleep(3000);
    rainbowTitle.stop();

    await  figlet.text(`BYE-BYE`,{
        font: 'ANSI Shadow'
    }, (err, data) => {
        console.log(gradient.pastel.multiline(data) + '\n');
    });

    await sleep(500);

    return process.exit(1);

}
