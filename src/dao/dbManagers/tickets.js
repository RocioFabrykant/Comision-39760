import ticketModel from '../models/tickets.js'

export default class Tickets {
    constructor (){
        console.log('Working tickets with db')
    }

    save = async () =>{
        const result = await ticketModel.create();
        return result;
        
    }
}