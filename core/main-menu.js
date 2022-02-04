export const mainMenuStream = `
╔-------------------------------------------╗
║                                           ║
║                                           ║
║▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ♠ MENU ♠ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓║
║                                           ║
║                                           ║
║-------------------------------------------║
║                                           ║
║       THE ULTIMATE JS APP MGMT CLI        ║
║                                           ║
║-------------------------------------------║
║                                           ║
║                                           ║
║       1 ---------->  DEPLOY FRONTEND APP  ║
║                                           ║
║       2 ---------->  DEPLOY BACKEND APP   ║
║                                           ║
║       3 ---------->  UPDATE EXISTING APP  ║
║                                           ║
║       4 ---------->  APP MONITORING       ║
║                                           ║
║       5 ---------->  HELP / DOCS          ║
║                                           ║
║       0 ---------->  EXIT                 ║
║                                           ║
╚═══════════════════════════════════════════╝
`;

export const menuChoice = [
    {
        type: 'number',
        name: 'choosedMenu',
        message: 'Choose the Operation you want :',
        choices: [1,2,3,4,5,0]
    },
];

// Making Fake Enum 
export const moduleList = {
    DEPFRONT : 'DEPLOY FRONTEND APP',
    DEPBACK : 'DEPLOY BACKEND APP',
    UPDATE : 'UPDATE EXISTING APP',
    MONIT : 'APP MONITORING',
    HELP : 'HELP / DOCS'
}