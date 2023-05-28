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
router.put('/:cid', async (req,res)=>{
    const idCarrito = req.params.cid;
    //arreglo viene en body
    const productos = req.body;
    try{
        const resultado = await cartManager.updateProducts(idCarrito,productos);
        return res.send({
            status: 'success',
            resultado
        });

    }catch(error){
        res.status(500).send({
            status: 'error',
            error
        });
    }
})

router.put('/:cid/products/:pid', async (req,res)=>{
    const idCarrito = req.params.cid;
    const idProducto = req.params.pid;

    const {quantity} = req.body;
    
    try{
        const cantidadUpdate = await cartManager.updateQuantity(idCarrito,idProducto,quantity)
        return res.send({
            status: 'success',
            cantidadUpdate
        });
    }catch(error){
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
            _id: idProducto,
            quantity: 1
        }
        const prodAgregado = await cartManager.update(idCarrito, producto);
        return res.send({
            status: 'success',
            prodAgregado
        });
    }

    catch (error) {

        res.status(500).send({
            status: 'error',
            error
        });
    }


})
router.delete('/:cid/products/:pid', async (req, res) => {
    const idProducto = req.params.pid;
    const idCarrito = req.params.cid;
    try {
        await cartManager.getById(idCarrito);
        const result = await cartManager.deleteProduct(idCarrito,idProducto);
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

router.delete('/:cid', async (req, res) => {
    const idCarrito = req.params.cid;
    try {
        await cartManager.getById(idCarrito);
        const result = await cartManager.deleteProducts(idCarrito);
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


export default router;