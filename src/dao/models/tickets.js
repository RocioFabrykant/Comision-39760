import mongoose from 'mongoose';
const ticketCollection = 'tickets';

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    purchase_datetime: {
        type: Date,
        default:Date.now,
        required: true
    },
    code: {
        type: String,
        unique:true,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type:String,
        required:true

        //correo del usuario asociado al carrito
    }
})
export const ticketModel = mongoose.model(ticketCollection, ticketSchema);