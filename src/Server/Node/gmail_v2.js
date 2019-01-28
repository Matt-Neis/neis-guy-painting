/**
 * TESTING
 */
var test = 'test';
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
    const btoa = require('btoa');
    const googleAuth = require('google-auth-library');

    // Delete token.json file if you need to update change the scopes
    const SCOPES = ['https://www.googleapis.com/auth/gmail.send', 
                    'https://www.googleapis.com/auth/gmail.readonly'];

    // The file token.json stores the user's access and refresh tokens, and is
    // created automatically when the authorization flow completes for the first
    // time.
    const TOKEN_PATH = 'token.json';

    console.log(message);
}