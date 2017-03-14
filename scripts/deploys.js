const config = require('../config');
const createSignature = require('../lib/signatures').create;
const createPlainRequest = require('../lib/requests').stampOnly;
const Conversation = require('hubot-conversation');

const deploy = (westbot, msg, from, to) => {
  if (!westbot.auth.hasRole(msg.envelope.user, 'admin')) return msg.reply('You\'re not an administrator, cheeky bastard.');
  msg.reply('Alright, attempting deploy to staging...');
  const data = JSON.stringify(createPlainRequest());
  westbot
    .http(`${config.WEBSITE_URL}/hooks/bot/deploy/${from}/${to}`)
    .header('Content-Type', 'application/json')
    .header('X-Codewest-Signature', createSignature(data))
    .post(data)((err, res, body) => {
      if (err) return msg.reply(`Error! ${err}`);
      msg.reply(JSON.parse(body).msg);
    });
};

// cannot be bothered with regex at this time
module.exports = (westbot) => {
  const switchBoard = new Conversation(westbot);
  westbot.respond(/deploy dev to staging/i, (msg) => {
    deploy(westbot, msg, 'dev', 'staging');
  });

  westbot.respond(/deploy staging to master/i, (msg) => {
    deploy(westbot, msg, 'staging', 'master');
  });

  westbot.respond(/deploy dev to master/i, (msg) => {
    msg.reply('Are you sure you want to skip the deploy to staging?');
    const dialog = switchBoard.startDialog(msg);

    dialog.addChoice(/^y/, (confirmation) => {
      deploy(westbot, confirmation, 'staging', 'master');
    });
    dialog.addChoice(/^n/, (cancellation) => {
      cancellation.reply('Deploy cancelled 😬');
    });
  });
};
