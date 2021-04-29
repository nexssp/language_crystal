let languageConfig = Object.assign({}, require("./crystal.win32.nexss.config"));
let sudo = process.sudo;

languageConfig.compilers = {
  crystal: {
    install: `${sudo}apt install -y curl 
${sudo}curl -sSL https://dist.crystal-lang.org/apt/setup.sh | ${sudo}bash
${sudo}apt update -y
${sudo}apt install -y crystal`,
    command: "crystal",
    args: "<file>",
    help: ``,
  },
};

const distName = process.distro;
const version = process.distroVersion;
// TODO: Later to cleanup this config file !!
switch (distName) {
  case process.distros.DEBIAN:
    languageConfig.compilers.crystal.install = `${sudo}apt install -y curl
${sudo}curl -sL "https://keybase.io/crystal/pgp_keys.asc" | ${sudo}sudo apt-key add - 
${sudo}echo "deb https://dist.crystal-lang.org/apt crystal main" | sudo tee /etc/apt/sources.list.d/crystal.list
${sudo}curl -sSL https://dist.crystal-lang.org/apt/setup.sh | ${sudo}bash
${sudo}apt install -y crystal`;
    break;
  case "openSUSE Leap":
  case "openSUSE Tumbleweed":
    languageConfig.compilers.crystal.install = `${sudo}rpm --import https://dist.crystal-lang.org/rpm/RPM-GPG-KEY
${sudo}zypper ar -e -f -t rpm-md https://dist.crystal-lang.org/rpm/ Crystal
${sudo}zypper -n install crystal`;
    break;
  case process.distros.ORACLE:
    languageConfig.compilers.crystal.install = `curl https://dist.crystal-lang.org/rpm/setup.sh | ${sudo} bash`;
    if (version >= 8) {
      // TODO: recognize the slim version
      languageConfig.compilers.crystal.install += ` && ${sudo}dnf install crystal`;
    } else {
      languageConfig.compilers.crystal.install += ` && ${sudo}yum install crystal`;
    }
    break;
  case process.distros.ALPINE:
    languageConfig.compilers.crystal.install = `${sudo}apk add musl-dev crystal shards`;
    break;
  case process.distros.ARCH:
    languageConfig.compilers.crystal.install = `${sudo}pacman -Sy --noconfirm gcc crystal shards`;
    break;
  case process.distros.FEDORA:
    languageConfig.compilers.crystal.install = `${sudo}snap install crystal --classic`;
    break;
  case process.distros.CENTOS:
    languageConfig.compilers.crystal.install = `${sudo}curl https://dist.crystal-lang.org/rpm/setup.sh | ${sudo} bash && ${sudo}yum install crystal`;
    break;
  case process.distros.RHEL:
    languageConfig.compilers.crystal.install = `curl https://dist.crystal-lang.org/rpm/setup.sh | ${sudo} bash`;
    languageConfig.compilers.crystal.install += ` && ${sudo}yum install -y php php-json php-imap`;
    break;
}

languageConfig.dist = distName;

languageConfig.errors = require("./nexss.crystal.errors");
languageConfig.languagePackageManagers = {};

module.exports = languageConfig;
