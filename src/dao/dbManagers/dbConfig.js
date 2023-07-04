import config from '../../config/config.js'
import mongoose from 'mongoose'


const URI = config.mongoURL;
try{
    await mongoose.connect(URI);
    console.log('conectado a BD');
}catch(error){
    console.log(error);
}