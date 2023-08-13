const {OAuth2Client} = require('google-auth-library');

const YOUR_CLIENT_ID = '419298149524-t9pp5k998fqcoh140sdlk9uoaivavik0.apps.googleusercontent.com';
const YOUR_CLIENT_SECRET = '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';
const REDIRECT_URL = 'urn:ietf:wg:oauth:2.0:oob'; // Para aplicaciones de escritorio

const oAuth2Client = new OAuth2Client(YOUR_CLIENT_ID, YOUR_CLIENT_SECRET, REDIRECT_URL);

async function getAccessToken() {
    const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://mail.google.com/'
    });
    console.log(`Please visit this URL to authorize this application: ${authorizeUrl}`);
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', async (code) => {
        const token = await oAuth2Client.getToken(code);
        console.log('Token:', JSON.stringify(token.tokens, null, 2));
        rl.close();
    });
}

getAccessToken();
