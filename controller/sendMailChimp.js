const Mailchimp = require('mailchimp-api-v3');
  
const mailchimp = new Mailchimp("492dee1b7089f6ccb7cd473adc806655-us21");


const listId = "30868111dd"

  mailchimp.post(`/lists/${listId}/members`, {
    email_address: 'sameedzahoor.contact0@gmail.com',
    status: 're-subscribe',
    merge_fields: {
      FNAME: 'Sameed',
      LNAME: 'Zahoor'
    }
  })
  .then(function(results) {
    console.log('Subscriber added successfully:', results);
  })
  .catch(function(err) {
    console.log('Error occurred:');
  });

  const campaignParams = {
    type: 'regular',
    recipients: {
      list_id: listId
    },
    settings: {
      subject_line: 'Email sent with Mailchimp API',
      preview_text: 'Email sent with Mailchimp API',
      title: 'Email sent with Mailchimp API',
      from_name: 'Muhammad Awais',
      reply_to: 'demo00629@gmail.com',
      template_id: 16906
    },
    content: {
      html: '<p>Test Email Body</p>'
    },
    tracking: {
      opens: true,
      html_clicks: true,
      text_clicks: false,
      goal_tracking: false,
      ecomm360: false
    }
  };



  mailchimp.post('/campaigns', campaignParams)
  .then((response) => {
    console.log('Campaign created successfully');

    // Send the campaign
    return mailchimp.post(`/campaigns/${response.id}/actions/send`);
  })
  .then((response) => {
    console.log('Campaign sent successfully');
  })
  .catch((error) => {
    console.error('Error creating/sending campaign', error.errors);
  });