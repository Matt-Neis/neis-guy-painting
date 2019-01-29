/**
 * Last Modified: 2019-01-28
 * By: Matt Neis
 * 
 * This is the API that is used to communicate with the react front end. 
 * It contains a giant function that utilizes the gmail api in order to send email messages 
 * to dad's email containing quotation information. It can probably be written better
 * at some point, but for now this works how it should. 
 */

// the node server for hosting the api
const express = require('express');
const app = express();

// cors
const cors = require('cors');
app.use(cors());

// helps log requests to see how long it took to process
const morgan = require('morgan');
app.use(morgan('combined'));

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

// root
app.get("/API", (req, res) => {
  console.log("Responding to root route");
  res.send(
    `Ths API exists to work with the gmail API.`
    );
});

// this is the real post malone
// jsonParser acts as a middleman, giving you accesst to req.body
app.post("/API/send", jsonParser, (req, res) => {
  var p_name = req.body.name;
  var p_email = req.body.email;
  var p_phone = req.body.phone;
  var p_address = req.body.address;
  var p_city = req.body.city;
  var p_desc = req.body.desc;

  sendGmailMessage(p_name, p_email, p_phone, p_address, p_city, p_desc);
});

app.listen(3001, () => {
  console.log("Server is up and listening on port 3001...");
});

/**
 * Contains the functionality for sending an email from the "Request a Quote" form on the
 * front end. Reaches out to the GMail API for permission to send/compose emails.
 * 
 * @param {String} name 
 * @param {String} email 
 * @param {String} phone 
 * @param {String} address 
 * @param {String} city 
 * @param {String} desc 
 */

// p_message was old param, values was too
function sendGmailMessage(name, email, phone, address, city, desc)
{
  const fs = require('fs');
  const readline = require('readline');
  const {google} = require('googleapis');
  const btoa = require('btoa');
  const googleAuth = require('google-auth-library');

  // If modifying these scopes, delete token.json.
  const SCOPES = ['https://www.googleapis.com/auth/gmail.send', 
                  'https://www.googleapis.com/auth/gmail.readonly'];

  // The file token.json stores the user's access and refresh tokens, and is
  // created automatically when the authorization flow completes for the first
  // time.
  const TOKEN_PATH = 'token.json';

  // Load client secrets from a local file.
  fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);

    // This is what actually sends the message. Do not delete.
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
    const gmail = google.gmail({version: 'v1', auth});
    
    var message = `To: neismj12@gmail.com\n` + // this will change
    `Subject: Request for Quote Received\n` +
    `Date:\r\n` + // Removing timestamp
    `Message-Id:\r\n` + // Removing message id
    `From:\r\n` + // Removing from
    `Name - ${name}\nEmail - ${email}\nPhone - ${phone}\nAddress - ${address}\nCity - ${city}\n\n${desc}` // Adding our actual message - has to be all one line so it looks ugly af
    
    var b64string = btoa(message);

    var request = gmail.users.messages.send({
      'auth': auth,
      'userId': 'me',
      'resource': { 
        'raw': b64string
        }
      }, function(err, gmailMessage) {
        if (callback) {
          return callback(err, gmailMessage);
        }

        if (err) {
          console.log('Error while trying to send gmail message => ' + err);
        }
    });
  }
}