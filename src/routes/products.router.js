import {
    Router
} from 'express';
import ProductManager from "../managers/productmanager.js";
const router = Router();
const productManager = new ProductManager('./src/files/Productos.json');

router.get('/', async (req, res) => {

    const productResult = await productManager.getProducts();

    //LIMIT
    const limit = Number(req.query.limit);
    if (limit > productResult.length || limit <= 0) {
        return res.status(400).send("limite incorrecto");
    } else if (!limit) {
        return res.send({
            status: 'success',
            productResult
        });
    }

    const nuevoArreglo = productResult.slice(0, limit);

    res.send({
        status: 'success',
        nuevoArreglo
    });


})

router.get('/:pid', async (req, res) => {
    const productId = Number(req.params.pid);
    const elProducto = await productManager.getProductbyId(productId);
    res.send({
        elProducto
    });
})

router.post('/', async (req, res) => {
    const producto = req.body;
    
    
    if (!producto.status) {
        producto.status = true;
    }

    if (!producto.title || !producto.description || !producto.code || !producto.category || !producto.stock || !producto.price) {
        return res.status(400).send({
            error: 'incomplete values'
        });
    }
    const rdo = await productManager.addProduct(producto);
    if(rdo!="El producto ya existe"){
        const io = req.app.get('socketio');
        io.emit('showProducts', await productManager.getProducts());
    }
        
    res.send({
        add: producto,
        result: rdo
    });

})

router.put('/:pid', async (req, res) => {
    const productId = Number(req.params.pid);
    const producto = req.body;
    if (!producto.status) {
        producto.status = true;
    }

    if (!producto.title || !producto.description || !producto.code || !producto.category || !producto.stock) {
        return res.status(400).send({
            error: 'incomplete values'
        });

    }
    const elProducto = await productManager.updateProduct(productId, producto);
    res.send({
        status: 'success',
        producto: elProducto
    });

})

router.delete('/:pid', async (req, res) => {
    const productId = Number(req.params.pid);
    const eliminaProducto = await productManager.deleteProduct(productId);
    
    
    
    if (eliminaProducto != 'Not found') {
        const io = req.app.get('socketio');
        io.emit('showProducts', await productManager.getProducts());
        return res.send({
            status: 'success',
            message: 'product deleted',
            eliminaProducto
        });
    }
    res.status(400).send({
        message: eliminaProducto
    })
})


export default router;