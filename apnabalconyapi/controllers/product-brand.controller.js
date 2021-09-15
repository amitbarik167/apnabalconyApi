const ProductBrand= require('../models/product-brand.model.js');
const formidable = require('express-formidable');
const fs = require('fs'); 

const mongoose = require('mongoose');
exports.create = (req,res)=> {

    if (req.fields.productBrandCode == "" || req.fields.productBrandName == "" || req.files.productBrandImg.path =="") {
        return res.status(400).send({
            message: "product brand content can not be empty"
        });
    }
     // Create a product sub category
     const productBrand = new ProductBrand({
        productBrandCode: req.body.productBrandCode,
        productBrandName: req.body.productBrandName || "Untitled  product brand",
        productBrandDesc: req.body.productBrandDesc,
        productBrandImg: fs.readFileSync(req.files.productBrandImg.path),
        productCategory:req.body.productCategoryId,
        productSubCategory:req.body.productSubCategoryId,
        isActive:true,
        createdBy : req.body.createdBy
        })
    

    // Save product Brand in the database
    productBrand.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Product Brand."
            });
        });
};

exports.findAll = (req, res) => {
    ProductBrand.find().populate('productCategory','productCategoryName').populate('productSubCategory','productSubCategoryName').then(productBrands => {
        res.send(productBrands);
        

    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving product brands"
        });
    });
};


exports.findOne = (req, res) => {
    ProductBrand.findById(req.params.productBrandCode).then(productBrand => {

        if (!productBrand) {
            return res.status(404).send({
                message: "product brand not found with product brand Id " + req.params._id
            });
        }
        res.send(productBrand);

    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "product brand not found with _id " + req.params._id
            });
        }
        return res.status(500).send({
            message: "Error retrieving product brand with _id" + req.params._id
        });
    });
};



// This is to update product  brand existing values by _id
exports.update = (req, res) => {

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "product brand cannot be empty for update"
        });
    }


    ProductBrand.findByIdAndUpdate(req.params._id, {
        productBrandCode: req.body.productBrandCode,
        productBrandName: req.body.productBrandName || "Untitled  product brand",
        productBrandDesc: req.body.productBrandDesc,
        isActive:true,
        modifiedBy : req.body.modifiedBy

    }, { new: true }).then(productBrand => {

        if (!productBrand) {
            return res.status(404).send({
                message: "product brand not found with _id " + req.params._id

            });
        }
        res.send(productBrand)

    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "product brand not found with _id " + req.params._id
            });
        }
        return res.status(500).send({
            message: "Error updating product brand with _id " + req.params._id
        });
    });
};


exports.upsert = (req, res) => {

    if (req.fields.productBrandCode == "" || req.fields.productBrandName == "" || req.files.productBrandImg.path =="")  {
        return res.status(400).send({
            message: "Either Product Brand Code or Product Brand Name or Product Brand Image is blank."
        });
    }
    ProductBrand.findOneAndUpdate({ productBrandCode: req.params.productBrandCode }, {
        productBrandCode: req.fields.productBrandCode,
        productBrandName: req.fields.productBrandName || "Untitled  product brand",
        productBrandDesc: req.fields.productBrandDesc,
        productBrandImg: fs.readFileSync(req.files.productBrandImg.path),
        productCategory:req.fields.productCategoryId,
        productSubCategory:req.fields.productSubCategoryId,
        isActive:true,
        createdBy : req.fields.createdBy

    }, { upsert: true, new: true, runValidators: true }).then(productBrandCode => {

        if (!productBrandCode) {
            return res.status(500).send({
                message: "product brand could not be upserted"

            });
        }
        res.send(productBrandCode)

    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(500).send({
                message: "Error upserting product brand with productBrandCode " + req.params.productBrandCode
            });
        }
        return res.status(500).send({
            message: "Error updating product brand with productBrandCode " + req.params.productBrandCode
        });
    });
};

    // This is to update product category existing values by _id
exports.delete = (req, res) => {

    if (Object.keys(req.params).length === 0) {
        return res.status(400).send({
            message: "_id cannot be blank"
        });
    }

    ProductBrand.findByIdAndRemove(req.params._id, (err) => {
        // As always, handle any potential errors:
        if (err) return res.status(500).send(err);
        // We'll create a simple object to send back with a message and the id of the document that was removed
        // You can really do this however you want, though.
        const response = {
            message: "Product Brand deleted sucessfully",
        };
        return res.status(200).send(response);
   });
};


