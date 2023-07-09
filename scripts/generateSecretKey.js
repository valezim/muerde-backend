const crypto = require('crypto');

function generateSecretKey(length = 64) {
    return crypto.randomBytes(length).toString('hex');
}

// run node generateSecretKey.js
console.log("The generated key to add on .env is: ", generateSecretKey());
// create an .env file and add this: JWT_SECRET=the_generated_key