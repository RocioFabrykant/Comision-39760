import {
    Router
} from 'express';
import {passportCall,authorization} from '../utils.js'
//import Products from '../dao/dbManagers/products.js';
import {    getProducts,
    getProduct,
    saveProduct,
    updateProduct,
    mockingProducts} from '../controllers/products.controller.js'
const router = Router();
//const productManager = new ProductManager('./src/files/Productos.json');
//const productManager = new Products();


router.get('/', getProducts)

router.get('/:pid', getProduct)

router.post('/',passportCall('jwt'),authorization('admin'), saveProduct)

router.put('/:pid',passportCall('jwt'),authorization('admin'), updateProduct)

router.get('/mocking-products',mockingProducts)

// router.delete('/:pid', async (req, res) => {
//     const productId = Number(req.params.pid);
//     const eliminaProducto = await productManager.deleteProduct(productId);



//     if (eliminaProducto != 'Not found') {
//         const io = req.app.get('socketio');
//         io.emit('showProducts', await productManager.getProducts());
//         return res.send({
//             status: 'success',
//             message: 'product deleted',
//             eliminaProducto
//         });
//     }
//     res.status(400).send({
//         message: eliminaProducto
//     })
// })


export default router;