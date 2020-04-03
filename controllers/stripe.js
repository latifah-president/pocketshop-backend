require('dotenv').config()

const stripe = require('stripe')(process.env.STRIPE_SK);
const querystring = require('querystring');
const request = require('request');

exports.authorize = (req, res) => {
  console.log(req.query, 'stripe')
    // Generate a random string as `state` to protect from CSRF and include it in the session
    // req.session.state = Math.random()
    //   .toString(36)
    //   .slice(2);
    // Define the mandatory Stripe parameters: make sure to include our platform's client ID
    let parameters = {
      client_id: process.env.STRIPE_CLIENT_ID,
    //   state: req.session.state,
    };
    // Optionally, the Express onboarding flow accepts `first_name`, `last_name`, `email`,
    // and `phone` in the query parameters: those form fields will be prefilled
    parameters = Object.assign(parameters, {
      redirect_uri: `${process.env.BACKEND_URL}` + '/stripe/token',
      'stripe_user[business_type]': req.query.type || 'individual',
      'stripe_user[business_name]': req.query.first_name || undefined,
      'stripe_user[first_name]': req.query.first_name || undefined,
      'stripe_user[last_name]': req.query.last_name || undefined,
      'stripe_user[email]': req.query.email || undefined,
      'stripe_user[street_address]': req.query.street_address || undefined,
      'stripe_user[city]': req.query.city || undefined,
      'stripe_user[state]': req.query.state || undefined,
      'stripe_user[zip]': req.query.zip || undefined,
      'stripe_user[country]': req.query.country || undefined,
      'suggested_capabilities[]': 'card_payments',
    });
    console.log('Starting Express flow:', parameters);
    console.log(process.env.STRIPE_AUTH_URI + '?' + querystring.stringify(parameters))

    // Redirect to Stripe to start the Express onboarding flow
    res.redirect(
        process.env.STRIPE_AUTH_URI + '?' + querystring.stringify(parameters)
    );
  };
  
// exports.authorize = async (req, res) => { //begin stripe onboarding
//     res.send('stripe controller')
//     console.log(req.body, 'from stripe')
//     console.log(req.params, 'params from authorize')
//     console.log('requster', req.user)
    
//       let parameters = {
//           client_id: process.env.STRIPE_CLIENT_ID,
         
//         }
//         parameters = Object.assign(parameters, {
//           redirect_uri: `http://localhost:${process.env.PORT}` + '/stripe/token',
//           'stripe_user[business_type]': req.body.type || 'individual',
//           'stripe_user[business_name]': req.body.vendor_name || undefined,
//           'stripe_user[first_name]': req.body.first_name || undefined,
//           'stripe_user[last_name]': req.body.last_name || undefined,
//           'stripe_user[email]': req.body.email || undefined,
//           'stripe_user[street_address]': req.body.street_address || undefined,
//           'stripe_user[city]': req.body.city || undefined,
//           'stripe_user[state]': req.body.state || undefined,
//           'stripe_user[zip]': req.body.zip || undefined,
//           'stripe_user[country]': req.body.country || undefined,
//           'stripe_user[phone_number]': req.body.phone_number || undefined,
//           'suggested_capabilities[]': 'card_payments',
//         }),
//         console.log('Starting Express flow:', parameters);
//         // Redirect to Stripe to start the Express onboarding flow
//         // console.log(process.env.STRIPE_AUTH_URI + '?' + querystring.stringify(parameters))
//         // res.status(200).redirect(process.env.STRIPE_AUTH_URI + '?' + querystring.stringify(parameters))
//         res.redirect(
//             process.env.STRIPE_AUTH_URI + '?' + querystring.stringify(parameters)
//           );
    
// };

   //Martket Token 
   exports.token = async (req, res) => { //put request to update vendor stripeid
    // Check the `state` we got back equals the one we generated before proceeding (to protect from CSRF)
    // if (req.session != req.query.state) {
    //   res.redirect('/pilots/signup');
    // }
    // Post the authorization code to Stripe to complete the Express onboarding flow
    try {
      console.log('req.query', req.query)

      const expressAuthorized = await request.post({
        uri: process.env.STRIPE_TOKEN_URI, 
        form: { 
          grant_type: 'authorization_code',
          client_id: process.env.STRIPE_CLIENT_ID,
          client_secret: process.env.STRIPE_SK,
          code: req.query.code
        },
        json: true
      });

      if(expressAuthorized.error) {
        throw(expressAuthorized.error)
      }
    } catch (err) {
        console.log('The Stripe onboarding process has not succeeded.', err)
    }
    
      // request.post({
      //     uri: process.env.STRIPE_TOKEN_URI,
      //     form: {
      //       grant_type: 'authorization_code',
      //       client_id: process.env.STRIPE_CLIENT_ID,
      //       client_secret: process.env.STRIPE_SK,
      //       code: req.query.code,
      //     },
      //     json: true,
      //   },
      //   (err, response, body) => {
      //     if (err || body.error) {
      //       console.log('The Stripe onboarding process has not succeeded.');
      //       console.log('err', err, body)
      //     } else {
      //       // Update the model and store the Stripe account ID in the datastore:
      //       // this Stripe account ID will be used to issue payouts to the pilot
      //       // req.user.stripeAccountId = body.stripe_user_id;
      //       // req.user.save();
      //       res.status(200).json(response)
      //       console.log('success!')
      //     }
      //   }
      // );

  };

  exports.dashboard = async (req, res) => {
    const {stripe_id} = req.body
    console.log(stripe_id)
    // try {
    //     // Generate a unique login link for the associated Stripe account to access their Express dashboard
    //     const loginLink = await stripe.accounts.createLoginLink(
    //       pilot.stripeAccountId, {
    //         redirect_url: `http://localhost:${process.env.PORT}` + '/stripe/dashboard'
    //       }
    //     );
    //     // Directly link to the account tab
    //     if (req.query.account) {
    //       loginLink.url = loginLink.url + '#/account';
    //     }
    //     // Retrieve the URL from the response and redirect the user to Stripe
    //     return res.redirect(loginLink.url);
    //   } catch (err) {
    //     console.log(err);
    //     console.log('Failed to create a Stripe login link.');
    //  }
    stripe.accounts.createLoginLink(
      stripe_acc_id,
      function(err, link) {
        
        if(err) {
          console.log(err)
          res.status(300).json({message: 'Incorrect account', err})
        } else {
          res.status(200).json(link)
        }
      }
    );
  };

  exports.payout =  async (req, res) => {
    const {stripe_id} = req.body
    try {
      // Fetch the account balance to determine the available funds
      const balance = await stripe.balance.retrieve({
        stripe_account: stripe_id,
      });
      // This demo app only uses USD so we'll just use the first available balance
      // (Note: there is one balance for each currency used in your application)
      const {amount, currency} = balance.available[0];
      // Create an instant payout
      const payout = await stripe.payouts.create(
        {
          amount: amount,
          currency: currency,
          statement_descriptor: 'PocketShop',
        },
        {
          stripe_account: stripe_id,
        }
      );
    } catch (err) {
      console.log(err);
    }
   
  };