import UserRepository from "../repositories/users.repository.js"; 
import { generateTokenReset,authTokenReset,createHash,isValidPassword } from '../utils.js';
import passport from 'passport'
import { sendEmail } from '../config/mailing.config.js';

const usersRepository = new UserRepository();
const createUser = async (user)=>{
    const result = await usersRepository.createUser(user);
    return result
}

const getUsers = async ()=>{
    const result = await usersRepository.getUsers();
    return result
}

const getUserByEmail = async (email)=>{
    const result = await usersRepository.getUserByEmail(email);
    return result;
}

const resetPassword = async(email)=>{
    //genero token de expiracion 1hora
    const accessToken = generateTokenReset(email)
    const emailtoSend =  {from: "E-commerce Fabrykant",
    to: email, 
    subject: "Reseteo de password", 
    html:await usersRepository.linkPassword(accessToken)};
    await sendEmail(emailtoSend);
    return accessToken
}

const newPassword = async (email,pass)=>{
    const user = await usersRepository.getUserByEmail(email);
    // const comparePassword = isValidPassword(user, pass);       
    // if(comparePassword) {
    //     return res.status(401).send({status:'error', error:'Same password'});
    // }  
    const hashedPassword = createHash(pass);
    await usersRepository.resetPassword(user,hashedPassword)
}


export{
    createUser,
    getUsers,
    getUserByEmail,
    resetPassword,
    newPassword
}