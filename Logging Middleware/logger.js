const axios = require('axios');

const LOGS_API_URL = 'http://20.244.56.144/evaluation-service/logs';

async function log(authToken, { stack, level, apackage, message }) {
  if (!authToken) {
    console.error('Log Error: Auth token is missing. Cannot send log.');
    return;
  }

  try {
    await axios.post(
      LOGS_API_URL,
      { stack, level, package: apackage, message },
      { headers: { 'Authorization': `Bearer ${authToken}` } }
    );
    console.log(`✅ Log Sent: { level: '${level}', message: '${message}' }`);
  } catch (error) {
    const errorMsg = error.response ? JSON.stringify(error.response.data) : error.message;
    console.error(`❌ Error sending log: ${errorMsg}`);
  }
}

module.exports = { log };