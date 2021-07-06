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
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "user authorization not found with userId " + req.params.userId
                    });
                }
           });
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
            }).catch();
        });
    });
};



exports.findOne = (req, res) => {
    UserAuthorization.findById(req.params.userId).then(userAuthorization => {
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
