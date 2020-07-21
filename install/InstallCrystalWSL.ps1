# wsl -u root installCrystalWSL.ps1
curl -sSL https://dist.crystal-lang.org/apt/setup.sh | bash
curl -sL "https://keybase.io/crystal/pgp_keys.asc" | apt-key add -
echo "deb https://dist.crystal-lang.org/apt crystal main" | tee /etc/apt/sources.list.d/crystal.list
apt-get update

apt install \
crystal \
libssl-dev \
libxml2-dev \
libyaml-dev \
libgmp-dev \
libreadline-dev \
libz-dev 
