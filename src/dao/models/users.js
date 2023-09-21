import mongoose from 'mongoose';

const userCollection = 'users';

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    role: {
        type: String,
        default: 'user'
    },
    password: String,
    lastConnection: {
        type: Date,
        default: Date.now
    }
});

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;