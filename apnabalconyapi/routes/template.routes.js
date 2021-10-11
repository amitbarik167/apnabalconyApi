module.exports = (app) => {
    const template = require('../controllers/template.controller.js');
    const verifyTokenRoutes = require('../routes/verify-token.routes.js');
    const formidable = require('express-formidable');
    
    app.post('/templateCreate/:templateCode',formidable(),verifyTokenRoutes.verifyToken,template.upsert);

      // Retrieve all templates
    app.get('/templateAll' , verifyTokenRoutes.verifyToken,template.findAll);

        // Update a product category with productCategoryId
    app.put('/templateUpdate/:_id', verifyTokenRoutes.verifyToken, template.update);

     // Delete  Template  images  with templateId
     app.delete('/templateDelete/:_id', verifyTokenRoutes.verifyToken, template.delete);

        // Retrieve all templates
     app.get('/templateAllCart' , template.findAll);

     
   // Retrieve templates based on search criteria
    app.put('/templates', template.find);


 

}