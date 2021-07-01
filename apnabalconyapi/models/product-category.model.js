const mongoose = require('mongoose');
const ProductCategorySchema = new mongoose.Schema
    ({
        _id:mongoose.Schema.Types.ObjectId,
        productCategoryCode: String,
        productCategoryName: String,
        productCategoryDesc: String,
        createdBy:String,
        modifiedBy:String,
        isActive: Boolean
    },
        {
            timestamps: true
        }
    )

module.exports = mongoose.model('ProductCategory', ProductCategorySchema)