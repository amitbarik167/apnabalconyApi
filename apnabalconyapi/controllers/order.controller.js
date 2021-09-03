const Order =  require('../models/order.js');


exports.create = (req,res)=> {

  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      return res.status(400).send({
          message: "order header content can not be empty"
      });
  }
  Order.init()
   const order = new Order({
    orderId : parseInt(Date.now() * Math.random()),
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

