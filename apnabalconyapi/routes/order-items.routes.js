module.exports = (app) => {
    const orderItems = require('../controllers/order-items.controller.js');
    
    app.post('/orderItemsCreate',orderItems.create);


    
     // Retrieve a single order Item with OrderId
     app.get('/orderItems/:orderId', orderItems.find);


}