const OrderItems =  require('../models/order-items.js');


exports.create = (req,res)=> {

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "order items content can not be empty"
        });
    }
    OrderItems.init()
      const orderItems = new OrderItems({
      order : req.body.orderId,
      product: req.body.productId,
      Qty: req.body.Qty
        })
  
      
    // Save order items in the database // ToDO later, check for bulk insert
    orderItems.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while inserting an order item."
            });
        });
     
  };
  

exports.findAll = (req, res) => {
    OrderItems.find().populate('order','orderId').populate('product','productName').then(orderItems => {
        res.send(orderItems);

    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving order items."
        });
    });
};
