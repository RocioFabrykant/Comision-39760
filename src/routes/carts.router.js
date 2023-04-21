import {
    Router
} from 'express';
import CartManager from '../managers/CartManager.js';

const router = Router();
const cartManager = new CartManager('./src/files/Carts.json');


router.post('/', async (req, res) => {
    const cart = {
        products: []
    }
    const result = await cartManager.addCart(cart);
    res.send({
        status: 'success',
        result
    })
})

router.get('/:cid', async (req, res) => {
    const cartId = Number(req.params.cid);
    const cart = await cartManager.getById(cartId)
    if (cart === 'Not Found') {
        return res.status(404).send({
            error: 'error',
            message: 'Cart not found'
        })
    }
    res.send({
        status: 'success',
        cart
    })
})

router.post('/:cid/product/:pid', async (req, res) => {
    const idProducto = Number(req.params.pid);
    const idCarrito = Number(req.params.cid);

    const cart = await cartManager.getById(idCarrito);
    if (cart != 'Not Found') {
        const prodAgregado = await cartManager.addProduct(idProducto, idCarrito);
        return res.send({
            status: 'success',
            prodAgregado
        });
    }
    res.status(404).send({
        error: 'error',
        message: 'Cart not found'
    });
})

export default router;