import {
    Router
} from 'express';

//import Carts from '../dao/dbManagers/carts.js';
import {addCart,
    getCart,
    updateCart,
    updateCartQuantity,
    updateCartProduct,
    deleteCartProduct,
    deleteCart} from '../controllers/carts.controller.js'

const router = Router();
//const cartManager = new Carts();


router.post('/', addCart)

router.get('/:cid', getCart)
router.put('/:cid', updateCart)
router.put('/:cid/products/:pid', updateCartQuantity)
router.post('/:cid/product/:pid', updateCartProduct)

router.delete('/:cid/products/:pid', deleteCartProduct)

router.delete('/:cid', deleteCart)


export default router;