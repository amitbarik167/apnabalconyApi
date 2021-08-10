const Product= require('../models/product.model.js');
const formidable = require('express-formidable');
const fs = require('fs'); 
var ObjectId = require('mongodb').ObjectID;

const mongoose = require('mongoose');
const { match } = require('assert');
exports.create = (req,res)=> {

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "product  content can not be empty"
        });
    }
     // Create a product sub category
     const product = new Product({

        productCode: req.fields.productCode,
        productName: req.fields.productName || "Untitled  product",
        productDesc: req.fields.productDesc,
        productImg: fs.readFileSync(req.files.productImg.path),
        productPrice:req.fields.productPrice,
        productDiscount:req.fields.productDiscount,
        productOffersId:req.fields.productOffersId,
        productCustomerRating:req.fields.productCustomerRating,
        productStockUnits:req.fields.productStockUnits,
        productCategory:req.fields.productCategoryId,
        productSubCategory:req.fields.productSubCategoryId,
        productColor:req.fields.productColorId,
        productBrand:req.fields.productBrandId,
        isActive:true
        })
    

    // Save product in the database
    product.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Product."
            });
        });
};

exports.findAll = (req, res) => {
    Product.find().populate('productCategory','productCategoryName').populate('productSubCategory','productSubCategoryName').populate('productBrand','productBrandImg').populate('productColor','productColorImg').then(products => {
        res.send(products);
        

    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving products"
        });
    });
};


exports.findOne = (req, res) => {
    Product.findById(req.params.productCode).then(product => {

        if (!product) {
            return res.status(404).send({
                message: "product not found with product Id " + req.params._id
            });
        }
        res.send(product);

    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "product not found with _id " + req.params._id
            });
        }
        return res.status(500).send({
            message: "Error retrieving product with _id" + req.params._id
        });
    });
};



// This is to update product existing values by _id
exports.update = (req, res) => {

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "product cannot be empty for update"
        });
    }

    Product.findByIdAndUpdate(req.params._id, {
        productCode: req.body.productCode,
        productName: req.body.productName || "Untitled  product",
        productDesc: req.body.productDesc,
        productPrice:req.body.productPrice,
        productDiscount:req.body.productDiscount,
        productStockUnits:req.body.productStockUnits,
        productOffersId:req.body.productOffersId,
        productCustomerRating:req.body.productCustomerRating,
        isActive:true

    }, { new: true }).then(product => {

        if (!product) {
            return res.status(404).send({
                message: "product not found with _id " + req.params._id
            });
        }
        res.send(product)

    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "product not found with _id " + req.params._id
            });
        }
        return res.status(500).send({
            message: "Error updating product with _id " + req.params._id
        });
    });
};


exports.upsert = (req, res) => {

    if (req.fields.productCode == "" || req.fields.productName == "" || req.files.productImg.path =="")  {
        return res.status(400).send({
            message: "Either Product Code or Product Name or Product Image is blank."
        });
    }
    Product.findOneAndUpdate({ productCode: req.params.productCode }, {
        productCode: req.fields.productCode,
        productName: req.fields.productName || "Untitled  product",
        productDesc: req.fields.productDesc,
        productImg: fs.readFileSync(req.files.productImg.path),
        productPrice:req.fields.productPrice,
        productDiscount:req.fields.productDiscount,
        productStockUnits:req.fields.productStockUnits,
        productCategory:req.fields.productCategoryId,
        productSubCategory:req.fields.productSubCategoryId,
        productColor:req.fields.productColorId,
        productBrand:req.fields.productBrandId,
        isActive:true

    }, { upsert: true, new: true, runValidators: true }).then(product => {

        if (!product) {
            return res.status(500).send({
                message: "product could not be upserted"

            });
        }
        res.send(product)

    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(500).send({
                message: "Error upserting product with productCode " + req.params.productCode + err.message
            });
        }
        return res.status(500).send({
            message: "Error updating product with productCode " + req.params.productCode  + err.message
        });
    });
};

    // This is to delete product  existing values by _id
exports.delete = (req, res) => {

    if (Object.keys(req.params).length === 0) {
        return res.status(400).send({
            message: "_id cannot be blank"
        });
    }

    Product.findByIdAndRemove(req.params._id, (err) => {
        // As always, handle any potential errors:
        if (err) return res.status(500).send(err);
        // We'll create a simple object to send back with a message and the id of the document that was removed
        // You can really do this however you want, though.
        const response = {
            message: "Product deleted sucessfully",
        };
        return res.status(200).send(response);
   });
};



exports.find = (req, res) => {
    var query ={};
    if(req.body.hasOwnProperty('productName'))
    {
        query.productName = {"$in":req.body.productName}
    }
    if(req.body.hasOwnProperty('productCode'))
    {
        query.productCode = {"$in":req.body.productCode}
    }
    if(req.body.hasOwnProperty('productPrice'))
    {
        query.productPrice = {"$lte":req.body.productPrice}
    }
    if(req.body.hasOwnProperty('productDiscount'))
    {
        query.productDiscount = {"$gte":req.body.productDiscount}
    }
    if(req.body.hasOwnProperty('productCategory'))
    {
        query.productCategory = {"$in":req.body.productCategory}
    }
    if(req.body.hasOwnProperty('productSubCategory'))
    {
        query.productSubCategory = {"$in":req.body.productSubCategory}
    }
    if(req.body.hasOwnProperty('productBrand'))
    {
        query.productBrand = {"$in":req.body.productBrand}
    }
    if(req.body.hasOwnProperty('productColor'))
    {
        query.productColor = {"$in":req.body.productColor}
    }
    
    Product.find(query).populate('productCategory',  'productCategoryName').populate('productSubCategory','productSubCategoryName').populate('productBrand','productBrandImg').populate('productColor','productColorImg').then(products => {
        res.send(products);

    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving products based on the filter"
        });
    });
  
};


