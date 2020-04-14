require('dotenv').config()

const stripe = require('stripe')(process.env.STRIPE_SK);
const querystring = require('querystring');
const request = require('request-promise-native');
const Vendor = require('./../models/vendors');

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
      // redirect_uri: `https://pocket-shop.herokuapp.com/` + '/stripe/token',
      redirect_uri: `http://localhost:8585` + '/stripe/token',

      'stripe_user[business_type]': req.query.type || 'individual',
      'stripe_user[business_name]': req.query.vendor_name || undefined,
      'stripe_user[first_name]': req.query.first_name || undefined,
      'stripe_user[last_name]': req.query.last_name || undefined,
      'stripe_user[email]': req.query.email || undefined,
      'stripe_user[street_address]': req.query.street_address || undefined,
      'stripe_user[city]': req.query.city || undefined,
      'stripe_user[state]': req.query.state || undefined,
      'stripe_user[zip]': req.query.zip || undefined,
      'stripe_user[country]': req.query.country || 'US',
      'suggested_capabilities[]': 'card_payments',
    });
    console.log('Starting Express flow:', parameters);
    console.log(process.env.STRIPE_AUTH_URI + '?' + querystring.stringify(parameters))

    // Redirect to Stripe to start the Express onboarding flow
    res.redirect(
        process.env.STRIPE_AUTH_URI + '?' + querystring.stringify(parameters)
    );
  };

exports.token = async (req, res, next) => { //put request to update vendor stripeid
    // Check the `state` we got back equals the one we generated before proceeding (to protect from CSRF)
    // if (req.session != req.query.state) {
    //   res.redirect('/pilots/signup');
    // }
    try {
      console.log("code", req.body)
      // Post the authorization code to Stripe to complete the Express onboarding flow
      // const expressAuthorized = await request.post({
      //   uri: process.env.STRIPE_TOKEN_URI,
      //   form: { 
      //     grant_type: 'authorization_code',
      //     client_id: process.env.STRIPE_CLIENT_ID,
      //     client_secret: process.env.STRIPE_SK,
      //     code: req.query.code
      //   },
      //   json: true
      // });
  
      // if (expressAuthorized.error) {
      //   throw(expressAuthorized.error);
      // }
      const {stripe_id, firebase_id} = req.body
      console.log("code", stripe_id)
      console.log("firenase", firebase_id)

      const response = await stripe.oauth.token({
          grant_type: 'authorization_code',
          client_id: process.env.STRIPE_CLIENT_ID,
          client_secret: process.env.STRIPE_SK,
          code: req.body.stripe_id
        });
        
        console.log("response from token:", response)
        if(!response) {
          console.log(response.error)
          res.send("Stripe error: Unable to connect account")
        } else if (response){
          // const vendor = await Vendor.updateVendor(req.body.firebase_id, {stripe_id: response.stripe_user_id})
          // console.log("vendor from stripe/token", vendor)
          res.status(200).send(response.stripe_user_id)
          console.log("response from token in if:", response)
          // const stripe_id = response.stripe_user_id;
          
          // res.redirect(`/http://localhost:3000/vendor/${firebase_id}`)
          // if (vendor) {
          //   console.log(vendor, "udated vendor")
          //   res.send("vendor updated")
          // } else {
          //   res.send("vendor stripe update fail")
          // }
          console.log("vendor stripe account has been added")
        }
  
    } catch (err) {
      console.log('The Stripe onboarding process has not succeeded.', err);
      // next(err);
    }
  };

  exports.dashboard = async (req, res) => {
    const {stripe_id} = req.body
    console.log(stripe_id)
    try {
        // Generate a unique login link for the associated Stripe account to access their Express dashboard
        const loginLink = await stripe.accounts.createLoginLink(
          stripe_id, {
            redirect_url: `${process.env.BACKEND_URL}` + '/stripe/dashboard'
          }
        );
        // Directly link to the account tab
        if (req.query.account) {
          loginLink.url = loginLink.url + '#/account';
        }
        // Retrieve the URL from the response and redirect the user to Stripe
        return res.status(200).json(loginLink.url);
      } catch (err) {
        console.log(err);
        console.log('Failed to create a Stripe login link.');
     }
    // stripe.accounts.createLoginLink(
    //   stripe_acc_id,
    //   function(err, link) {
        
    //     if(err) {
    //       console.log(err)
    //       res.status(300).json({message: 'Incorrect account', err})
    //     } else {
    //       res.status(200).json(link)
    //     }
    //   }
    // );
  };

  exports.payout =  async (req, res) => {
    console.log(req.body, "strope id")
    console.log(req.body.stripe_id, "stripe_id")

    const {stripe_id} = req.body
    console.log("stripe_id", stripe_id)

    try {
      // Fetch the account balance to determine the available funds
      const balance = await stripe.balance.retrieve({
        stripeAccount: stripe_id,
      });
      // there is one balance for each currency used in application
      const {amount, currency} = balance.available[0];
      const {pendingAmount} = balance.pending[0];

      // Create an instant payout
      console.log("balance", balance)

      // const payout = await stripe.payouts.create(
      //   {
      //     amount: amount,
      //     currency: currency,
      //     statement_descriptor: 'PocketShop',
      //   },
      //   {
      //     stripeAccount: stripe_id,
      //   }
      // );
      // console.log("payout", payout)

      res.status(200).json({available: amount, pending: pendingAmount})
    } catch (err) {
      console.log(err);
    }
   
  };