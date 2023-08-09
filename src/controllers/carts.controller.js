import {saveCart as saveCartService,
    getCart as getCartService,
    updateCart as updateCartService,
    updateCartQuantity as updateCartQuantityService,
    updateCartProduct as updateCartProductService,
    deleteCartProduct as deleteCartProductService,
    deleteCartProducts as deleteCartProductsService,
createPurchase as createPurchaseService} from '../services/carts.service.js'
const addCart = async (req,res)=>{
    const cart = {
        products: []
    }
    try {
        const result = await saveCartService(cart);
        res.status(200).send({
            status: 'success',
            payload: result
        })
    } catch (error) {
        res.status(500).send({
            status: 'error',
            error
        });
    }
}

const getCart = async (req,res) =>{
    const cartId = req.params.cid;
    try {
        const cart = await getCartService(cartId)

        res.status(200).send({
            status: 'success',
            payload: cart
        })
    } catch (error) {
        res.status(500).send({
            status: 'error',
            error
        });

    }
}

const updateCart = async (req,res) =>{
    const idCarrito = req.params.cid;
    const productos = req.body;
    try{
        const resultado = updateCartProductService(idCarrito,productos);
        return res.status(200).send({
            status: 'success',
            resultado
        });

    }catch(error){
        res.status(500).send({
            status: 'error',
            error
        });
    }
}

const updateCartQuantity = async (req,res) =>{
    const idCarrito = req.params.cid;
    const idProducto = req.params.pid;

    const {quantity} = req.body;
    
    try{
        
        const cantidadUpdate = await updateCartQuantityService(idCarrito,idProducto,quantity)
    
        return res.status(200).send({
            status: 'success',
            cantidadUpdate
        });
    }catch(error){
        res.status(500).send({
            status: 'error',
            error
        });
    }
}
const updateCartProduct = async (req,res) =>{
    const idProducto = req.params.pid;
    const idCarrito = req.params.cid;
    try {
        await cartManager.getById(idCarrito);
        const producto = {
            _id: idProducto,
            quantity: 1
        }
        const prodAgregado = updateCartService(idCarrito, producto);
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
}

const deleteCartProduct = async (req,res) =>{
    const idProducto = req.params.pid;
    const idCarrito = req.params.cid;
    try {
        await cartManager.getById(idCarrito);
        const result = await deleteCartProductService(idCarrito,idProducto);
        res.status(200).send({
            status: 'success',
            payload: result
        })
    } catch (error) {
        res.status(500).send({
            status: 'error',
            error
        });
    }
}

const deleteCart = async (req,res) =>{
    const idCarrito = req.params.cid;
    try {
        await cartManager.getById(idCarrito);
        const result = await deleteCartProductsService(idCarrito);
        res.status(200).send({
            status: 'success',
            payload: result
        })
    } catch (error) {
        res.status(500).send({
            status: 'error',
            error
        });
    }
}
const createPurchase = async (req,res)=>{
    const carrito = req.params.cid;
    const email = req.user.email;
    try{
        const result = await createPurchaseService(carrito,email);
        res.status(200).send({
            status: 'success',
            payload: result
        })
    }catch(error){
        res.status(500).send({
            status: 'error',
            error
        });
    }
}
export {
    addCart,
    getCart,
    updateCart,
    updateCartQuantity,
    updateCartProduct,
    deleteCartProduct,
    deleteCart,
    createPurchase
}