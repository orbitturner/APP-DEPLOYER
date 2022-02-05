import inquirer from 'inquirer';
import {
    defineProject
} from "./deploy-questions.js";
import InquirerFuzzyPath from "../lib/inquirerpath.js";
import {
    sleep, _GoHome
} from '../utils.js';
import chalk from 'chalk';
import shell from "shelljs";

// =================================
// INITIALIZATION
inquirer.registerPrompt('fuzzypath', InquirerFuzzyPath)
const _pathSeparator = process.platform === 'win32' ? '\\' : '/';
let ProjectFinalPath = null;
// =================================

export async function InitDeployModule(_REPO = null) {
    await sleep();
    console.clear();
    return inquirer.prompt(defineProject).then(
        (answers) => {
            if (!answers.docker) {
                ProjectFinalPath = `${answers.projectDeployPath}${_pathSeparator}${answers.projectName}`;
                const createFolder = shell.exec(`mkdir -p ${ProjectFinalPath}`, {
                    silent: true
                });
                if (createFolder.code !== 0) {
                    console.log(chalk.red(`❌ Folder can't be created ❌: ${createFolder.stderr}`));
                    console.log(chalk.red(`Do you have The Permissions ?`));
                    return _GoHome();
                }
                console.log(chalk.green("📁 Created a folder for the project at :"))
                console.log(chalk.bgGrey(`⁕ ${ProjectFinalPath}`))

            }

        }
    );
}
