const ProductImages= require('../models/product-images.model.js');
const formidable = require('express-formidable');
const fs = require('fs'); 
var ObjectId = require('mongodb').ObjectID;

const mongoose = require('mongoose');
const { match } = require('assert');

exports.upsert = (req, res) => {

    if (req.fields.productId == "" || req.fields.productCategoryId == "" || req.fields.productSubCategoryId ==""|| req.fields.productBrandId == "" || req.fields.productColorId =="")  {
        return res.status(400).send({
            message: "Either Product  or Product Catgory or Product Subcategory or ProductBrand or Product Color is blank."
        });
    }
    ProductImages.findOneAndUpdate({ productId: req.params.productId, productImgCounter: req.fields.productImgCounter }, {
        productImg:  fs.readFileSync(req.files.productImg?.path),
        productId: req.fields.productId,
        productImgCounter:req.fields.productImgCounter,
        product:req.fields.productId,
        productCategory:req.fields.productCategoryId,
        productSubCategory:req.fields.productSubCategoryId,
        productColor:req.fields.productColorId,
        productBrand:req.fields.productBrandId,
        isActive:true
      

    }, { upsert: true, new: true, runValidators: true }).then(productImages => {

        if (!productImages) {
            return res.status(500).send({
                message: "product images could not be upserted"

            });
        }
        res.send(productImages)

    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(500).send({
                message: "Error upserting product images with productId " + req.params.productId + err.message
            });
        }
        return res.status(500).send({
            message: "Error updating product image with productId " + req.params.productId  + err.message
        });
    });
};

exports.find = (req, res) => {
    ProductImages.find({productId:req.params.productId}).then(productImages => {

        if (!productImages) {
            return res.status(404).send({
                message: "product images(s) not found with product Id " + req.params.productId
            });
        }
        res.send(productImages);

    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "product images(s) not found with productId " + req.params.productId
            });
        }
        return res.status(500).send({
            message: "Error retrieving images with productId" + req.params.productId
        });
    });
}

    // This is to delete product images existing values by productId
    exports.delete = (req, res) => {

        if (Object.keys(req.params).length === 0) {
            return res.status(400).send({
                message: "productId cannot be blank"
            });
        }
    
        ProductImages.findByIdAndRemove({_id:req.params._id }, (err) => {
            // As always, handle any potential errors:
            if (err) return res.status(500).send(err);
            // We'll create a simple object to send back with a message and the id of the document that was removed
            // You can really do this however you want, though.
            const response = {
                message: "Product Images deleted sucessfully",
            };
            return res.status(200).send(response);
       });
    };