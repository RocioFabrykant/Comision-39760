import {
    Router
} from 'express'
import {

    passportCall,

    authorization
} from '../utils.js';
import {
    registerUser,
    loginUser,
    currentRoute,
    currentCustomRoute
} from '../controllers/auth.controller.js';

const router = Router();


router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/current', passportCall('jwt'), currentRoute)
router.get('/current-custom', passportCall('jwt'), authorization('admin'), currentCustomRoute)



// router.get('/current', passport.authenticate('jwt', {
//     session: false
// }), async (req, res) => {
//     const user = await userRepository.getUserByEmail(req.user.email);
//     res.send({
//         status: 'success',
//         payload: user
//     })
// })

export default router;