
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
      qty: req.body.qty
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
  


exports.find = (req, res) => {
    OrderItems.find({order:req.params.orderId}).populate('product').then(items => {

        if (!items) {
            return res.status(404).send({
                message: "Order Items not found with OrderId " + req.params.orderId
            });
        }
        res.send(items);

    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Order Items not found with OrderId " + req.params.orderId
            });
        }
        return res.status(500).send({
            message: "Error retrieving order items  with OrderId" + req.params.orderId
        });
    });
};
