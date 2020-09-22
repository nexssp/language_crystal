let languageConfig = Object.assign({}, require("./crystal.win32.nexss.config"));
let sudo = "sudo ";
if (process.getuid && process.getuid() === 0) {
  sudo = "";
}

languageConfig.compilers = {
  crystal: {
    install: `${sudo}apt install -y curl 
${sudo}curl -sSL https://dist.crystal-lang.org/apt/setup.sh | bash
${sudo}apt install -y crystal`,
    command: "crystal",
    args: "<file>",
    help: ``,
  },
};

// If statement must be here for older versions nexss <2.1.12
if (require("fs").existsSync(`${process.env.NEXSS_SRC_PATH}/lib/osys.js`)) {
  const { dist, version } = require(`${process.env.NEXSS_SRC_PATH}/lib/osys`);
  const distName = dist();
  // TODO: Later to cleanup this config file !!
  switch (distName) {
    case "openSUSE Leap":
    case "openSUSE Tumbleweed":
      languageConfig.compilers.crystal.install = `${sudo}rpm --import https://dist.crystal-lang.org/rpm/RPM-GPG-KEY
${sudo}zypper ar -e -f -t rpm-md https://dist.crystal-lang.org/rpm/ Crystal
${sudo}zypper -n install crystal`;
      break;
    case "Oracle":
    case "Oracle Linux Server":
      languageConfig.compilers.crystal.install = `curl https://dist.crystal-lang.org/rpm/setup.sh | ${sudo} bash`;
      if (version) {
        //if here for older versions of nexssp
        const distVersion = version(); // *1 converts to number
        if (distVersion >= 8) {
          // TODO: recognize the slim version
          languageConfig.compilers.crystal.install += ` && ${sudo}dnf install crystal`;
        } else {
          languageConfig.compilers.crystal.install += ` && ${sudo}yum install crystal`;
        }
      }
      break;
    case "Alpine Linux":
      languageConfig.compilers.crystal.install = `${sudo}apk add musl-dev crystal shards`;
      break;
    case "Arch Linux":
      languageConfig.compilers.crystal.install = `${sudo}pacman -Sy --noconfirm gcc crystal shards`;
      break;
    case "Fedora":
      languageConfig.compilers.crystal.install = `${sudo}snap install crystal --classic`;
      break;
    case "CentOS Linux":
      languageConfig.compilers.crystal.install = `${sudo}curl https://dist.crystal-lang.org/rpm/setup.sh | ${sudo} bash && ${sudo}yum install crystal`;
      break;
    case "RHEL Linux":
      languageConfig.compilers.crystal.install = `curl https://dist.crystal-lang.org/rpm/setup.sh | ${sudo} bash`;
      languageConfig.compilers.crystal.install += ` && ${sudo}yum install -y php php-json php-imap`;
      break;
  }

  languageConfig.dist = distName;
} else {
  languageConfig.dist = "Ubuntu";
}

languageConfig.errors = require("./nexss.crystal.errors");
languageConfig.languagePackageManagers = {};

module.exports = languageConfig;
