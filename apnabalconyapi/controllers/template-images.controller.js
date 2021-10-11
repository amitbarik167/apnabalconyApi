const TemplateImages= require('../models/template-images.model.js');
const formidable = require('express-formidable');
const fs = require('fs'); 
var ObjectId = require('mongodb').ObjectID;

const mongoose = require('mongoose');
const { match } = require('assert');

exports.upsert = (req, res) => {

    if (req.fields.templateId == "" )  {
        return res.status(400).send({
            message: "TemplateId is blank."
        });
    }
    TemplateImages.findOneAndUpdate({ template: req.params.templateId, templateImgCounter: req.fields.templateImgCounter }, {
        templateImg:  fs.readFileSync(req.files.templateImg?.path),
        template: req.fields.templateId,
        templateImgCounter:req.fields.templateImgCounter,
        createdBy:req.fields.createdBy,
        isActive:true
      

    }, { upsert: true, new: true, runValidators: true }).then(templateImages => {

        if (!templateImages) {
            return res.status(500).send({
                message: "template images could not be upserted"

            });
        }
        res.send(templateImages)

    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(500).send({
                message: "Error upserting template images with templateId " + req.params.templateId + err.message
            });
        }
        return res.status(500).send({
            message: "Error updating template image with templateId " + req.params.templateId  + err.message
        });
    });
};

exports.find = (req, res) => {
    TemplateImages.find({template:req.params.templateId}).then(templateImages => {

        if (!templateImages) {
            return res.status(404).send({
                message: "template images(s) not found with template Id " + req.params.templateId
            });
        }
        res.send(templateImages);

    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "product images(s) not found with templateId " + req.params.templateId
            });
        }
        return res.status(500).send({
            message: "Error retrieving images with templateId" + req.params.templateId
        });
    });
};

    // This is to delete template images existing values by templateId
    exports.delete = (req, res) => {

        if (Object.keys(req.params).length === 0) {
            return res.status(400).send({
                message: "templateId cannot be blank"
            });
        }
    
        TemplateImages.deleteMany({template:req.params.templateId }, (err) => {
            // As always, handle any potential errors:
            if (err) return res.status(500).send(err);
            // We'll create a simple object to send back with a message and the id of the document that was removed
            // You can really do this however you want, though.
            const response = {
                message: "Template Images deleted sucessfully",
            };
            return res.status(200).send(response);
       });
    };


    exports.findAll = (req, res) => {
        TemplateImages.find().then(templateImages => {
            res.send(templateImages);
    
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving all templates"
            });
        });
    };