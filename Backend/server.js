// In: Backend/server.js

const express = require('express');
const { getAuthToken } = require('./service.js');

// Correct relative path to go one level up, then into 'Logging Middleware'
const { log } = require('../Logging Middleware/logger.js');

const app = express();
const PORT = 3000;

let sessionAuthToken = null;

app.get('/test-log', (req, res) => {
  console.log("\n--- Received request for /test-log ---");
  log(sessionAuthToken, {
    stack: 'backend',
    level: 'info',
    apackage: 'controller',
    message: 'This is an info log from the test endpoint.',
  });

  log(sessionAuthToken, {
    stack: 'backend',
    level: 'error',
    apackage: 'controller',
    message: 'This is a simulated error log.',
  });

  res.status(200).send('Logged a test info and error message. Check your console!');
});

const startServer = async () => {
  console.log("Initializing server...");
  sessionAuthToken = await getAuthToken();

  if (sessionAuthToken) {
    app.listen(PORT, () => {
      console.log(`\n🎉 Server is live on http://localhost:${PORT}`);
      console.log("🚀 Visit http://localhost:3000/test-log to test logging.");
    });
  } else {
    console.error("Server could not start. Authentication failed.");
  }
};

startServer();