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

// If statement must be here for older versions nexss <2.1.12
if (require("fs").existsSync(`${process.env.NEXSS_SRC_PATH}/lib/osys.js`)) {
  languageConfig.languagePackageManagers.composer.installation = `php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "if (hash_file('sha384', 'composer-setup.php') === '8a6138e2a05a8c28539c9f0fb361159823655d7ad2deecb371b04a83966c61223adc522b0189079e3e9e277cd72b8897') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
php composer-setup.php
php -r "unlink('composer-setup.php');"`;
  const { dist, version } = require(`${process.env.NEXSS_SRC_PATH}/lib/osys`);
  const distName = dist();
  // TODO: Later to cleanup this config file !!
  switch (distName) {
    case "Oracle":
    case "Oracle Linux Server":
      languageConfig.compilers.php7.install = `curl https://dist.crystal-lang.org/rpm/setup.sh | sudo bash`;
      if (version) {
        //if here for older versions of nexssp
        const distVersion = version(); // *1 converts to number
        if (distVersion >= 8) {
          // TODO: recognize the slim version
          languageConfig.compilers.php7.install += ` && ${sudo}dnf install crystal`;
          languageConfig.languagePackageManagers.composer.installation = `${sudo}dnf update && ${sudo}dnf install -y curl && curl -s https://getcomposer.org/installer | php && mv composer.phar /usr/local/bin/composer`;
        } else {
          languageConfig.compilers.php7.install += ` && ${sudo}yum install crystal`;
          languageConfig.languagePackageManagers.composer.installation = `${sudo}yum update && ${sudo}yum install -y curl && curl -s https://getcomposer.org/installer | php && mv composer.phar /usr/local/bin/composer`;
        }
      }
      break;
    case "Alpine Linux":
      languageConfig.compilers.php7.install = `${sudo}apk add crystal shards`;
      break;
    case "Arch Linux":
      languageConfig.compilers.php7.install = `${sudo}pacman -Sy --noconfirm crystal shards`;
      break;
    case "Fedora":
      languageConfig.compilers.php7.install = `${sudo}snap install crystal --classic`;
      break;
    case "CentOS Linux":
      languageConfig.compilers.php7.install = `${sudo}curl https://dist.crystal-lang.org/rpm/setup.sh | sudo bash && ${sudo}yum install crystal`;
      break;
    case "RHEL Linux":
      languageConfig.compilers.php7.install = `curl https://dist.crystal-lang.org/rpm/setup.sh | sudo bash`;
      languageConfig.compilers.php7.install += ` && ${sudo}yum install -y php php-json php-imap`;
      break;
  }

  languageConfig.dist = distName;
} else {
  languageConfig.dist = "Ubuntu";
}

languageConfig.errors = require("./nexss.crystal.errors");
languageConfig.languagePackageManagers = {};

module.exports = languageConfig;
