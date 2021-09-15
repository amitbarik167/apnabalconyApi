const OrderCustomerAddress =  require('../models/order-customeraddress.js');


exports.create = (req,res)=> {

  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      return res.status(400).send({
          message: "order header content can not be empty"
      });
  }
  OrderCustomerAddress.init()
   const orderCustomerAddress = new OrderCustomerAddress({
    order:req.body.orderId,
    name:req.body.name,
    address:req.body.address,
    emailId: req.body.emailId,
    phoneNo: req.body.phoneNo
})


  // Save order customer address in the database
  orderCustomerAddress.save()
      .then(data => {
          res.send(data);
      }).catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while inserting an order address"
          });
      });
   
};

exports.find = (req, res) => {
    OrderCustomerAddress.find({order:req.params.orderId}).then(items => {

        if (!items) {
            return res.status(404).send({
                message: "Customer details not found with OrderId " + req.params.orderId
            });
        }
        res.send(items);

    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Customer details not found with OrderId " + req.params.orderId
            });
        }
        return res.status(500).send({
            message: "Error retrieving customer details  with OrderId" + req.params.orderId
        });
    });
};

