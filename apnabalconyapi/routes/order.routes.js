module.exports = (app) => {
    const order = require('../controllers/order.controller.js');
    
    app.post('/orderCreate',order.create);

     // Retrieve a single order with OrderNo
    app.get('/orderFind/:orderNo', order.findOne);

      // Retrieve all orders
    app.get('/orderAll' , order.findAll);

        // Update a product category with productCategoryId
    app.put('/orderUpdate/:_id', order.update);
}