import express, {
    urlencoded
} from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import {
    Server
} from 'socket.io';
import viewsRouter from './routes/views.router.js'
import mongoose from 'mongoose';
import Messages from './dao/dbManagers/messages.js';
const messageManager = new Messages();
const app = express();

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');
app.use(express.static(`${__dirname}/public`))

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))


app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/realtimeproducts', viewsRouter);
app.use('/chat', viewsRouter);

try {
    await mongoose.connect('mongodb+srv://fabrykantr:m19w444GvyS34fvF@cluster39760rf.l5l8vvj.mongodb.net/ecommerce?retryWrites=true&w=majority')
} catch (error) {
    console.log(error);
}

const server = app.listen(8082, () => console.log('listening on port 8082'));

const io = new Server(server);

app.set('socketio', io);


io.on('connection', socket => {
    console.log('nuevo cliente conectado');
    socket.on('message', async data => {
        messageManager.save(data);

        io.emit('messageLogs', await messageManager.getAll()); //envio a todos los clientes el log de mesjes
    })
    socket.on('authenticated', async data => {
        socket.emit('messageLogs', await messageManager.getAll());
        socket.broadcast.emit('newUserConnected', data);
    })
})