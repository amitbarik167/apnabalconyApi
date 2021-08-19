const mongoose = require('mongoose');

const EmailSchema = new mongoose.Schema(
    {
        fromEmail:String,
        toEmail:String,
        subject:String,
        text:String,
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model('Email', EmailSchema);
