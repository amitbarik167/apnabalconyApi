module.exports = (app) => {
    const sendEmail = require('../controllers/send-email.controller.js');
    
    app.post('/sendEmail',sendEmail.create);



}