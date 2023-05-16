import {
    Router
} from 'express';
import Products from '../dao/dbManagers/products.js';
//import Carts from '../dao/dbManagers/carts.js'

const router = Router();
const productManager = new Products();
//const cartManager = new Carts();
router.get('/', async (req, res) => {
    try {
        const productos = await productManager.getAll();
        res.render('home', {
            productos: productos
        });
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