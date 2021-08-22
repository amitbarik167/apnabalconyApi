const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
    {
        orderId:String,
        userId:String,
        status:String
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model('Order', OrderSchema);
