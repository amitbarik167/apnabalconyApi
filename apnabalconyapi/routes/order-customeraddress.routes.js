module.exports = (app) => {
    const orderCustomerAddress = require('../controllers/order-customeraddress.controller.js');
    
    app.post('/orderCustomerAddressCreate',orderCustomerAddress.create);

    // Retrieve a single order Item with OrderId
    app.get('/orderCustomerAddress/:orderId', orderCustomerAddress.find);


}