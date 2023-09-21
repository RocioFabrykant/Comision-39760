import userModel from '../models/users.js'

export default class Users {
    constructor() {
        console.log('Working users with db')
    }

    getAll = async () => {
        const users = await userModel.find();
        return users.map(user => user.toObject());
    }
    getByEmail = async (email) => {
        const user = await userModel.findOne({
            email
        }).lean();
        return user;
    }
    getUserById = async (id) => {
        const user = await userModel.findById(id).lean()
        return user;
    }
    save = async (user) => {
        const result = await userModel.create(user);
        return result;

    }
    resetPass = async (user, pass) => {
        await userModel.updateOne({
            email: user.email
        }, {
            $set: {
                password: pass
            },
            upsert: true
        })
    }
    updateConnection = async (user) => {
        await userModel.updateOne({
            email: user.email
        }, {
            $set: {
                lastConnection: new Date()
            },
            upsert: true
        })
    }

    deleteUsers = async () => {
        const dateActual = new Date();
        const comparison = dateActual.getMinutes() - 1;
        dateActual.setMinutes(comparison);
        const userstoDelete = await userModel.find({
            lastConnection: {
                $lte: dateActual
            }
        }).lean()
        await userModel.deleteMany({
            lastConnection: {
                $lte: dateActual
            }
        })
        return userstoDelete;
    }
    updateUserRol = async (rol, id) => {
        await userModel.updateOne({
            _id: id
        }, {
            $set: {
                role: rol
            },
            upsert: true
        })
    }
    deleteUser = async (id) => {
        const usertoDelete = await this.getUserById(id)
        await userModel.deleteOne({
            _id: id
        })
        return usertoDelete;
    }
}