import CustomError from '../middlewares/errors/CustomError.js';
import EErrors from '../middlewares/errors/enums.js';
import { generateProductErrorInfo } from '../middlewares/errors/info.js';
import {getProducts as getProductsService,
    getProduct as getProductService,
    saveProduct as saveProductService,
    updateProduct as updateProductService,
getMockProducts as getMockProductsService} from '../services/products.service.js'
const getProducts = async (req,res) =>{
    try {

        const {page=1,limit=10, sort="", query=""} = req.query;
  
        const productResult = await getProductsService(limit,page,sort,query);
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
        res.status(200).send({
            status: 'success',
            payload: productResult
        });

        
    } catch (error) {
        res.status(500).send({
            status: 'error',
            error
        });
    }
}

const getProduct = async (req,res) =>{
    const productId = req.params.pid;
    try {

        const elProducto = await getProductService(productId);
        res.status(200).send({
            status: 'success',
            payload: elProducto
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            error
        });
    }
}

const saveProduct = async (req,res)=>{
    const producto = req.body;


    if (!producto.title || !producto.description || !producto.code || !producto.category || !producto.stock || !producto.price) {
        return res.status(400).send({
            status: 'error',
            error: 'incomplete values'
        });
    }
        const rdo = await saveProductService(producto);
        if (rdo != "El producto ya existe") {
            const io = req.app.get('socketio');
            io.emit('showProducts', await getProductsService());
        }

        res.status(200).send({
            status: 'success',
            add: producto,
            payload: rdo
        });
    


}

const updateProduct = async (req,res)=>{
    const producto = req.body;
    const id = req.params.pid;


    if (!producto.title || !producto.description || !producto.code || !producto.category || !producto.stock) {
        return res.status(400).send({
            status: 'error',
            error: 'incomplete values'
        });

    }
    try {
        const elProducto = await updateProductService(id, producto);
        res.status(200).send({
            status: 'success',
            payload: elProducto
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            error
        });
    }


}

const mockingProducts = async (req,res)=>{
    try{
        const mockedProducts = await getMockProductsService();
        console.log(mockedProducts)
        res.status(200).send({
            status: 'success',
            payload: mockedProducts
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            status: 'error',
            error
        });
    }
}

export {
    getProducts,
    getProduct,
    saveProduct,
    updateProduct,
    mockingProducts
}