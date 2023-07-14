import {
    Router
} from 'express';


import {saveUser,
    getUser,
    getUsers} from '../controllers/users.controller.js'

const router = Router();

router.post('/', saveUser)

router.get('/:email', getUser)

router.get('/', getUsers)



export default router;