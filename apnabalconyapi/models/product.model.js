const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        _id:mongoose.Schema.Types.ObjectId,
        productCode:String,
        productName:String,
        productDesc:String,
        productImg: { data: Buffer, contentType: String },
        productPrice:Number,
        productSize:String,
        productFor: String,
        productDiscount:Number,
        productOffersId:Number,
        productCustomerRating:Number,
        productOccasion:String,
        productFit:String,
        isActive:Boolean,
        createdBy:String,
        modifiedBy:String,
        productCategory:{type: mongoose.Schema.Types.ObjectId,ref:'ProductCategory'},
        productSubCategory:{type: mongoose.Schema.Types.ObjectId,ref:'ProductSubCategory'},
        productBrand:{type: mongoose.Schema.Types.ObjectId,ref:'ProductBrand'},
        productColor:{type: mongoose.Schema.Types.ObjectId,ref:'ProductColor'},
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model('Product', ProductSchema);
