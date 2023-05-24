import mongoose from 'mongoose'

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({

    products: {
        quantity: {
            type: Number,
            default: 1
        },
        id: {
            ref: 'products',
            type: mongoose.Schema.Types.ObjectId
        },
        type: Array,
        default: []
    }
})

export const cartModel = mongoose.model(cartCollection, cartSchema);