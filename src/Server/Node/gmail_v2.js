/**
 * TESTING
 */

 // the b64 string
var test = 'VG86IG5laXNtajEyQGdtYWlsLmNvbQpTdWJqZWN0OiBUZXN0IDIKRGF0ZToNCk1lc3NhZ2UtSWQ6DQpGcm9tOg0KTmFtZSAtIFRlc3QgMgpTZWNvbmQgTGluZQozcmQgTGluZQoKVGhpcyBpcyBhIHRlc3QgdG8gc2VlIGlmIHRoZSBlbWFpbCB3YXMgc2VudCBjb3JyZWN0bHku';
sendGmailMessage(test);

/**
 * This is intended as a rewrite of the existing gmail.js file which won't let me
 * actually edit it easily so I can add a parameter. The point of the rewrite is
 * clean it up and make dat shyt work.
 * @param {String} message The actual B64 encoded string that the api requires
 */
function sendGmailMessage(message)
{
    // declare necessary constants
    const fs = require('fs');
    const readline = require('readline');
    const {google} = require('googleapis');
    const btoa = require('btoa'); // encodes B64
    const atob = require('atob'); // decodes B64
    const googleAuth = require('google-auth-library');

    // Delete token.json file if you need to update change the scopes
    const SCOPES = ['https://www.googleapis.com/auth/gmail.send', 
                    'https://www.googleapis.com/auth/gmail.readonly'];

    // The file token.json stores the user's access and refresh tokens, and is
    // created automatically when the authorization flow completes for the first
    // time.
    const TOKEN_PATH = 'token.json';

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

}