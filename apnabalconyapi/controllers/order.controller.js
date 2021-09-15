const Order =  require('../models/order.js');


exports.create = (req,res)=> {

  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      return res.status(400).send({
          message: "order header content can not be empty"
      });
  }
  Order.init()
   const order = new Order({
    orderNo : parseInt(Date.now() * Math.random()),
    userId:req.body.userId,
    status:req.body.status,
    expectedTotalPrice:req.body.expectedTotalPrice,
    requirement:req.body.requirement,
      })

    
      
  

  // Save order in the database
  order.save()
      .then(data => {
          res.send(data);
      }).catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while inserting an order."
          });
      });
   
};


exports.findAll = (req, res) => {
    Order.find().then(orders => {
        res.send(orders);

    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving all orders."
        });
    });
};


exports.findOne = (req, res) => {
    Order.findOne({orderNo:req.params.orderNo}).then(order => {

        if (!order) {
            return res.status(404).send({
                message: "Order not found with OrderNo " + req.params.orderNo
            });
        }
        res.send(order);

    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Order not found with OrderNo " + req.params.orderNo
            });
        }
        return res.status(500).send({
            message: "Error retrieving Order with OrderNo " + req.params.orderNo
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

    Order.findByIdAndUpdate(req.params._id, {
        status:req.body.status,
        modifiedBy:req.body.modifiedBy
    }, { new: true }).then(order => {

        if (!order) {
            return res.status(404).send({
                message: "Order not found with _id " + req.params._id
            });
        }
        res.send(order)

    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Order not found with _id " + req.params._id
            });
        }
        return res.status(500).send({
            message: "Error updating Order with _id " + req.params._id
        });
    });
};

exports.findOrdersByUserId = (req, res) => {
    Order.find({userId:req.params.userId}).then(order => {

        if (!order) {
            return res.status(404).send({
                message: "Order not found with userId " + req.params.userId
            });
        }
        res.send(order);

    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Order not found with userId " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Error retrieving Order with userId " + req.params.userId
        });
    });
};


