let languageConfig = Object.assign({}, require("./php.win32.nexss.config"));
languageConfig.compilers = {
  crystalWSL: {
    install: `curl -sSL https://dist.crystal-lang.org/apt/setup.sh | bash && apt install crystal`,
    command: "crystal",
    args: "<file>",
    help: ``,
  },
};
languageConfig.errors = require("./nexss.crystal.errors");
languageConfig.languagePackageManagers = {};

module.exports = languageConfig;
