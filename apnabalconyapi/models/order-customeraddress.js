const mongoose = require('mongoose');

const OrderCustomerAddressSchema = new mongoose.Schema(
    {
        order:{type: mongoose.Schema.Types.ObjectId,ref:'Order'},
        name:String,
        address: String,
        emailId:String,
        phoneNo:String,

    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model('OrderCustomerAddress', OrderCustomerAddressSchema);
