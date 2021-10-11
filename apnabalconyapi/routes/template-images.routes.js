module.exports = (app) => {
    const templateImages = require('../controllers/template-images.controller.js');
    const verifyTokenRoutes = require('./verify-token.routes.js');
    const formidable = require('express-formidable');


      // Upload images to Template
    app.post('/templateImagesCreate/:templateId',formidable() ,verifyTokenRoutes.verifyToken,templateImages.upsert);

     // Retrieve a single Template  with templateId
     app.get('/templateImages/:templateId', verifyTokenRoutes.verifyToken, templateImages.find);

     
    // Delete  Template  images  with templateId
    app.delete('/templateImagesDelete/:templateId', verifyTokenRoutes.verifyToken, templateImages.delete);

      // Retrieve a single Template  with templateId for Cart
    app.get('/templateImages/cart/:templateId',  templateImages.find);


}
