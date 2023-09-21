import {
    getUsers as getUsersService,
    getUserByEmail as getUserService,
    createUser as saveUserService,
    resetPassword as resetPasswordService,
    newPassword as newPasswordService,
    deleteUsers as deleteUsersService,
    deleteUser as deleteUserService,
    updateUserRol as updateUserRolService,
    getUserbyId as getUserbyIdService
} from '../services/users.service.js'

const getUsers = async (req, res) => {
    try {

        const userResult = await getUsersService();

        res.status(200).send({
            status: 'success',
            payload: userResult
        });


    } catch (error) {
        res.status(500).send({
            status: 'error',
            error
        });
    }
}

const getUser = async (req, res) => {

    try {
        const email = req.params.email;
        const elUser = await getUserService(email);
        if (!elUser) {

            return res.status(404).send({
                status: 'error',
                message: 'user not found'
            })
        }
        res.status(200).send({
            status: 'success',
            payload: elUser
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            error
        });
    }
}

const saveUser = async (req, res) => {
    const user = req.body;


    if (!user.first_name || !user.last_name || !user.email || !user.age || !user.password) {
        return res.status(400).send({
            status: 'error',
            error: 'incomplete values'
        });
    }
    try {
        const rdo = await saveUserService(user);

        res.status(200).send({
            status: 'success',
            add: user,
            payload: rdo
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            error
        });
    }


}

const resetPassword = async (req, res) => {
    const email = req.body.email;

    if (!email) {
        return res.status(400).send({
            status: 'error',
            error: 'incomplete value'
        });
    }
    const elUser = await getUserService(email);
    if (!elUser) {

        return res.status(404).send({
            status: 'error',
            message: 'user not found'
        })
    }

    try {
        const rdo = await resetPasswordService(email);
        res.status(200).send({
            status: 'success',
            add: email,
            payload: rdo
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            error
        });
    }


}

const newPassword = async (req, res) => {
    const email = req.user.email;

    const password = req.body.password;

    if (!password) {
        return res.status(400).send({
            status: 'error',
            error: 'incomplete value'
        });
    }

    try {
        const rdo = await newPasswordService(email, password);
        res.status(200).send({
            status: 'success',
            add: email,
            payload: rdo
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            error
        });
    }
}

const deleteUsers = async (req, res) => {
    try {
        await deleteUsersService();
        res.status(200).send({
            status: 'success'
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            error
        });
    }
}

const deleteUser = async (req, res) => {
    const id = req.params.id
    try {
        const user = await deleteUserService(id);
        res.status(200).send({
            status: 'success',
            payload: user
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            error
        });
    }
}

const updateUserRol = async (req, res) => {
    const rol = req.params.rol
    const userId = req.params.id
    const user = await getUserbyIdService(userId);
    if (user.role === rol) {
        return res.status(201).send({
            status: 'success',
            message: 'no user role update'
        });
    }
    try {

        await updateUserRolService(rol, userId);

        res.status(200).send({
            status: 'success',
            message: 'user updated'
        });



    } catch (error) {
        res.status(500).send({
            status: 'error',
            error
        });
    }
}



export {
    getUsers,
    getUser,
    saveUser,
    resetPassword,
    newPassword,
    deleteUsers,
    deleteUser,
    updateUserRol
}