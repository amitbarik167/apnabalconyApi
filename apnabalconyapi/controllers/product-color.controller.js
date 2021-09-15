const ProductColor =  require('../models/product-color.model.js');
const formidable = require('express-formidable');
const fs = require('fs'); 

exports.create = (req,res) => {
    if (req.fields.productColorCode == "" || req.fields.productColorName == "" || req.files.productColorImg.path =="") {
        return res.status(400).send({
            message: "product color content can not be empty"
        });
    }

    // Create a product color
    const productColor = new ProductColor({
        productCategoryCode: req.fields.productColorCode,
        productCategoryName: req.fields.productColorName || "Untitled product color",
        productCategoryDesc: req.fields.productColorDesc,
        productColorImg: req.fields.productColorImg,
        createdBy : req.fields.createdBy
    });

    // Save product Color in the database
    productColor.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Product Color."
            });
        });
};

    exports.upsert = (req, res) => {
    if (req.fields.productColorCode == "" || req.fields.productColorName == "" || req.files.productColorImg.path =="")  {
        return res.status(400).send({
            message: "Either Product Color Code or Product Color Name or Product Color Image is blank."
        });
    }
    ProductColor.findOneAndUpdate({ productColorCode: req.params.productColorCode }, {
        productColorCode: req.fields.productColorCode,
        productColorName: req.fields.productColorName || "untitled product Color",
        productColorDesc: req.fields.productColorDesc,
        productColorImg:fs.readFileSync(req.files.productColorImg.path),
        isActive:true,
        createdBy : req.fields.createdBy
    }, { upsert: true, new: true, runValidators: true }).then(productColor => {
        if (!productColor) {
            return res.status(500).send({
                message: "Product Color could not be upserted"

            });
        }
        res.send(productColor)
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(500).send({
                message: "Error updating product color with id " + req.params.productColorCode
            });
        }
        return res.status(500).send({
            message: "Error updating product color with id " + req.params.productColorCode
        });
    });
};

// This is to update product color existing values by _id
exports.update = (req, res) => {

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "product color cannot be empty for update"
        });
    }


    ProductColor.findByIdAndUpdate(req.params._id, {
        productColorCode: req.body.productColorCode,
        productColorName: req.body.productColorName || "untitled product color",
        productColorDesc: req.body.productColorDesc,
        modifiedBy : req.body.modifiedBy
       
    }, { new: true }).then(productColor => {

        if (!productColor) {
            return res.status(404).send({
                message: "Product Color not found with id " + req.params._id

            });
        }
        res.send(productColor)

    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product Color not found with id " + req.params._id
            });
        }
        return res.status(500).send({
            message: "Error updating product color with id " + req.params._id
        });
    });
};


exports.findAll = (req, res) => {
    ProductColor.find().then(productColors => {
        res.send(productColors);

    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving product colors."
        });
    });
};

exports.findOne = (req, res) => {
    ProductColor.findById(req.params.productColorCode).then(productColor => {

        if (!productColor) {
            return res.status(404).send({
                message: "product color not found with _id " + req.params._id
            });
        }
        res.send(productColor);

    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "product color not found with _id " + req.params._id
            });
        }
        return res.status(500).send({
            message: "Error retrieving product color with _id " + req.params._id
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

    ProductColor.findByIdAndRemove(req.params._id, (err) => {
        // As always, handle any potential errors:
        if (err) return res.status(500).send(err);
        // We'll create a simple object to send back with a message and the id of the document that was removed
        // You can really do this however you want, though.
        const response = {
            message: "Product Color deleted sucessfully",
        };
        return res.status(200).send(response);
});
};



