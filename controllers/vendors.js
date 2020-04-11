const Vendor = require('./../models/vendors');
const User = require('./../models/users');


//separate registration for vendor. 
//on frontend onClick to register market new market will be directed to strip express setup
//useEffect to update stripe_id for vendor

//1. vendor registers at /vendor/register this will allow us to set the user type automatically
//2. vendor clicks continue button on vendor registration form and will be directed to the stripe express on boarding screen if our  
// res.status to /vendor/register  === 201
//3. once on boarding is completed we now have our stripe_id for the vendor
//4. stripe will redirect us to our profile route vendor/:id
//5. in a use effect call /vendor/addVendor, {stripe_id: stripAccountId} to update the vendor table with the stripe id we got from on boarding
// if res.status to /vendor/addVendor === 201 call /vendor/:id
exports.getVendorById = async (req, res) => {
  try {
      const {firebase_id} = req.params;
      if (!firebase_id) {
          res.status(400).json(`Unable to find customer profile, check id`);
      } else {
          console.log(firebase_id,'id')
          const vendorData = await Vendor.getVendorById(firebase_id)
          console.log(vendorData, 'bottom of await from vendor by id')
          res.status(200).json(vendorData);
      }
  } catch(err) {
      res.status(500).json(`Error find customerr: ${err}`);
      console.log(`error from get customer by id: ${err}`)
  }
};

exports.addVendor = async (req, res) => {
  try {
      const {firebase_id, first_name, last_name, street_address, city, state, zip, country, phone_number, vendor_name} = req.body;
      const userData = {
        // user_type,  
        
        first_name, 
        last_name, 
        street_address, 
        city, 
        state, 
        zip, 
        country, 
        phone_number
      }
      console.log("userData:", userData)
      if (!firebase_id  || !vendor_name) {

      // if (!firebase_id || !email || !user_type || !first_name || !last_name || !street_address || !city || !state || !zip || !country || !phone_number || !vendor_name ) {
          res.status(404).json(`Please enter all input fields`);
      } else  {
         
          
          const newVendor = await Vendor.registerVendor(firebase_id, req.body.vendor_name);
          const updatedUser = await User.updateUser(firebase_id, userData)
          // console.log("new vendor error:", newVendor.error)
          console.log(updatedUser, 'user from vendor register')
        
        res.status(201).json(`Welcome ${vendor_name}`);

  } 
}catch(err) {
  if(err.code === 23505) {
    res.status(400).json("There is a vednor by another name")
  } else {
    res.status(500).json(`There was an error adding you information`);
    console.log(`error from addVendor: ${err}`)
  }
      
  }
};

  exports.updateVendor = async (req, res) => {
      try {
        // const {changes} = req.body;
        const {firebase_id} = req.params;
        console.log("stripe changes from frontend", firebase_id)

        console.log("stripe changes from frontend", req.body.changes)
        if (!firebase_id) {
            res.status(404).json(`Vendor information was not updated`);
        } else {
            const vendor = await Vendor.updateVendor(firebase_id, req.body.changes);
            console.log(vendor)
            console.log("stripe changes from frontend bottom", req.body.changes)

            res.status(200).json(req.body);
        }
      } catch (err) {
        res.status(500).json(`error updating vendor: ${err}`);
          console.log(err, 'edit vendor error')
      }
  };

  exports.deleteVendor = async (req, res) => {
    try {
      const {id} = req.params;
      if (!id) {
        res.status(404).json({ errorMessage: 'No vendor selected' });
      } else {
        const vendor = await Vendor.deleteVendor(id);
        res.status(204).json('Vendor sucessfully deleted')
      }
    } catch (err) {
      res.status(500).json(`Cannot delete product: ${err}`);
      console.log(err);
    }
  };