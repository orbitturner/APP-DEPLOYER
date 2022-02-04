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
import { sleep } from "./core/utils.js";
import { version } from "./package.json";

// ===============================
// INITIALIZATION
// ===============================
const REPO     = '';
const APP_NAME = '';
const APP_PATH = '';
// ===============================

async function welcome(message = 'You Called the CLI without params.\nBootstraping to Main Menu...\n') {
    console.clear();
    const rainbowTitle = chalkAnimation.rainbow(
        message
    );

    await sleep(100);
    rainbowTitle.stop();
    figlet(`WURUS-CLI`, (err, data) => {
        console.log(gradient.pastel.multiline(data) + '\n');
    });
}

await welcome();

// ====================================================
// BOOT PARAMS HANDLING
// ====================================================
program
    .name('WURUS-CLI')
    .description('A CLI that helps you deploy, update & monitor your Front/Back-end JS App in few steps easily.')
    .version(version);

program
    .option('-d, --deploy <repo>', 'Switch to deployment process with given Repository.')
    .action(function () {
        browse();
    });

program
    .option('-u, --update <path>', 'Update app at given Path with his default Repository.')
    .action(function () {
        browse();
    });

program
    .option('-m, --monitor <app_name>', 'Switch to MONITORING Mode of The Given App.')
    .action(function () {
        browse();
    });
// allow commander to parse `process.argv`
program.parse(process.argv);
// ====================================================
