import express, {
    urlencoded
} from 'express';
import './dao/dbManagers/dbConfig.js'
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import {
    Server
} from 'socket.io';
import viewsRouter from './routes/views.router.js'
import authRouter from './routes/auth.router.js'

import cookieParser from 'cookie-parser';
import initializePassport from './config/passport.config.js'
import mongoose from 'mongoose';
import Messages from './dao/dbManagers/messages.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import sessionsRouter from './routes/sessions.router.js'
import usersRouter from './routes/users.router.js'
import passport from 'passport';
import { addLogger } from './utils/loggers.js';
import errorHandler from './middlewares/errors/index.js'

const messageManager = new Messages();

const app = express();
// try {
//     await mongoose.connect('mongodb+srv://fabrykantr:m19w444GvyS34fvF@cluster39760rf.l5l8vvj.mongodb.net/ecommerce?retryWrites=true&w=majority')
// } catch (error) {
//     console.log(error);
// }
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');
app.use(express.static(`${__dirname}/public`))


app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

// app.use(session({
//     store: MongoStore.create({
//         client: mongoose.connection.getClient(),
//         ttl: 3600
//     }),
//     secret: config.secretOrKey,
//     resave: true,
//     saveUninitialized: true
// }))
app.use(addLogger);
app.use(cookieParser());
initializePassport();
app.use(passport.initialize());

// //app.use(passport.session());
app.use('/api/auth', authRouter);

app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/realtimeproducts', viewsRouter);
app.use('/chat', viewsRouter);
app.use('/products', viewsRouter)
app.use('/carts/:cid', viewsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/users',usersRouter)

app.get('/loggerTest',(req,res)=>{

    req.logger.fatal('Prueba fatal');
    req.logger.error('prueba error');
    req.logger.warning('prueba warning');
    req.logger.info('prueba info');
    req.logger.http('prueba http');
    req.logger.debug('prueba debug');

})


app.use(errorHandler);

const server = app.listen(8081, () => console.log('listening on port 8081'));

const io = new Server(server);

app.set('socketio', io);


io.on('connection', socket => {
    console.log('nuevo cliente conectado');
    socket.on('message', async data => {
        messageManager.save(data);

        io.emit('messageLogs', await messageManager.getAll());
    })
    socket.on('authenticated', async data => {
        socket.emit('messageLogs', await messageManager.getAll());
        socket.broadcast.emit('newUserConnected', data);
    })
})