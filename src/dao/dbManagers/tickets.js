import {
    ticketModel
} from '../models/tickets.js'

export default class Tickets {
    constructor() {
        console.log('Working tickets with db')
    }

    save = async (ticket) => {
        const result = await ticketModel.create(ticket);
        return result;

    }
    findById = async (id) => {
        const result = await ticketModel.findById(id);
        return result;
    }
}