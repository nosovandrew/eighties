import mongoose from 'mongoose';

// Validation funcs
const atLeastOneItem = (value) => value.length > 0;

// Schemas
const ItemsSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    sku: {
        type: String,
        trim: true,
        required: true,
    },
    item: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    qtyForSale: {
        type: Number,
        required: true,
        min: 0,
    },
});

const OrderSchema = new mongoose.Schema({
    shippingAddress: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
    },
    items: {
        type: [ItemsSchema],
        validate: [atLeastOneItem, 'At least one item in cart required.'],
    },
    total: {
        type: Number,
        required: true,
        min: 0
    },
    currency: {
        type: String,
        enum: ['RUB', 'USD'],
        required: true,
        default: 'RUB',
    },
},
{
    timestamps: true,
});

module.exports =
    mongoose.models.Order || mongoose.model('Order', OrderSchema);