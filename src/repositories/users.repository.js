import UsersDto from '../dao/DTOs/users.dto.js'
import UsersDao from '../dao/dbManagers/users.js'
export default class UserRepository {
    constructor() {
        this.dao = new UsersDao();
    }
    getUsers = async () => {
        const newarrayUsers = [];
        const result = await this.dao.getAll();
        for (let i = 0; i < result.length; i++) {
            const dataDto = new UsersDto(result[i]);
            newarrayUsers.push(dataDto);
        }

        return newarrayUsers;
    }
    createUser = async (user) => {
        const result = await this.dao.save(user);
        return result;
    }

    getUserByEmail = async (email) => {

        const user = await this.dao.getByEmail(email);
        return user;
    }
    linkPassword = async (token) => {
        let html = `<a href="http://localhost:8081/api/users/reset-password/${token}">Link para reseteo</a>`;
        return html;
    }
    resetPassword = async (user, pass) => {
        await this.dao.resetPass(user, pass);

    }
    deleteUsers = async () => {
        const users = await this.dao.deleteUsers();
        return users;

    }
    deleteUser = async (id) => {
        const user = await this.dao.deleteUser(id);
        return user;
    }
    updateConnection = async (user) => {
        await this.dao.updateConnection(user);
    }
    getUserbyId = async (id) => {
        const user = await this.dao.getUserById(id);
        return user
    }

    updateUserRol = async (rol, id) => {
        await this.dao.updateUserRol(rol, id);
    }


}