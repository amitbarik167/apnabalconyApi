module.exports = (app) => {
    const orderCustomerAddress = require('../controllers/order-customeraddress.controller.js');
    
    app.post('/orderCustomerAddressCreate',orderCustomerAddress.create);

}