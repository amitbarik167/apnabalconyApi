module.exports = (app) => {
    const productCategory = require('../controllers/product-category.controller.js');
    const verifyTokenRoutes = require('../routes/verify-token.routes.js')
    const formidable = require('express-formidable');
    
    // Create a new product category
    app.post('/productCategory', verifyTokenRoutes.verifyToken, productCategory.create);

    // Retrieve all product category
    app.get('/productCategories', verifyTokenRoutes.verifyToken, productCategory.findAll);

    // Retrieve a single product category with productCategoryId
    app.get('/productCategory/:_id', verifyTokenRoutes.verifyToken, productCategory.findOne);

    // Update a product category with productCategoryId
    app.put('/productCategory/:_id', verifyTokenRoutes.verifyToken,productCategory.update);

    // Delete a product category with productCategoryId
    app.delete('/productCategory/:_id', verifyTokenRoutes.verifyToken, productCategory.delete);

      // Create a new product category
    app.post('/productCategory/:productCategoryCode',formidable(), verifyTokenRoutes.verifyToken, productCategory.upsert);

     // Retrieve all product category
     app.get('/productsList/productCategories',  productCategory.findAll);


}