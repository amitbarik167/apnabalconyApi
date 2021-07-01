const mongoose = require('mongoose');

const ProductBrandSchema = new mongoose.Schema(
    {
        _id:mongoose.Schema.Types.ObjectId,
        productBrandCode:String,
        productBrandName:String,
        productBrandDesc:String,
        productBrandImg: { data: Buffer, contentType: String },
        isActive:Boolean,
        createdBy:String,
        modifiedBy:String,
        productCategory:{type: mongoose.Schema.Types.ObjectId,ref:'ProductCategory'},
        productSubCategory:{type: mongoose.Schema.Types.ObjectId,ref:'ProductSubCategory'}
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model('ProductBrand', ProductBrandSchema);
