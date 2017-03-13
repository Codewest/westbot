const config = require('../config');
const createSignature = require('../lib/signatures').create;
const createPlainRequest = require('../lib/requests').stampOnly;

module.exports = (westbot) => {
  westbot.respond('deploy reviewed to staging', (msg) => {
    if (!westbot.auth.hasRole(msg.envelope.user, 'admin')) return msg.reply('You\'re not an administrator, cheeky bastard.');
    msg.reply('Alright, attempting deploy to staging...');
    const data = JSON.stringify(createPlainRequest());
    westbot
      .http(`${config.WEBSITE_URL}/hooks/bot/deploy/staging`)
      .header('Content-Type', 'application/json')
      .header('X-Codewest-Signature', createSignature(data))
      .post(data)((err, res, body) => {
        if (err) return msg.reply(`Error! ${err}`);
        msg.reply(JSON.parse(body).msg);
      });
  });
};
