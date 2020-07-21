let languageConfig = Object.assign({}, require("../config.win32"));
languageConfig.title = "Crystal";
languageConfig.description =
  "Crystal is a programming language with the syntax similar to Ruby.";
languageConfig.url = "https://crystal-lang.org";
languageConfig.extensions = [".cr"];
languageConfig.executeCommandLine = "crystal";
languageConfig.printCommandLine = "";
languageConfig.checkSyntax = "";
languageConfig.interactiveShell = "crystal";
languageConfig.builders = {};
languageConfig.compilers = {
  crystalWSL: {
    install: `Powershell -C "Set-Location -Path ${__dirname} ; wsl -u root install/InstallCrystalWSL.ps1"`,
    command: "wsl crystal",
    args: "<file>",
    help: ``,
  },
};
languageConfig.errors = require("./nexss.crystal.errors");
languageConfig.languagePackageManagers = {};

module.exports = languageConfig;
