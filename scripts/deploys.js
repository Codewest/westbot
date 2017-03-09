const config = require('../config');

module.exports = (robot) => {
  robot.respond('deploy reviewed to staging', (msg) => {
    msg.reply('Alright, attempting deploy to staging...');
    robot.http(`${config.URL}/hooks/bot/deploy/staging`).get()((err, res, body) => {
      if (err) return msg.reply(`Error! ${err}`);
      if (robot.auth.hasRole(msg.envelope.user, 'admin')) return msg.reply('You\'re not an administrator, cheeky bastard.');
      return msg.reply('Reviewed issues/tasks deployed to staging 🚀');
    });
  });
};
