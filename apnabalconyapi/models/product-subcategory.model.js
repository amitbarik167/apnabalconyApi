const mongoose = require('mongoose');

const ProductSubCategorySchema = new mongoose.Schema(
    {
        _id:mongoose.Schema.Types.ObjectId,
        productSubCategoryCode:String,
        productSubCategoryName:String,
        productSubCategoryDesc:String,
        isActive:Boolean,
        createdBy:String,
        modifiedBy:String,
        productCategory:{type: mongoose.Schema.Types.ObjectId,ref:'ProductCategory'}
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model('ProductSubCategory', ProductSubCategorySchema);
