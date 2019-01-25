const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const btoa = require('btoa');
const googleAuth = require('google-auth-library');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/gmail.send', 'https://www.googleapis.com/auth/gmail.readonly'];
// const SCOPES = ['https://mail.google.com/'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// main
// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);

  // Authorize a client with credentials, then call the Gmail API.
  // authorize(JSON.parse(content), getRecentEmail);
  //authorize(JSON.parse(content), listLabels);
  authorize(JSON.parse(content), sendMessage);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) { // credentials should eventually go into db
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    // console.log(callback);
    callback(oAuth2Client);
  });

  // // Check if we have previously stored a token.
  // fs.readFile(TOKEN_PATH, function(err, token) {
  //   if (err) {
  //     getNewToken(oauth2Client, callback);
  //   } else {
  //     oauth2Client.credentials = JSON.parse(token);
  //     callback(oauth2Client);
  //   }
  // });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listLabels(auth) {
  const gmail = google.gmail({version: 'v1', auth});
  gmail.users.labels.list({
    userId: 'me',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const labels = res.data.labels;
    if (labels.length) {
      console.log('Labels:');
      labels.forEach((label) => {
        console.log(`- ${label.name}`);
      });
    } else {
      console.log('No labels found.');
    }
  });
}

/**
 * Get the recent email from your Gmail account
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function getRecentEmail(auth) {
  // Only get the recent email - 'maxResults' parameter
  const gmail = google.gmail({version: 'v1', auth});
  gmail.users.messages.list({auth: auth, userId: 'me', maxResults: 1,}, function(err, response) {
      if (err) {
          console.log('The API returned an error: ' + err);
          return;
      }

    // Get the message id which we will need to retreive tha actual message next.
    var message_id = response['data']['messages'][0]['id'];

    // Retreive the actual message using the message id
    gmail.users.messages.get({auth: auth, userId: 'me', 'id': message_id}, function(err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }

        // have to decode the message from base64
        message_raw = response['data']['payload']['parts'][0].body.data;
        data = message_raw;  
        buff = new Buffer(data, 'base64');  
        text = buff.toString();
        console.log(text);
        console.log(message_id);
    });
  });
}

/**
 * Send Message.
 *
 * @param  {String} userId User's email address. The special value 'me'
 * can be used to indicate the authenticated user.
 * @param  {String} email RFC 5322 formatted String.
 * @param  {Function} callback Function to call when the request is complete.
 */
function sendMessage(auth, callback) {
  // Using the js-base64 library for encoding:
  // https://www.npmjs.com/package/js-base64
  //var base64EncodedEmail = Base64.encodeURI(email);
  const gmail = google.gmail({version: 'v1', auth});
  //var base64EncodedEmail = Buffer.from(message).toString('base64');

  var base64EncodedEmail = btoa(`To: neismj12@gmail.com\n` +
             `Subject: Fuck this better work\n` +
             `Date:\r\n` + // Removing timestamp
             `Message-Id:\r\n` + // Removing message id
             `From:\r\n` + // Removing from
             `If this doesn't work I'm gonna jump off my balcony`) // Adding our actual message
  var mail = base64EncodedEmail;

  // console.log(base64EncodedEmail); // debug

  var request = gmail.users.messages.send({
    'auth': auth,
    'userId': 'me',
    'resource': {
      'raw': mail
      }
    }, function(err, gmailMessage) {
      if (callback) {
        return callback(err, gmailMessage);
      }

      if (err) {
        console.log('Error while trying to send gmail message => ' + err);
      }
  });

  // request.execute(callback);
  // request.callback;
}