const crypto = require('crypto');

const storedSecret = process.env.HOOK_SECRET;

const genHMAC = reqbody => crypto.createHmac('sha1', storedSecret).update(reqbody).digest('hex');

exports.verify = (receivedSignature, reqbody) => {
  const computedSig = genHMAC(reqbody);
  return crypto.timingSafeEqual(new Buffer(`sha1=${computedSig}`), new Buffer(receivedSignature));
};

exports.create = (reqbody) => {
  const signature = genHMAC(reqbody);
  return `sha1=${signature}`;
};
