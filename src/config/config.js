import dotenv from 'dotenv'

dotenv.config();


export default {
    port: process.env.PORT,
    mongoURL: process.env.MONGO_URL,
    secretOrKey: process.env.JWT_SECRET,
    userEmail: process.env.USEREMAIL,
    passEmail: process.env.PASSEMAIL,
    persistence: process.env.PERSISTENCE
}