let languageConfig = Object.assign({}, require("./crystal.win32.nexss.config"));
let sudo = "sudo ";
if (process.getuid && process.getuid() === 0) {
  sudo = "";
}

languageConfig.compilers = {
  crystalWSL: {
    install: `${sudo}curl -sSL https://dist.crystal-lang.org/apt/setup.sh | bash && ${sudo}apt install crystal`,
    command: "crystal",
    args: "<file>",
    help: ``,
  },
};
languageConfig.errors = require("./nexss.crystal.errors");
languageConfig.languagePackageManagers = {};

module.exports = languageConfig;
