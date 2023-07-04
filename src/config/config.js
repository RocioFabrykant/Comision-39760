import dotenv from 'dotenv'

dotenv.config();


export default {
    //port:process.env.PORT,
    mongoURL: process.env.MONGO_URL,
    secretOrKey: process.env.JWT_SECRET
}