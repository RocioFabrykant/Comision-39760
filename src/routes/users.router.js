import {
    Router
} from 'express';

import passport from 'passport';
import {
    saveUser,
    getUser,
    getUsers,
    resetPassword,
    newPassword,
    deleteUsers,
    deleteUser,
    updateUserRol
} from '../controllers/users.controller.js'

import {
    passportCall,
    authorization
} from '../utils.js'

const router = Router();

router.post('/', saveUser)

router.get('/:email', getUser)

router.get('/', getUsers)
router.post('/password-link', resetPassword)
router.post('/reset-password', passportCall('jwt'), authorization('user'), newPassword)
router.delete('/', deleteUsers)
router.delete("/delete/:id", passportCall('jwt'), authorization('admin'), deleteUser)
router.put("/update/rol/:id/:rol", passportCall('jwt'), authorization('admin'), updateUserRol)
export default router;