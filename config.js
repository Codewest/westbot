const prod = process.env.NODE_ENV === 'production';
const URL = (prod) ? 'http://codewest.be' : 'http://localhost:4000';

module.exports = {
  URL,
  HOOK_SECRET: process.env.HOOK_SECRET
};
