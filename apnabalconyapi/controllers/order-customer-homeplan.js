const OrderCustomerHomePlan= require('../models/order-customer-homeplan.js');
const formidable = require('express-formidable');
const fs = require('fs'); 
var ObjectId = require('mongodb').ObjectID;

const mongoose = require('mongoose');
const { match } = require('assert');

exports.upsert = (req, res) => {

    if (req.fields.orderId == "" )  {
        return res.status(400).send({
            message: "OrderId is blank."
        });
    }
    OrderCustomerHomePlan.findOneAndUpdate({ order: req.params.orderId, homePlanImgCounter: req.fields.homeplanImgCounter }, {
        homePlanImg:  fs.readFileSync(req.files.homePlanImg?.path),
        homePlanImgCounter:req.fields.homePlanImgCounter,
        order:req.fields.orderId
    
      
    }, { upsert: true, new: true, runValidators: true }).then(orderCustomerHomePlan => {

        if (!orderCustomerHomePlan) {
            return res.status(500).send({
                message: "order home plan image(s) could not be upserted"

            });
        }
        res.send(orderCustomerHomePlan)

    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(500).send({
                message: "Error upserting order home plan image(s) with orderId " + req.params.orderId + err.message
            });
        }
        return res.status(500).send({
            message: "Error updating home plan image(s) with orderId " + req.params.orderId  + err.message
        });
    });
};

exports.find = (req, res) => {
    OrderCustomerHomePlan.find({order:req.params.orderId}).then(orderCustomerHomePlan => {

        if (!orderCustomerHomePlan) {
            return res.status(404).send({
                message: "Order Customer Home plan images(s) not found with orderId " + req.params.orderId
            });
        }
        res.send(orderCustomerHomePlan);

    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Order Customer Home plan images(s) not found with orderId " + req.params.orderId
            });
        }
        return res.status(500).send({
            message: "Error retrieving Order Customer Home plan images with orderId" + req.params.orderId
        });
    });
}
