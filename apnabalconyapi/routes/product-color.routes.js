module.exports = (app) => {
    const productColor = require('../controllers/product-color.controller.js');
    const verifyTokenRoutes = require('../routes/verify-token.routes.js');
    const formidable = require('express-formidable');
    
    // Create a new product color
    app.post('/productColor', verifyTokenRoutes.verifyToken, productColor.create);

    // Retrieve all product color
    app.get('/productColors', verifyTokenRoutes.verifyToken, productColor.findAll);

    // Retrieve a single product color with _id
    app.get('/productColor/:_id', verifyTokenRoutes.verifyToken, productColor.findOne);

    // Update a product color with _id
    app.put('/productColor/:_id', verifyTokenRoutes.verifyToken,productColor.update);

    // Delete a product color with _id
    app.delete('/productColor/:_id', verifyTokenRoutes.verifyToken, productColor.delete);

      // Create a new product color
    app.post('/productColor/:productColorCode',formidable() ,verifyTokenRoutes.verifyToken,productColor.upsert);

}