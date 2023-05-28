import mongoose from 'mongoose'

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({

    products: {
        type: [{
        quantity: {
            type: Number,
            default: 1
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products'
            
        }}],
        
        default: []
    }
})
cartSchema.pre('findOne', function(){
    this.populate('products.product').lean()
})

export const cartModel = mongoose.model(cartCollection, cartSchema);