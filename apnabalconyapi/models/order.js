const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
    {
        orderNo:String,
        userId:String,
        status:String,
        expectedTotalPrice:Number,
        requirement:String,
        modifiedBy:String

    },
    {
        timestamps:true
    }
)



module.exports = mongoose.model('Order', OrderSchema);
