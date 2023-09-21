import mongoose from 'mongoose';
import config from '../config/config.js'

export let Carts;
export let Messages;
export let Users;
export let Products;
export let Tickets

const persistence = config.persistence;

switch(persistence){
    case 'MONGO':
        const mongoose = await import ('mongoose')
        await mongoose.connect(config.mongoURL);
        const {default:UsersMongo}= await import('./dbManagers/users.js');
        Users =new UsersMongo();
        const {default:CartsMongo}= await import('./dbManagers/carts.js');
        Carts = new CartsMongo();
        const {default:MessagesMongo}= await import('./dbManagers/messages.js');
        Messages = new MessagesMongo();
        const {default:ProductsMongo}= await import('./dbManagers/products.js');
        Products = new ProductsMongo()
        const {default:TicketsMongo}= await import('./dbManagers/tickets.js');
        Tickets = new TicketsMongo();



        break;

    case 'FILE':
        const {default:CartsFile}= await import('./fileManagers/CartManager.js');
        Carts = CartsFile;
        const {default:ProductsFile}= await import('./fileManagers/productmanager.js');
        Products = ProductsFile;
        break;
}