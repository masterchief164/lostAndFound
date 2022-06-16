/* eslint-disable */
// chalk config
const chalk = require('chalk');

const { blue, green, cyan } = chalk;
const red = chalk.red.bold;
const yellow = chalk.yellowBright;

const getParameters = (obj, key) => {
  let str = '';
  for (const prop in obj) {
    if (String(typeof obj[prop]) === 'object') {
      str = `${str}${yellow(`${key + prop}:`)}\n`;
      str += getParameters(obj[prop], `${key} `);
    } else {
      const temp = key + prop;
      str = `${str}${yellow(temp)}${yellow(': ')}${blue(obj[prop])}\n`;
    }
  }
  return str;
};

const errorFormatter = ({ err, file, params }) => {
  let output = `FILE:\n${blue(file)}\nPARAMETERS:\n`;
  output = `${output + getParameters(params, '')}ERROR:\n`;
  const errorStack = err;
  output += blue(errorStack);
  return red(output);
};

function infoFormatter({ file, message, options }){
  let indent = '';
  if (options && options.indent) {
    for (let i = 0; i < options.indent; i+=1) {
      indent += ' ';
    }
  }
  if (options && options.flag === false) {
    return `${indent + green(message)}`;
  }
  return `${indent}FILE: ${cyan(file)}\n${indent}MESSAGE:\n${
    indent + green(message)
  }`;
};

const formatFxn = (info) => {
  if (info.level === 'error') {
    return errorFormatter(info.message);
  }
  if (info.level === 'info') {
    return infoFormatter(info);
  }
};

// logger config
const winston = require('winston');

const logConfiguration = {
  transports: [new winston.transports.Console()],
  format: winston.format.printf(formatFxn),
};

const logger = winston.createLogger(logConfiguration);

module.exports = logger;
