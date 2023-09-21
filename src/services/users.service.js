import UserRepository from "../repositories/users.repository.js";
import {
    generateTokenReset,
    authTokenReset,
    createHash,
    isValidPassword
} from '../utils.js';

import {
    sendEmail
} from '../config/mailing.config.js';

const usersRepository = new UserRepository();
const createUser = async (user) => {
    const result = await usersRepository.createUser(user);
    return result
}

const getUsers = async () => {
    const result = await usersRepository.getUsers();
    return result
}

const getUserByEmail = async (email) => {
    const result = await usersRepository.getUserByEmail(email);
    return result;
}

const resetPassword = async (email) => {

    const user = await usersRepository.getUserByEmail(email);
    const accessToken = generateTokenReset(user)
    const emailtoSend = {
        from: "E-commerce Fabrykant",
        to: email,
        subject: "Reseteo de password",
        html: await usersRepository.linkPassword(accessToken)
    };
    await sendEmail(emailtoSend);
    return accessToken

}

const newPassword = async (email, pass) => {
    const user = await usersRepository.getUserByEmail(email);
    const comparePassword = isValidPassword(user, pass);
    if (comparePassword) {
        throw new Error(`La nueva contraseña no puede ser igual a la actual`);
    }
    const hashedPassword = createHash(pass);
    await usersRepository.resetPassword(user, hashedPassword)

}

const deleteUsers = async () => {
    const users = await usersRepository.deleteUsers();
    for (let i = 0; i < users.length; i++) {
        const emailtoSend = {
            from: "E-commerce Fabrykant",
            to: users[i].email,
            subject: "Cuenta eliminada",
            html: `La cuenta asociada a ${users[i].email} ha sido eliminada`
        };
        await sendEmail(emailtoSend);
    }
}

const deleteUser = async (id) => {
    const user = await usersRepository.deleteUser(id);
    const emailtoSend = {
        from: "E-commerce Fabrykant",
        to: user.email,
        subject: "Cuenta eliminada",
        html: `La cuenta asociada a ${user.email} ha sido eliminada`
    };
    await sendEmail(emailtoSend);
    return user
}

const updateUserRol = async (rol, id) => {
    await usersRepository.updateUserRol(rol, id);
}
const getUserbyId = async (id) => {
    const user = await usersRepository.getUserbyId(id);
    return user;
}
const updateConnection = async(user)=>{
    await usersRepository.updateConnection(user);
}

export {
    createUser,
    getUsers,
    getUserByEmail,
    resetPassword,
    newPassword,
    deleteUsers,
    deleteUser,
    updateUserRol,
    getUserbyId,
    updateConnection
}