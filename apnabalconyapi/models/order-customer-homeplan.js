const mongoose = require('mongoose');

const OrderCustomerHomePlanSchema = new mongoose.Schema(
    {
        order:{type: mongoose.Schema.Types.ObjectId,ref:'Order'},
        homePlanImg: { data: Buffer, contentType: String },
        homePlanImgCounter:Number,
        createdBy:String,
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model('OrderCustomerHomePlan', OrderCustomerHomePlanSchema);
