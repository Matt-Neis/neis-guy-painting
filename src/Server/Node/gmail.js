/**
 * Last Modified: 2019-01-28
 * By: Matt Neis
 * 
 * This is the API that is used to communicate with the react front end. 
 * It contains a giant function that utilizes the gmail api in order to send email messages 
 * to dad's email containing quotation information. It can probably be written better
 * at some point, but for now this works how it should. 
 */

//import testData from ('./testData.json');

// the node server for hosting the api
const express = require('express');
const app = express();

// cors
const cors = require('cors');
app.use(cors());

// helps log requests to see how long it took to process
const morgan = require('morgan');
app.use(morgan('combined'));

// testing JSON file
var json = 
{
  "name": "Matt Neis",
  "email": "neismj12@gmail.com",
  "phone": "4145504337",
  "address": "1586 Quarry Park Dr.",
  "city": "DE PERE",
  "desc": "dsaf"
}

sendGmailMessage(json);

// root
app.get("/API", (req, res) => {
  console.log("Responding to root route");
  res.send(
    `Ths API exists to work with the gmail API.`
    );
});

app.get("/API/send/:data", (req, res) => {
  console.log('Sending gmail message.');
  
  //var message = req.params.b64Msg;
  //var values = req.params.values;
  var data = req.params.data;
  // res.send(message);
  res.send(data);

  // call the main big function that actually sends the message
  sendGmailMessage(json);

})

app.listen(3001, () => {
  console.log("Server is up and listening on port 3001...");
});

/**
 * Could this possibly work?
 * @param {String} message 
 */

function sendGmailMessage(values) // p_message was old param
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

  // main
  // Load client secrets from a local file.
  fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);

    // Authorize a client with credentials, then call the Gmail API.
    // authorize(JSON.parse(content), getRecentEmail);
    //authorize(JSON.parse(content), listLabels);

    // original function call with no parameters
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
    // var base64EncodedEmail = btoa(`To: neismj12@gmail.com\n` +
    //           `Subject: Test 2\n` +
    //           `Date:\r\n` + // Removing timestamp
    //           `Message-Id:\r\n` + // Removing message id
    //           `From:\r\n` + // Removing from
    //           `Name - Test 2\nSecond Line\n3rd Line\n\nThis is a test to see if the email was sent correctly.`) // Adding our actual message
      
    // var mail = base64EncodedEmail;

    // create the message with the json string
    var message = `To: neismj12@gmail.com\n` + // this will change
                  `Subject: Request for Quote Received\n` +
                  `Date:\r\n` + // Removing timestamp
                  `Message-Id:\r\n` + // Removing message id
                  `From:\r\n` + // Removing from
                  `Name - ${values.name}\nEmail - ${values.email}\nPhone - ${values.phone}\nAddress - ${values.address}\nCity - ${values.city}\n\n${values.desc}` // Adding our actual message - has to be all one line so it looks ugly af
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

  /**
   * Send Message.
   *
   * @param  {String} userId User's email address. The special value 'me'
   * can be used to indicate the authenticated user.
   * @param  {String} message RFC 5322 formatted String.
   * @param  {Function} callback Function to call when the request is complete.
   */
  function sendMessageTest(auth, mail, callback) {
    const gmail = google.gmail({version: 'v1', auth});
    console.log(mail);
    // var mail = message; // the b64 string
    // console.log(callback);

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
  }
} // end sendGmailMessage function