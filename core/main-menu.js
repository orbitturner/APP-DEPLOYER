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
║       1 ---------->  DEPLOY AN APP        ║
║                                           ║
║       2 ---------->  UPDATE EXISTING APP  ║
║                                           ║
║       3 ---------->  APP MONITORING       ║
║                                           ║
║       4 ---------->  HELP / DOCS          ║
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
        choices: [1,2,3,4,0],
        filter (input) {
            return new Promise((res, rej) => {
                if (!(input >= 0 && input <= 4)) {
                    rej('🚩 Make a choice between 0 & 4 😪')
                }
                res(input);
            });
        }
    },
];

// Making Fake Enum 
export const moduleList = {
    DEPLOY : 'DEPLOY AN APP',
    UPDATE : 'UPDATE EXISTING APP',
    MONIT : 'APP MONITORING',
    HELP : 'HELP / DOCS'
}