import chalk from "chalk";
import shell from "shelljs";


/**
 * Console Logging Module.
 * @methods -> DEBUG - INFO - WARN - TRACE - ERROR - FATAL - SUCCESS
 */
export class OrbitLogger {
  // =================================================
  static PERSIST_ALL = true;
  // =================================================
  static LOG_LS_KEY = 'qctoolsbyt_log';
  // =================================================
  static debugEmoji = '🟤';
  static infoEmoji = '📰';
  static traceEmoji = '💎';
  static errorEmoji = '🚨';
  static fatalEmoji = '🔴';
  static warningEmoji = '⚠';
  static successEmoji = '🟢';
  // =================================================
  static CurrentLogLevel = 'DEFAULT';
  static CurrentLogDate = '[!NOT-SET-YET!]';
  // =================================================
  /**
   * LOGGER STATE KEEPERS
   */
  static currentClientIpAdress = '----';
  static currentClientFNAME = '----';
  static currentClientDebugInfo ={arch:process.arch, platform: process.platform, memoryUsage: process.memoryUsage, cpuUsage: process.cpuUsage, userEnv: process.env};
  static currentAppName = 'WURUS-CLI';
  // =================================================


  // =================================================================================
  /**
   * TRACE – the most fine-grained information only used in rare cases where you need
   * the full visibility of what is happening in your application and inside the third-party libraries that you use.
   * You can expect the TRACE logging level to be very verbose.
   * You can use it for example to annotate each step in the algorithm or each individual query with parameters in your code.
   */

  /**
   * A log level describing events showing step by step execution of your code
   * that can be ignored during the standard operation,
   * but may be useful during extended debugging sessions.
   *
   * @param msg -> Content of the Log. Can be an Object.
   * @param content -> Optional Object that will be Dumped in the console.
   * @param disableFileWrite ->  Defines Wether or not that logs will be kept
   * in a file and sent by mail to the SI.
   */
  static trace(msg, content, disableFileWrite){
    // ----
    const date = this.formatMyDate(new Date());
    // Log Title StreamLine
    const title = this.titleStreamer(date, 'TRACE', this.traceEmoji);
    // ----
    
    if (!disableFileWrite) {this.mail(title, msg, content);}
  }
  // =================================================================================

  // =================================================================================
  /**
   * DEBUG – less granular compared to the TRACE level,
   * but it is more than you will need in everyday use.
   * The DEBUG log level should be used for information that may be needed
   * for diagnosing issues and troubleshooting or
   * when running application in the test environment for the purpose
   * of making sure everything is running correctly.
   */

  /**
   * A log level used for events considered to be useful during software debugging
   * when more granular information is needed.
   *
   * @param msg -> Content of the Log. Can be an Object.
   * @param content -> Optional Object that will be Dumped in the console.
   * @param disableFileWrite ->  Defines Wether or not that logs will be kept
   * in a file and sent by mail to the SI.
   */
  static debug(msg, content, disableFileWrite){
    const date = this.formatMyDate(new Date());
    const title = this.titleStreamer(date, 'DEBUG', this.debugEmoji);
    // ----
    if (!disableFileWrite) {this.mail(title, msg, content);}
  }
  // =================================================================================


  // =================================================================================
  /**
   * INFO – the standard log level indicating that something happened, application entered a certain state, etc.
   * For example, a controller of your authorization API may include an INFO log level with information
   * on which user requested authorization if the authorization was successful or not.
   * The information logged using the INFO log level should be
   * purely informative and not looking into them on a regular basis shouldn’t result in missing any important information.
   */

  /**
   * An event happened, the event is purely informative and can be ignored during normal operations.
   *
   * @param msg -> Content of the Log. Can be an Object.
   * @param content -> Optional Object that will be Dumped in the console.
   * @param disableFileWrite ->  Defines Wether or not that logs will be kept
   * in a file and sent by mail to the SI.
   */
  static info(msg, content, disableFileWrite){
    const date = this.formatMyDate(new Date());
    const title = this.titleStreamer(date, 'INFO', this.infoEmoji);
  
    if (!disableFileWrite) {this.mail(title, msg, content);}
  }
  // =================================================================================


  // =================================================================================
  /**
   * WARN – the log level that indicates that something unexpected happened in the application,
   * a problem, or a situation that might disturb one of the processes.
   * But that doesn’t mean that the application failed.
   * The WARN level should be used in situations that are unexpected, but the code can continue the work.
   * For example, a parsing error occurred that resulted in a certain document not being processed.
   */

  /**
   *  Unexpected behavior happened inside the application,
   *  but it is continuing its work and the key business features are operating as expected.
   *
   * @param msg -> Content of the Log. Can be an Object.
   * @param content -> Optional Object that will be Dumped in the console.
   * @param disableFileWrite ->  Defines Wether or not that logs will be kept
   * in a file and sent by mail to the SI.
   */
  static warn(msg , content, disableFileWrite){
    const date = this.formatMyDate(new Date());
    const title = this.titleStreamer(date, 'WARN', this.warningEmoji);
    
    if (!disableFileWrite) {this.mail(title, msg, content);}
  }
  // =================================================================================

  // =================================================================================
  /**
   * ERROR – the log level that should be used when the application hits an issue preventing one
   * or more functionalities from properly functioning. The ERROR log level can be used when one of the payment systems is not available,
   * but there is still the option to check out the basket in the e-commerce application
   * or when your social media logging option is not working for some reason.
   */

  /**
   *  One or more functionalities are not working, preventing some functionalities from working correctly.
   *
   * @param msg -> Content of the Log. Can be an Object.
   * @param content -> Optional Object that will be Dumped in the console.
   * @param disableFileWrite ->  Defines Wether or not that logs will be kept
   * in a file and sent by mail to the SI.
   */
  static error(msg, content, disableFileWrite){
    const date = this.formatMyDate(new Date());
    const title = this.titleStreamer(date, 'ERROR', this.errorEmoji);
    // ----
    if (!disableFileWrite) {this.mail(title, msg, content);}
  }
  // =================================================================================

  // =================================================================================
  /**
   * FATAL – the log level that tells that the application encountered an event or entered a state in which one of the
   * crucial business functionality is no longer working. A FATAL log level may be used when
   * the application is not able to connect to a crucial data store like a database
   * or all the payment systems are not available and users can’t checkout their baskets in your e-commerce.
   */

  /**
   * One or more key business functionalities are not working and the whole system doesn’t fulfill the business functionalities.
   *
   * @param msg -> Content of the Log. Can be an Object.
   * @param content -> Optional Object that will be Dumped in the console.
   * @param disableFileWrite ->  Defines Wether or not that logs will be kept
   * in a file and sent by mail to the SI.
   */
  static fatal(msg, content, disableFileWrite){
    const date = this.formatMyDate(new Date());
    const title = this.titleStreamer(date, '📛FATAL📛', this.fatalEmoji);

    if (!disableFileWrite) {this.mail(title, msg, content);}

  }
  // =================================================================================

  // =================================================================================
  /**
   * A Dummy Log used to Notify that an operation has been successfully done.
   *
   * @param msg -> Content of the Log. Can be an Object.
   * @param content -> Optional Object that will be Dumped in the console.
   * @param disableFileWrite ->  Defines Wether or not that logs will be kept
   * in a file and sent by mail to the SI.
   */
  static success(msg, content, disableFileWrite){
    const date = this.formatMyDate(new Date());
    const title = this.titleStreamer(date, '✅SUCCESS✅', this.successEmoji);
    // ----
    if (!disableFileWrite) {this.mail(title, msg, content);}
  }
  // =================================================================================


  // =========================================================================
  // 💠🔹 DATE UTILITIES / TITLE HELPER 🔹💠
  // =========================================================================
  /**
   * @returns A Date in the desired string Format.
   *
   * @param date -> The date expression: a Date object, a number (milliseconds since UTC epoch),
   * or an ISO string (https://www.w3.org/TR/NOTE-datetime).
   * >see : (https://angular.io/api/common/DatePipe#pre-defined-format-options).
   */
  static formatMyDate(date) {
    return date.toLocaleString("en-GB");
  }
  // ************************************************************************|
  /**
   * Construct The Log Information Line.
   * Made to Avoid code Duplication.
   * @param date -> Log Event Date.
   * @param logLevel -> Log Type.
   * @param logEmoji -> Emojis Used for this log.
   * @   */
  static titleStreamer(date, logLevel, logEmoji){
    this.CurrentLogLevel = logLevel;
    this.CurrentLogDate = date;

    // Log Title StreamLine
    return `➤ [${date}] ➤ QCTOOLSBYT ❂ [${logLevel}] ⚝ ${logEmoji}`;
  }
  // ************************************************************************|
  /**
   * This method is used to create a comma-delimited list of the parameter array.
   * If all parameters in the array are simple data types and not an object,
   * then the local variable named ret is returned after the join() method is used to create a comma-delimited list from the array.
   * If there is one object, loop through each of the items in the params array and build the ret variable using the JSON.stringify()
   * method to convert each parameter to a string, and then append a comma after each.
   *
   * @param params -> Array of Optional Params
   * @   */
  static formatParams(params) {
    if (params[0]) {
      let ret;

      // Is there at least one object in the array?
      if (params.some(p => typeof p === 'object')) {
        ret = '';

        // Build comma-delimited string
        for (const item of params) {
          ret += JSON.stringify(item) + ',';
        }
      }else{
        ret = params.join(',');
      }
      return ret;
    }
    return '【 No Additional Information Given 】';
  }
  // =================================================================================

  /**
   * Make permanent the log it will keep it in LS and send a mail to SI.
   * TODO : MAIL TO
   * @param title
   * @param msg
   * @param content
   * @   */
  static mail(title, msg , content){
    console.log(chalk.bold.red(
      chalk.bgRed.white.bold(`${title} ➥ :`) +
      ` ❝${msg}❞.`+'\n\n'+
      chalk.yellow.underline.bold(`⮚ ⬩ Attached Object Content ⮛`) +
      '\n'+ this.formatParams([content])
    ));
    return this.PersistToDB(`${title} ➥ : 💚❝${msg}❞💚.` + '\n\n' + `⮚ ⬩ Attached Object Content ⮛` + '\n' +
    this.formatParams([content])+ '\n\n----//----\n\n')
  }


  static PersistToDB(error){
    const log = {
      date: OrbitLogger.CurrentLogDate,
      logLevel : OrbitLogger.CurrentLogLevel,
      fromApp: OrbitLogger.currentAppName,
      fromIp: OrbitLogger.currentClientIpAdress,
      fromClient: OrbitLogger.currentClientFNAME,
      error,
      other: OrbitLogger.currentClientDebugInfo,
      state: 'GOOD'
    };

    return shell.exec(`echo ${JSON.stringify(log)} >> wurus-logs.txt`);
  }
}

