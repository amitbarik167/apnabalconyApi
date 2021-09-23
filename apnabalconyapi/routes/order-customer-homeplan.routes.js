module.exports = (app) => {
    const orderCustomerHomePlanImages = require('../controllers/order-customer-homeplan.js');
    const formidable = require('express-formidable');


      // Upload images to Product
    app.post('/orderCustomerHomePlan/:orderId',formidable() ,orderCustomerHomePlanImages.upsert);

     // Retrieve a single product  with productId
     app.get('/orderCustomerHomePlan/:orderId',  orderCustomerHomePlanImages.find);

     


    
}
