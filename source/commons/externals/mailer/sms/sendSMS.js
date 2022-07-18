require('dotenv');

async function send(msg) {
  const accessURL = process.env.TWOFACTOR_API_URL.replace('{{accessKey}}', process.env.TWOFACTOR_ACCESS_KEY);
  const headers   = { 'Content-Type': 'application/x-www-form-urlencoded' };
  const params    = {
    To: msg.mobile,
    From: msg.from || 'GRAYMA',
    TemplateName: msg.template,
    VAR1: msg.var1,
    VAR2: msg.var2,
    VAR3: msg.var3,
  }
  const data = Object.keys(params).reduce((acc, curr) => `${acc}${curr}=${(params[curr])}&`, '');
  const { ResourceAPI } = require('../../externalsManager');
  
  return (await ResourceAPI.https.post(accessURL, headers, data)).data;
}

module.exports = { send };