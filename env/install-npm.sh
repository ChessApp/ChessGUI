#!/bin/bash

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# Installing later versions should be fine. This version is just known to work properly.
nvm install 12.16.2

sudo chown -R 1000:1000 "$HOME/.npm" # changes permissions so you can install expo-cli without sudo
sudo chown -R $USER:$(id -gn $USER) $HOME/.config
sudo chown -R 1000:1000 "/tmp" # got rid of EAccess errors when calling npm start

npm install -g expo-cli
