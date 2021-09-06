const mongoose = require('mongoose');

const OrderItemsSchema = new mongoose.Schema(
    {
        order:{type: mongoose.Schema.Types.ObjectId,ref:'Order'},
        product:{type: mongoose.Schema.Types.ObjectId,ref:'Product'},
        qty:Number

    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model('OrderItems', OrderItemsSchema);
