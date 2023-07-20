import {
    Router
} from 'express';
import {passportCall,authorization} from '../utils.js'
//import Carts from '../dao/dbManagers/carts.js';
import {addCart,
    getCart,
    updateCart,
    updateCartQuantity,
    updateCartProduct,
    deleteCartProduct,
    deleteCart,
    createPurchase} from '../controllers/carts.controller.js'

const router = Router();
//const cartManager = new Carts();


router.post('/', addCart)
router.get('/:cid/purchase',passportCall('jwt'),authorization('user'),createPurchase)
router.get('/:cid', getCart)
router.put('/:cid', updateCart)
router.put('/:cid/products/:pid', updateCartQuantity)
router.post('/:cid/product/:pid',passportCall('jwt'),authorization('user'), updateCartProduct)

router.delete('/:cid/products/:pid', deleteCartProduct)

router.delete('/:cid', deleteCart)


export default router;