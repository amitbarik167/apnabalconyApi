const mongoose = require('mongoose');
const UserAuthorizationSchema = new mongoose.Schema
    ({
        _id:mongoose.Schema.Types.ObjectId,
        userId:String,
        authorizationToken:String,
        isAdmin:{type:Boolean, default:false},
        modifiedBy:String
    },
        {
            timestamps: true
        }
    )

module.exports = mongoose.model('UserAuthorization', UserAuthorizationSchema)