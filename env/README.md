# Instructions for setting up the JavaScript environment

Install npm and associated dependencies by running this script (it is important to NOT run this command with `sudo` - installing npm with sudo causes a bunch of issues:

`$ bash install-npm.sh`

With npm installed, from the root of this repository after cloning, run the following command:

`$ cd ..` (to get back to the root of the repository)

`$ npm install`

This will install all of the necessary dependencies that are not being tracked by git.

Then use the following command to start the expo environment:

`$ npm start`


Tips:
- I have found that the tunnel connection has issues sometimes. To fix a broken tunnel connection, I have found that running:

`$ expo login`

solves the issue consistently. If you are already logged in, follow the prompt to log out and then log back in.
