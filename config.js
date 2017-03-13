const prod = process.env.NODE_ENV === 'production';
const WEBSITE_URL = (prod) ? 'http://codewest.be' : 'http://localhost:4000';

module.exports = {
  WEBSITE_URL
};
