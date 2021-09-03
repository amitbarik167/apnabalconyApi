module.exports = (app) => {
    const orderItems = require('../controllers/order-items.controller.js');
    
    app.post('/orderItemsCreate',orderItems.create);

    // Retrieve all product 
    app.get('/orderItems',  orderItems.findAll);

}