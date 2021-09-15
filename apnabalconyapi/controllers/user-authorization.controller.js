const jwt = require('jsonwebtoken');
const UserAuthorization = require('../models/user-authorization.model.js');

let token;
exports.upsert = (req,res)=>{
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "user authorization content can not be empty"
        });
    }

    UserAuthorization.findOneAndUpdate({userId: req.params.userId},{
        userId:req.body.userId,
        authorizationToken:req.body.authorizationToken
      

    }, { upsert: true, new: true, runValidators: true }).then(userAuthorization => {

        if (!userAuthorization) {
            return res.status(500).send({
                message: "user authorization could not be upserted"
            })
         }

        else
        {
          let payload = {emailid:userAuthorization.userId}
          token = jwt.sign(payload, userAuthorization.authorizationToken)

        }
        
        res.send({token}).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(500).send({
                    message: "Error updating user authorization with userId " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Error updating user authorization with userId " + req.params.userId
            })
        });
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user authorization not found with userId " + req.params.userId
            });
        }
   });;
};



exports.findOne = (req, res) => {
    UserAuthorization.findOne({userId:req.params.userId},{userId:1,isAdmin:1,createdAt:1,updatedAt:1, modifiedBy:1}).then(userAuthorization => {
        if (!userAuthorization) {
            return res.status(404).send({
                message: "user authorization not found with userId " + req.params.userId
            });
        }
        res.send(userAuthorization);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user authorization not found with userId " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Error retrieving product category with userId " + req.params.userId
        });
    }).catch();
};


exports.findAll = (req, res) => {
    UserAuthorization.find({},{userId:1,isAdmin:1,createdAt:1,updatedAt:1, modifiedBy:1}).then(userAuthorizations => {
        res.send(userAuthorizations);

    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving all user authorizations"
        });
    });
};

// This is to update user authorization existing values by _id
exports.update = (req, res) => {

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "user auth cannot be empty for update"
        });
    }

    UserAuthorization.findByIdAndUpdate(req.params._id, {
        isAdmin:req.body.isAdmin,
        modifiedBy:req.body.modifiedBy
    }, { new: true }).then(userAuthorization => {

        if (!userAuthorization) {
            return res.status(404).send({
                message: "userAuthorization not found with _id " + req.params._id
            });
        }
        res.send(userAuthorization)

    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "userAuthorization not found with _id " + req.params._id
            });
        }
        return res.status(500).send({
            message: "Error updating userAuthorization with _id " + req.params._id
        });
    });
};
