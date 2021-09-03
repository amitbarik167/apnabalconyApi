const ProductCategory = require('../models/product-category.model.js');

exports.create = (req, res) => {

    // Validate request

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "product category content can not be empty"
        });
    }

    // Create a product category
    const productCategory = new ProductCategory({
        productCategoryCode: req.body.productCategoryCode,
        productCategoryName: req.body.productCategoryName || "Untitled product category",
        productCategoryDesc: req.body.productCategoryDesc,
        createdBy : req.body.createdBy

    });

    // Save product Category in the database
    productCategory.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Product Category."
            });
        });
};

exports.findAll = (req, res) => {
    ProductCategory.find().then(productCategories => {
        res.send(productCategories);

    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving product categories."
        });
    });
};

exports.findOne = (req, res) => {
    ProductCategory.findById(req.params.productCategoryCode).then(productCategory => {

        if (!productCategory) {
            return res.status(404).send({
                message: "product category not found with _id " + req.params._id
            });
        }
        res.send(productCategory);

    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "product category not found with _id " + req.params._id
            });
        }
        return res.status(500).send({
            message: "Error retrieving product category with _id " + req.params._id
        });
    });
};



// This is to update product category existing values by _id
exports.update = (req, res) => {

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "product category cannot be empty for update"
        });
    }

    ProductCategory.findByIdAndUpdate(req.params._id, {
        productCategoryCode: req.body.productCategoryCode,
        productCategoryName: req.body.productCategoryName || "untitled product category",
        productCategoryDesc: req.body.productCategoryDesc,
        modifiedBy:req.body.modifiedBy

    }, { new: true }).then(productCategory => {

        if (!productCategory) {
            return res.status(404).send({
                message: "Product Category not found with id " + req.params._id

            });
        }
        res.send(productCategory)

    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product Category not found with id " + req.params._id
            });
        }
        return res.status(500).send({
            message: "Error updating product category with id " + req.params._id
        });
    });
};


exports.upsert = (req, res) => {

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "product category cannot be empty for update"
        });
    }

    ProductCategory.findOneAndUpdate({ productCategoryCode: req.params.productCategoryCode }, {
        productCategoryCode: req.body.productCategoryCode,
        productCategoryName: req.body.productCategoryName || "untitled product category",
        productCategoryDesc: req.body.productCategoryDesc,
        createdBy : req.body.createdBy,
        isActive:true,
       

    }, { upsert: true, new: true, runValidators: true }).then(productCategory => {

        if (!productCategory) {
            return res.status(500).send({
                message: "Product Category could not be upserted"

            });
        }
        res.send(productCategory)

    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(500).send({
                message: "Error updating product category with id " + req.params.productCategoryCode
            });
        }
        return res.status(500).send({
            message: "Error updating product category with id " + req.params.productCategoryCode
        });
    });
};

// This is to delete product category existing values by _id
exports.delete = (req, res) => {

    if (Object.keys(req.params).length === 0) {
        return res.status(400).send({
            message: "_id cannot be blank"
        });
    }

    ProductCategory.findByIdAndRemove(req.params._id, (err) => {
        // As always, handle any potential errors:
        if (err) return res.status(500).send(err);
        // We'll create a simple object to send back with a message and the id of the document that was removed
        // You can really do this however you want, though.
        const response = {
            message: "Product Category deleted sucessfully",
        };
        return res.status(200).send(response);
});
};



