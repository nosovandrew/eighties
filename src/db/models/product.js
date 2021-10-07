import mongoose from 'mongoose';

// Validation funcs
const atLeastOneSku = (value) => value.length > 0;

// Schemas
const SkusSchema = new mongoose.Schema({
    sku: {
        type: String,
        trim: true,
        required: true,
        index: true,
        unique: true,
    },
    qtyInStock: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    options: {
        size: {
            type: String,
            enum: ['ONESIZE', 'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'],
            required: true,
            default: 'ONESIZE',
        },
    },
});

const ProductsSchema = new mongoose.Schema(
    {
        item: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            base: {
                type: Number,
                required: true,
            },
            currency: {
                type: String,
                enum: ['RUB', 'USD'],
                required: true,
                default: 'RUB',
            },
        },
        drop: {
            type: Number,
            required: true,
        },
        features: {
            type: [
                {
                    type: String,
                    trim: true,
                },
            ],
        },
        skus: {
            type: [SkusSchema],
            validate: [atLeastOneSku, 'At least one SKU required.'],
        },
        slug: {
            type: String,
            required: true,
            trim: true,
            index: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports =
    mongoose.models.Product || mongoose.model('Product', ProductsSchema);
