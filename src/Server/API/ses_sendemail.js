var aws = require('aws-sdk');

aws.config.update({region: 'us-west-2'})

// Create sendEmail params 
var params = {
    Destination: { /* required */
      CcAddresses: [
        'neismj12@gmail.com' // temporary - change later
        /* more items */
      ],
      ToAddresses: [
        'neismj12@gmail.com' // neisguypainting@gmail.com
        /* more items */
      ]
    },
    Message: { /* required */
      Body: { /* required */
        Html: {
         Charset: "UTF-8",
         Data: "HTML_FORMAT_BODY"
        },
        Text: {
         Charset: "UTF-8",
         Data: "TEXT_FORMAT_BODY"
        }
       },
       Subject: {
        Charset: 'UTF-8',
        Data: 'Test email'
       }
      },
    Source: 'neismj12@gmail.com', /* required */
    ReplyToAddresses: [
        'neismj12@gmail.com',
      /* more items */
    ],
  };       
  
  // Create the promise and SES service object
  var sendPromise = new aws.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();
  
  // Handle promise's fulfilled/rejected states
  sendPromise.then(
    function(data) {
      console.log(data.MessageId);
    }).catch(
      function(err) {
      console.error(err, err.stack);
    });
