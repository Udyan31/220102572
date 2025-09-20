// In: Backend/service.js

const axios = require('axios');
require('dotenv').config();

const REGISTER_URL = 'http://20.244.56.144/evaluation-service/register';
const AUTH_URL = 'http://20.244.56.144/evaluation-service/auth';

// --- IMPORTANT: Fill in your actual details here ---
const MY_DETAILS = {
  name: "Udyan Gupta",
  email: "1000018787@dit.edu.in",
  rollNo: "220102572",
  githubUsername: "Udyan31",
  mobileNo: "9999999999",
  accessCode: "Skmnew",
};

async function getAuthToken() {
  let { CLIENT_ID, CLIENT_SECRET } = process.env;

  if (!CLIENT_ID || !CLIENT_SECRET) {
    console.log("Credentials not found in .env. Registering...");
    try {
      const res = await axios.post(REGISTER_URL, MY_DETAILS);
      CLIENT_ID = res.data.clientID;
      CLIENT_SECRET = res.data.clientSecret;
      console.log("✅ Registration successful!");
      console.log("🛑 IMPORTANT: Copy these credentials into your Backend/.env file and restart the server.");
      console.log(`CLIENT_ID=${CLIENT_ID}`);
      console.log(`CLIENT_SECRET=${CLIENT_SECRET}`);
      process.exit(0);
    } catch (error) {
      console.error(`❌ Registration failed:`, error.response ? error.response.data : error.message);
      process.exit(1);
    }
  }

  console.log("Authenticating with existing credentials...");
  try {
    const authPayload = { ...MY_DETAILS, clientID: CLIENT_ID, clientSecret: CLIENT_SECRET };
    const res = await axios.post(AUTH_URL, authPayload);
    console.log("✅ Authentication successful.");
    return res.data.access_token;
  } catch (error) {
    console.error(`❌ Authentication failed:`, error.response ? error.response.data : error.message);
    process.exit(1);
  }
}

module.exports = { getAuthToken };