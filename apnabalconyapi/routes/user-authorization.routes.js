module.exports = (app) => {
    const userAuthorization = require('../controllers/user-authorization.controller.js');
    // Save User Authorization
    app.post('/userAuthorization/:userId', userAuthorization.upsert);

    // Retrieve user authorization details based on userId
    app.get('/userAuthorization/:userId', userAuthorization.findOne);

    // Retrieve all user authorizations
    app.get('/userAuthorizationsAll', userAuthorization.findAll);

    // Update a user authorization with _id
    app.put('/userAuthorization/:_id', userAuthorization.update);
}