import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import {Server} from 'socket.io';
import viewsRouter from './routes/views.router.js'

const app = express();

app.engine('handlebars',handlebars.engine());
app.set('views',`${__dirname}/views`);
app.set('view engine','handlebars');
app.use(express.static(`${__dirname}/public`))

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))


app.use('/',viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/realtimeproducts', viewsRouter)


const server = app.listen(8082, () => console.log('listening on port 8082'));

const io = new Server(server);

app.set('socketio', io);

