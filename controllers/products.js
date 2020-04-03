const Products = require('../models/products');

exports.getProductsByVendor = async (req, res) => {
    try {
        const {vendor_id} = req.params;
        console.log("Vendor id,", vendor_id);
        if (!vendor_id) {
          res.status(404).json({ errorMessage: 'No vendor found' });
        } else {
          const productsData = await Products.getProductsByVendor(vendor_id);
          console.log("Products Data:", productsData);
          res.status(200).json(productsData);
        }
      } catch (err) {
        res.status(500).json(`No products found: ${err}`);
        console.log(err);
      }
}

exports.addProductByVendorId = async (req, res) => {
    try {
      let product = {
          title: req.body.title,
          description: req.body.description,
          price: req.body.price,
          image_url: req.body.image_url,
          category: req.body.category,
          vendor_id: req.body.vendor_id
      }
      if (!product.vendor_id || !product.title || !product.description || !product.price || !product.image_url || !product.category) {
        res.status(404).json({ message: `Enter All Fields` });
      } else {
        const addedProduct = await Products.addProduct(product);
        console.log("Added product", addedProduct);
        res.status(201).json(`Product Added!`);
      }
    } catch (err) {
      res.status(500).json(`Can not add product: ${err}`);
      console.log(err);
    }
  };

  exports.updateProductById = async (req, res, next) => {
    try {
      const {id} = req.params;
      let product = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        image_url: req.body.image_url,
        category: req.body.category
    }
      if (!id || !product.title || product.description || product.price || product.image_url || product.category) {
        res.status(404).json({ errorMessage: 'Please enter all fields'});
      } else {
        const updatedProduct = await Products.editProduct(id, product);
        console.log("Updated Product:", updatedProduct);
        if (!updatedProduct) {
          res.status(404).json({ errorMessage: 'You product was not be updated'});
        } else {
          res.status(200).json(updatedProduct);
        }
      }
    } catch (err) {
      res.status(500).json(`Cannot update product: ${err}`);
      console.log(err);
    }
  };

  exports.deleteProductById = async (req, res, next) => {
    try {
      const {id} = req.params;
      if (!id) {
        res.status(404).json({ errorMessage: 'Product not found' });
      } else {
        const deletedProduct = await Products.deleteProduct(
          product_id
        );
        console.log("Deleted Product:", deletedProduct);
        if (!deletedProduct) {
          res.status(404).json({ errorMessage: 'This product does not exist' });
        } else {
          res.status(200).json(deletedProduct);
        }
      }
    } catch (err) {
      res.status(500).json(`Cannot delete product: ${err}`);
      console.log(err);
    }
  };