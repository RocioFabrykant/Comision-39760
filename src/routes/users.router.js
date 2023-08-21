import {
    Router
} from 'express';


import {saveUser,
    getUser,
    getUsers,
    resetPassword,
    newPassword} from '../controllers/users.controller.js'

const router = Router();

router.post('/', saveUser)

router.get('/:email', getUser)

router.get('/', getUsers)
router.post('/password-link',resetPassword)
router.post('/reset-password/tkn/:token',newPassword)


export default router;