module.exports = (app) => {
    const productSubCategory = require('../controllers/product-subcategory.controller.js');
    const verifyTokenRoutes = require('../routes/verify-token.routes.js');

    // Create a new product category
    app.post('/productSubCategory',verifyTokenRoutes.verifyToken, productSubCategory.create);

    // Retrieve all product category
    app.get('/productSubCategories',verifyTokenRoutes.verifyToken, productSubCategory.findAll);

    // Retrieve a single product category with productCategoryId
    app.get('/productSubCategory/:_id',verifyTokenRoutes.verifyToken, productSubCategory.findOne);

    // Update a product category with productCategoryId
    app.put('/productSubCategory/:_id',verifyTokenRoutes.verifyToken, productSubCategory.update);

    // Delete a product category with productCategoryId
    app.delete('/productSubCategory/:_id',verifyTokenRoutes.verifyToken, productSubCategory.delete);

      // Create a new product sub-category
    app.post('/productSubCategory/:productSubCategoryCode',verifyTokenRoutes.verifyToken, productSubCategory.upsert);

    // Retrieve all product category
     app.get('/productsList/productSubCategories', productSubCategory.findAll);

    

}