module.exports = (app) => {
    const productBrand = require('../controllers/product-brand.controller.js');
    const verifyTokenRoutes = require('../routes/verify-token.routes.js');
    const formidable = require('express-formidable');
    
    // Create a new product brand
    app.post('/productBrand', verifyTokenRoutes.verifyToken, productBrand.create);

    // Retrieve all product brand
    app.get('/productBrands', verifyTokenRoutes.verifyToken, productBrand.findAll);

    // Retrieve a single product brand with _id
    app.get('/productBrand/:_id', verifyTokenRoutes.verifyToken, productBrand.findOne);

    // Update a product brand with _id
    app.put('/productBrand/:_id', verifyTokenRoutes.verifyToken,productBrand.update);

    // Delete a product brand with _id
    app.delete('/productBrand/:_id', verifyTokenRoutes.verifyToken, productBrand.delete);

      // Create a new product brand
    app.post('/productBrand/:productBrandCode',formidable() ,verifyTokenRoutes.verifyToken,productBrand.upsert);

    // Retrieve all product brand
    app.get('/productsList/productBrands',  productBrand.findAll);

 



}