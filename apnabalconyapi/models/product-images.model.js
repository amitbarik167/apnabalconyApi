const mongoose = require('mongoose');

const ProductImagesSchema = new mongoose.Schema(
    {
        _id:mongoose.Schema.Types.ObjectId,
        productId:String,
        productImg: { data: Buffer, contentType: String },
        productImgCounter:Number,
        createdBy:String,
        modifiedBy:String,
        product:{type: mongoose.Schema.Types.ObjectId,ref:'Product'},
        productCategory:{type: mongoose.Schema.Types.ObjectId,ref:'ProductCategory'},
        productSubCategory:{type: mongoose.Schema.Types.ObjectId,ref:'ProductSubCategory'},
        productBrand:{type: mongoose.Schema.Types.ObjectId,ref:'ProductBrand'},
        productColor:{type: mongoose.Schema.Types.ObjectId,ref:'ProductColor'},
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model('ProductImages', ProductImagesSchema);
