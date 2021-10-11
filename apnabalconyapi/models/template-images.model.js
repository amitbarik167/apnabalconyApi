const mongoose = require('mongoose');

const TemplateImagesSchema = new mongoose.Schema(
    {
        _id:mongoose.Schema.Types.ObjectId,
        templateImg: { data: Buffer, contentType: String },
        template:{type: mongoose.Schema.Types.ObjectId,ref:'Template'},
        templateImgCounter:Number,
        isActive:Boolean,
        createdBy:String,
        modifiedBy:String,
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model('TemplateImages', TemplateImagesSchema);
