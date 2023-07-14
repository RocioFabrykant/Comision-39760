import UserRepository from "../repositories/users.repository.js";

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


export{
    createUser,
    getUsers,
    getUserByEmail
}