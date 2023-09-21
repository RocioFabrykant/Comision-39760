import {
    generateToken,
    isValidPassword,
    createHash
} from '../utils.js';
import {
    getUserByEmail as getUserService,
    createUser as saveUserService,
    updateConnection as updateConnectionService
} from '../services/users.service.js'

const registerUser = async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            email,
            age,
            role,
            password
        } = req.body;
        if (!first_name || !last_name || !role || !email || !password)
            return res.status(400).send('incomplete values');
        const exists = await getUserService(email);
        if (exists) return res.status(401).send({
            status: 'error',
            error: 'usuario ya existe'
        })
        const hashedPassword = createHash(password);
        const user = {
            ...req.body
        }

        user.password = hashedPassword;
        const result = await saveUserService(user);
        const accessToken = generateToken(user)
        return res.status(200).send({
            status: 'success',
            access_token: accessToken,
            user: result
        });
    } catch (error) {
        return res.status(500).send({
            status: 'error',
            error: error
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;
        const user = await getUserService(email);
        if (!user) return res.status(401).send({
            status: 'error',
            error: 'Invalid Credentials'
        });
        const comparePassword = isValidPassword(user, password);
        if (!comparePassword) {
            return res.status(401).send({
                status: 'error',
                error: 'Invalid Credentials'
            });
        }

        await updateConnectionService(user)
        const accessToken = generateToken(user)

        res.cookie('coderCookieToken', accessToken, {
            maxAge: 60 * 60 * 1000
        }).send({
            status: 'success'
        })


    } catch (error) {
        return res.status(500).send({
            status: 'error',
            error: error
        })
    }

}

const currentRoute = async (req, res) => {
    try {
        const user = await getUserService(req.user.email);
        res.send({
            status: 'success',
            payload: user
        })
    } catch (error) {
        return res.status(500).send({
            status: 'error',
            error: error
        })
    }

}

const currentCustomRoute = async (req, res) => {
    res.send({
        status: 'success',
        payload: req.user
    })
}
export {
    registerUser,
    loginUser,
    currentRoute,
    currentCustomRoute
}