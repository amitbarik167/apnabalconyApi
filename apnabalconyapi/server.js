const express = require('express');
const bodyParser = require('body-parser');



//create cors
const cors = require('cors');

//create express app
const app = express();

app.use(cors());

// parse requests of contencdt-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse requests of content-type - application/json
app.use(bodyParser.json({limit: '500mb'}));


// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Doorstep application."});
});



//require verify token routes
require('./routes/verify-token.routes.js');

//require product category routes
require('./routes/product-category.routes.js')(app);
//require product sub category routes
require('./routes/product-subcategory.routes.js')(app);

//require product color routes
require('./routes/product-color.routes.js')(app);

//require product brand routes
require('./routes/product-brand.routes.js')(app);

//require product routes
require('./routes/product.routes.js')(app);

//require user authorization routes
require('./routes/user-authorization.routes.js')(app);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.set('useCreateIndex', true);

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,  useCreateIndex: true,  useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


var db = mongoose.connection;

//We enebled the Listener
db.on('error', () => {
    console.error('Error occured in db connection');
});

db.on('open', () => {
    console.log('DB Connection established successfully');
});