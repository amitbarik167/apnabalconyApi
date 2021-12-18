const mongoose = require('mongoose');

const TemplateSchema = new mongoose.Schema(
    {
        _id:mongoose.Schema.Types.ObjectId,
        templateCode:String,
        templateName:String,
        templateDesc:String,
        templatePrice:Number,
        templateImg: { data: Buffer, contentType: String },
        balconySize:String,
        isEmpty:Boolean,
        isActive:Boolean,
        createdBy:String,
        modifiedBy:String,
       
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model('Template', TemplateSchema);
