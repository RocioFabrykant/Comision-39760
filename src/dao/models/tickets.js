import mongoose from 'mongoose';
const ticketCollection = 'tickets';

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    purchase_datetime: {
        type: Date,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'

        //correo del usuario asociado al carrito
    }
})
export const ticketModel = mongoose.model(ticketCollection, ticketSchema);