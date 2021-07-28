module.exports = (app) => {
    const product = require('../controllers/product.controller.js');
    const verifyTokenRoutes = require('../routes/verify-token.routes.js');
    const formidable = require('express-formidable');
    
    // Create a new product 
    app.post('/product', verifyTokenRoutes.verifyToken, product.create);

    // Retrieve all product 
    app.get('/products', verifyTokenRoutes.verifyToken, product.findAll);

     // Retrieve all product 
     app.get('/products/all', product.findAll);

    // Retrieve a single product  with _id
    app.get('/product/:_id', verifyTokenRoutes.verifyToken, product.findOne);

    // Update a product with _id
    app.put('/product/:_id', verifyTokenRoutes.verifyToken,product.update);

    // Delete a product  with _id
    app.delete('/product/:_id', verifyTokenRoutes.verifyToken, product.delete);

      // Create a new product
    app.post('/product/:productCode',formidable() ,verifyTokenRoutes.verifyToken,product.upsert);

        // Retrieve all product 
    app.put('/products', product.find);

}