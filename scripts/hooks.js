const verifySignature = require('../lib/signatures').verify;

module.exports = (westbot) => {
  westbot.router.post('/message', (req, res) => {
    const signature = req.get('X-Codewest-Signature');
    const body = req.body;
    const signatureIsValid = verifySignature(signature, JSON.stringify(body));
    if (!signatureIsValid) res.status(401).send('Signature invalid');
    westbot.messageRoom(body.room, body.msg);
    res.status(200).send('Message sent');
  });
};
