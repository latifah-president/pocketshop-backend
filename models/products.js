const db = require('../dbconfig.js');

products = () => {
    return db('product').select('id', 'title', 'price', 'description', 'image_url')
};

productById = (id) => {
    return db('product').where({'id': id}).first()
};

getProductsByVendor = (vendorId) => {
    return db('product').where({vendor_id: vendorId})
};

getProductsByVendorName = (vendor_name) => {
    return db('product')
    .select('product.id', 'product.title', 'product.description', 'product.price', 'product.image_url', 'product.category')
    .where({business_name: vendor_name})
}
addProduct = (product) => {
    return db('product').insert(product)
};

editProduct = (id, product) => {
    return db('product').where({ id }).update(product)
}

deleteProduct = (id) => {
    return db('product').where({ id }).del()
};

addProductByVendor = (vendorId, product) => {
    let addedProduct = {
        vendorId,
        ...product
    }
    return db('vendor').insert(addedProduct)
};
module.exports = {
    products,
    productById,
    getProductsByVendor,
    addProductByVendor,
    addProduct,
    editProduct,
    deleteProduct,
    getProductsByVendorName,
}