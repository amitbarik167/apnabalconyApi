const Email =  require('../models/send-email.model.js');
const formidable = require('express-formidable');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var ObjectId = require('mongodb').ObjectID;

var transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'apnabalcony@gmail.com',
    pass: 'soumyak@89'
  }
}));

exports.create = (req,res)=> {

  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      return res.status(400).send({
          message: "email details/content can not be empty"
      });
  }
   Email.init()
   const email = new Email({
   
    fromEmail:req.body.fromEmail,
    toEmail:req.body.toEmail,
    subject:req.body.subject,
    text:req.body.text,
      })

      var mailOptions = {
        from: email.fromEmail,
        to: email.toEmail,
        subject: email.subject,
        text: email.text
      };
      
  

  // Save email in the database
  email.save()
      .then(data => {
          res.send(data);
      }).catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while inserting the email."
          });
      });
   //Send email
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
};

