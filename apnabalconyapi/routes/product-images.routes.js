module.exports = (app) => {
    const productImages = require('../controllers/product-images.controller.js');
    const verifyTokenRoutes = require('./verify-token.routes.js');
    const formidable = require('express-formidable');


      // Upload images to Product
    app.post('/productImages/:productId',formidable() ,verifyTokenRoutes.verifyToken,productImages.upsert);

     // Retrieve a single product  with productId
     app.get('/productImages/:productId', verifyTokenRoutes.verifyToken, productImages.find);

     
    // Delete  product  images  with productId
    app.delete('/productImages/:_id', verifyTokenRoutes.verifyToken, productImages.delete);


   // Retrieve a single product  with productId without auth
    app.get('/productImages/all/:productId', productImages.find);

    
}
