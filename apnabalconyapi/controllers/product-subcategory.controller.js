const ProductSubCategory = require('../models/product-subcategory.model.js');
const mongoose = require('mongoose');
exports.create = (req,res)=> {

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "product category content can not be empty"
        });
    }
     // Create a product sub category
     const productSubCategory = new ProductSubCategory({
        productSubCategoryCode: req.body.productSubCategoryCode,
        productSubCategoryName: req.body.productSubCategoryName || "Untitled  product sub category",
        productSubCategoryDesc: req.body.productSubCategoryDesc,
        productCategory:req.body.productCategoryId
        })
    

    // Save product Category in the database
    productSubCategory.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Product Category."
            });
        });
};

exports.findAll = (req, res) => {
    ProductSubCategory.find().populate('productCategory','productCategoryName').then(productSubCategories => {
        res.send(productSubCategories);
        

    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving product sub categories."
        });
    });
};


exports.findOne = (req, res) => {
    ProductSubCategory.findById(req.params._id).then(productSubCategory => {

        if (!productSubCategory) {
            return res.status(404).send({
                message: "product category not found with productSubCategoryId " + req.params._id
            });
        }
        res.send(productSubCategory);

    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "product category not found with _id " + req.params._id
            });
        }
        return res.status(500).send({
            message: "Error retrieving product category with _id" + req.params._id
        });
    });
};



// This is to update product sub category existing values by _id
exports.update = (req, res) => {

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "product sub category cannot be empty for update"
        });
    }

    ProductSubCategory.findByIdAndUpdate(req.params._id, {
        productSubCategoryCode: req.body.productSubCategoryCode,
        productSubCategoryName: req.body.productSubCategoryName || "untitled product sub category",
        productSubCategoryDesc: req.body.productSubCategoryDesc

    }, { new: true }).then(productSubCategory => {

        if (!productSubCategory) {
            return res.status(404).send({
                message: "product subcategory not found with _id " + req.params._id

            });
        }
        res.send(productSubCategory)

    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "product subcategory not found with _id " + req.params._id
            });
        }
        return res.status(500).send({
            message: "Error updating product subcategory with _id " + req.params._id
        });
    });
};


exports.upsert = (req, res) => {

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "product category cannot be empty for update"
        });
    }

    ProductSubCategory.findOneAndUpdate({ productSubCategoryCode: req.params.productSubCategoryCode }, {
        productSubCategoryCode: req.body.productSubCategoryCode,
        productSubCategoryName: req.body.productSubCategoryName || "untitled product sub category",
        productSubCategoryDesc: req.body.productSubCategoryDesc,
        isActive:true,
        productCategory:req.body.productCategoryId

    }, { upsert: true, new: true, runValidators: true }).then(productSubCategory => {

        if (!productSubCategory) {
            return res.status(500).send({
                message: "product sub category could not be upserted"

            });
        }
        res.send(productSubCategory)

    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(500).send({
                message: "Error upserting product subcategory with productSubCategoryCode " + req.params.productSubCategoryCode
            });
        }
        return res.status(500).send({
            message: "Error updating product subcategory with productSubCategoryCode " + req.params.productSubCategoryCode
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

    ProductSubCategory.findByIdAndRemove(req.params._id, (err) => {
        // As always, handle any potential errors:
        if (err) return res.status(500).send(err);
        // We'll create a simple object to send back with a message and the id of the document that was removed
        // You can really do this however you want, though.
        const response = {
            message: "Product SubCategory deleted sucessfully",
        };
        return res.status(200).send(response);
});
};


