module.exports = (app) => {
    const order = require('../controllers/order.controller.js');
    
    app.post('/orderCreate',order.create);

}