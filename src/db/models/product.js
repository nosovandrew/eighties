import mongoose from 'mongoose';

const ProductsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
});

module.exports =
    mongoose.models.Product || mongoose.model('Product', ProductsSchema);
