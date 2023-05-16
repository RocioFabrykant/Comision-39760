import {
    Router
} from 'express';

import Carts from '../dao/dbManagers/carts.js';

const router = Router();
const cartManager = new Carts();


router.post('/', async (req, res) => {
    const cart = {
        products: []
    }
    try {
        const result = await cartManager.save(cart);
        res.send({
            status: 'success',
            payload: result
        })
    } catch (error) {
        res.status(500).send({
            status: 'error',
            error
        });
    }

})

router.get('/:cid', async (req, res) => {
    const cartId = req.params.cid;
    try {
        const cart = await cartManager.getById(cartId)

        res.send({
            status: 'success',
            payload: cart
        })
    } catch (error) {
        console.log('error');
        res.status(500).send({
            status: 'error',
            error
        });

    }


})

router.post('/:cid/product/:pid', async (req, res) => {
    const idProducto = req.params.pid;
    const idCarrito = req.params.cid;
    try {
        await cartManager.getById(idCarrito);
        const producto = {
            id: idProducto,
            quantity: 1
        }
        const prodAgregado = await cartManager.update(idCarrito, producto);
        return res.send({
            status: 'success',
            prodAgregado
        });
    }
    // }    res.status(404).send({
    // error: 'error',
    // message: 'Cart not found'});
    catch (error) {

        res.status(500).send({
            status: 'error',
            error
        });
    }


})

export default router;