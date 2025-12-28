import chalk from "chalk";

export const logInfo = (msg) => {
  console.log(chalk.blue("ℹ INFO:"), chalk.yellow(msg));
};

export const logSuccess = (msg) => {
  console.log(chalk.green("✔ SUCCESS:"), chalk.yellow(msg));
};

export const logWarn = (msg) => {
  console.log(chalk.yellow("⚠ WARNING:"), chalk.yellow(msg));
};

export const logError = (msg) => {
  console.log(chalk.red("✖ ERROR:"), chalk.yellow(msg));
};
