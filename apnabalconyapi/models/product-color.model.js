const mongoose = require('mongoose');
const ProductColorSchema = new mongoose.Schema
(
    {
        id:mongoose.Schema.Types.ObjectId,
        productColorCode:String,
        productColorName:String,
        productColorDesc:String,
        productColorImg: { data: Buffer, contentType: String },
        createdBy:String,
        modifiedBy:String,
        isActive:Boolean
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model('ProductColor', ProductColorSchema);