const Template =  require('../models/template.model.js');
const formidable = require('express-formidable');
const fs = require('fs'); 
var ObjectId = require('mongodb').ObjectID;

exports.upsert = (req,res)=> {

    if (req.fields.templateCode == "" || req.fields.templateName == "" || req.files.templateImg.path =="")  {
        return res.status(400).send({
            message: "Either Template Code or Template Name or Template Image is blank."
        });
    }
   
     
  // Save template in the database
  Template.findOneAndUpdate({templateCode:req.params.templateCode},{
    templateCode : req.fields.templateCode,
    templateName:req.fields.templateName,
    templateDesc:req.fields.templateDesc,
    templatePrice:req.fields.templatePrice,
    templateImg: fs.readFileSync(req.files.templateImg?.path),
    balconySize:req.fields.balconySize,
    createdBy: req.fields.createdBy
      },{ upsert: true, new: true, runValidators: true })
      .then(data => {
          res.send(data);
      }).catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while inserting a template."
          });
      });
   
};


exports.findAll = (req, res) => {
    Template.find().then(templates => {
        res.send(templates);

    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving all templates"
        });
    });
};




// This is to update template existing values by _id
exports.update = (req, res) => {

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "template cannot be empty for update"
        });
    }

    Template.findByIdAndUpdate(req.params._id, {
        templateName:req.body.templateName,
        templateDesc:req.body.templateDesc,
        templatePrice:req.body.templatePrice,
        balconySize:req.body.balconySize,
        modifiedBy:req.body.modifiedBy
    }, { new: true }).then(template => {

        if (!template) {
            return res.status(404).send({
                message: "Template not found with _id " + req.params._id
            });
        }
        res.send(template)

    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Template not found with _id " + req.params._id
            });
        }
        return res.status(500).send({
            message: "Error updating Template with _id " + req.params._id
        });
    });
};

 // This is to delete template  existing values by templateId
 exports.delete = (req, res) => {

    if (Object.keys(req.params).length === 0) {
        return res.status(400).send({
            message: "_id cannot be blank"
        });
    }

    Template.findByIdAndRemove(req.params._id , (err) => {
        // As always, handle any potential errors:
        if (err) return res.status(500).send(err);
        // We'll create a simple object to send back with a message and the id of the document that was removed
        // You can really do this however you want, though.
        const response = {
            message: "Template deleted sucessfully",
        };
        return res.status(200).send(response);
   });
};


exports.find = (req, res) => {
    var query ={};

    if(req.body.hasOwnProperty('_id'))
    {
        query._id = {"$in":req.body._id}
    }
    if(req.body.hasOwnProperty('templateName'))
    {
        query.templateName = {"$in":req.body.templateName}
    }
    if(req.body.hasOwnProperty('templateCode'))
    {
        query.templateCode = {"$in":req.body.templateCode}
    }
    if(req.body.hasOwnProperty('templatePrice'))
    {
        query.templatePrice = {"$lte":req.body.templatePrice}
    }

    if(req.body.hasOwnProperty('balconySize'))
    {
        query.balconySize = {"$in":req.body.balconySize}
    }
    
    Template.find(query).populate().then(templates => {
        res.send(templates);

    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving templates based on the filter"
        });
    });
  
};




