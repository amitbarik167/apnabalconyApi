const mongoose = require('mongoose');
const UserAuthorizationSchema = new mongoose.Schema
    ({
        _id:mongoose.Schema.Types.ObjectId,
        userId:String,
        authorizationToken:String
    },
        {
            timestamps: true
        }
    )

module.exports = mongoose.model('UserAuthorization', UserAuthorizationSchema)