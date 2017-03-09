@echo off

call npm install
SETLOCAL
SET PATH=node_modules\.bin;node_modules\hubot\node_modules\.bin;%PATH%
SET HUBOT_AUTH_ADMIN="1,U2GB409RP";
node_modules\.bin\hubot.cmd --name "westbot" %*
