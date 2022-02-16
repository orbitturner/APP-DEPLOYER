import { isValidHttpUrl } from "../helpers/utils.js";

const currentPath = process.cwd();
const rootPath = process.platform === 'win32' ? 'C:\\Users' : '/';

// This question would be shown at the starting 
export const defineProject = [
    {
        type: 'text',
        name: 'projectName',
        message: 'Enter your project name:'
    },
    {
        type: 'text',
        name: 'projectRepo',
        message: 'Enter your project Github Repository url:',
        filter (input) {
            return new Promise((res, rej) => {
                if (!isValidHttpUrl(input)) {
                    rej('🚩 Common Give us a Valid URL ! 😪')
                }
                res(input);
            });
        }
    },
    {
        type: 'fuzzypath',
        name: 'projectDeployPath',
        message: 'Enter the Deploy Path of your Project in this Server:',
        excludePath: nodePath => nodePath.startsWith('node_modules'),
        excludeFilter: nodePath => nodePath.startsWith('.'),
        rootPath: rootPath,
        default: currentPath,
        itemType: 'directory',
        depthLimit: 2,
        suggestOnly: false,

    },
    {
        type: 'list',
        name: 'projectType',
        message: 'Choose the Type of Project you are Deploying:',
        choices: ['Frontend', 'Backend', 'Monolithic']
    },
    {
        type: 'confirm',
        name: 'docker',
        message: 'Is your project Dockerized ?'
    }
];

