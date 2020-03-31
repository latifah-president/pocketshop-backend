const db = require('../dbconfig.js');

products = () => {
    return db('products').select('id', 'title', 'price', 'description', 'image_url')
};

productById = (id) => {
    return db('products').where({'id': id}).first()
};

addProduct = (product) => {
    return db('products').insert(product)
};

editProduct = (id, product) => {
    return db('products').where({ id }).update(product)
}

deleteProduct = (id) => {
    return db('products').where({ id }).del()
}

module.exports = {
    products,
    productById,
    addProduct,
    editProduct,
    deleteProduct
}