import UsersDto from '../dao/DTOs/users.dto.js'
import UsersDao from '../dao/dbManagers/users.js'
export default class UserRepository{
    constructor(){
        this.dao = new UsersDao();
    }
    getUsers = async ()=>{
        const result = await this.dao.getAll();
        return result;
    }
    createUser = async (user)=>{
        //const userToInsert = new UsersDto(user);
        const result = await this.dao.save(user);
        return result;
    }

    getUserByEmail = async (email)=>{
        
        const user = await this.dao.getByEmail(email);
        //const result = new UsersDto(user);
        //return result;
        return user;
    }
    linkPassword = async (token)=>{
        let html = `<a href="http://localhost:8081/api/users/reset-password/tkn/${token}">Link para reseteo</a>`;
        return html;
    }
    resetPassword = async (user,pass)=>{
        await this.dao.resetPass(user,pass);

    }
   
}