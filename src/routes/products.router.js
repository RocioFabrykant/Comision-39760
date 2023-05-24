import {
    Router,
    response
} from 'express';
import Products from '../dao/dbManagers/products.js';
const router = Router();
//const productManager = new ProductManager('./src/files/Productos.json');
const productManager = new Products();


router.get('/', async (req, res) => {
    try {

        const {page=1,limit=10, sort="", query=""} = req.query;
  
        const productResult = await productManager.getAll(limit,page,sort,query);
            if(productResult.hasPrevPage){
                    productResult.prevLink = productResult.prevPage;
            }else{
                productResult.prevLink = null;
            }

            if(productResult.hasNextPage){
                productResult.nextLink = productResult.nextPage;

            }else{
                productResult.nextLink = null;
            }
        res.send({
            status: 'success',
            payload: productResult
        });

        
    } catch (error) {
        res.status(500).send({
            status: 'error',
            error
        });
    }


})

router.get('/:pid', async (req, res) => {
    const productId = req.params.pid;
    try {

        const elProducto = await productManager.getById(productId);
        res.send({
            status: 'success',
            payload: elProducto
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            error
        });
    }

})

router.post('/', async (req, res) => {
    const producto = req.body;


    if (!producto.title || !producto.description || !producto.code || !producto.category || !producto.stock || !producto.price) {
        return res.status(400).send({
            status: 'error',
            error: 'incomplete values'
        });
    }
    try {
        const rdo = await productManager.save(producto);
        if (rdo != "El producto ya existe") {
            const io = req.app.get('socketio');
            io.emit('showProducts', await productManager.getAll());
        }

        res.send({
            status: 'success',
            add: producto,
            payload: rdo
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            error
        });
    }


})

router.put('/:pid', async (req, res) => {
    const producto = req.body;
    const id = req.params.pid;


    if (!producto.title || !producto.description || !producto.code || !producto.category || !producto.stock) {
        return res.status(400).send({
            status: 'error',
            error: 'incomplete values'
        });

    }
    try {
        const elProducto = await productManager.update(id, producto);
        res.send({
            status: 'success',
            payload: elProducto
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            error
        });
    }


})

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