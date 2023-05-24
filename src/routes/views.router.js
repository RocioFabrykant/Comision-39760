import {
    Router
} from 'express';
import Products from '../dao/dbManagers/products.js';
import Carts from '../dao/dbManagers/carts.js'

const router = Router();
const productManager = new Products();
const cartManager = new Carts()

router.get('/products', async (req, res) => {
    const {
        page = 1, limit = 1, sort = "", query = ""
    } = req.query;
    try {


        const {
            docs,
            hasPrevPage,
            hasNextPage,
            nextPage,
            prevPage
        } = await productManager.getAll(limit, page, sort, query);

        const products = docs;

        res.render('products', {
            products,
            hasPrevPage,
            hasNextPage,
            nextPage,
            prevPage
        });
    } catch (error) {
        console.log(error);
    }
});

router.get('/carts/:cid', async (req, res) => {
    const cartId = req.params.cid;
    try {
        const cart = await cartManager.getById(cartId);
        res.render('cart', {
            cart: cart
        })
    } catch (error) {
        console.log(error);
    }


})

router.get('/realtimeproducts', async (req, res) => {
    try {
        const productos = await productManager.getAll()
        res.render('realTimeProducts', {
            productos: productos
        })
    } catch (error) {

        console.log(error);
    }

})
router.get('/chat', (req, res) => {
    res.render('chat');
});


export default router;