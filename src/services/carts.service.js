import {CARTSDAO} from '../dao/index.js'
const saveCart = async(cart)=>{
    const rdo = await CARTSDAO.save(cart);
    return rdo
}
const getCart = async(id)=>{
    const cart = await CARTSDAO.getById(id);
    return cart;
}
const updateCart = async(idCarrito,productos) =>{
    const newCart = await CARTSDAO.updateProducts(idCarrito,productos)
    return newCart;
}
const updateCartQuantity = async (idCarrito,idProducto,quantity)=>{
    const newCart = await CARTSDAO.updateQuantity(idCarrito,idProducto,quantity);
    return newCart;
}
const updateCartProduct = async (idCarrito,producto)=>{
    const newCart = await CARTSDAO.update(idCarrito,producto);
    return newCart;
}
const deleteCartProduct = async (idCarrito,idProducto)=>{
    const rdo = await CARTSDAO.deleteProduct(idCarrito,idProducto);
    return rdo;
}
const deleteCartProducts = async (idCarrito)=>{
    const rdo = await CARTSDAO.deleteProducts(idCarrito);
    return rdo;
}

export{
    saveCart,
    getCart,
    updateCart,
    updateCartQuantity,
    updateCartProduct,
    deleteCartProduct,
    deleteCartProducts
}