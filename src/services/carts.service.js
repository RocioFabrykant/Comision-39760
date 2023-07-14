//import {CARTSDAO} from '../dao/index.js'
import CartsRepository from "../repositories/carts.repository.js";

const cartsRepository = new CartsRepository();
const saveCart = async(cart)=>{
    const rdo = await cartsRepository.createCart(cart);
    return rdo
}
const getCart = async(id)=>{
    const cart = await cartsRepository.getCartById(id);
    return cart;
}
const updateCart = async(idCarrito,productos) =>{
    const newCart = await cartsRepository.updateProductsCart(idCarrito,productos)
    return newCart;
}
const updateCartQuantity = async (idCarrito,idProducto,quantity)=>{
    const newCart = await cartsRepository.updateQuantityCart(idCarrito,idProducto,quantity);
    return newCart;
}
const updateCartProduct = async (idCarrito,producto)=>{
    const newCart = await cartsRepository.updateCart(idCarrito,producto);
    return newCart;
}
const deleteCartProduct = async (idCarrito,idProducto)=>{
    const rdo = await cartsRepository.deleteProductCart(idCarrito,idProducto);
    return rdo;
}
const deleteCartProducts = async (idCarrito)=>{
    const rdo = await cartsRepository.deleteProductsCart(idCarrito);
    return rdo;
}

const createPurchase = async (idCarrito)=>{
    const rdo = await cartsRepository.createPurchase(idCarrito);
    return rdo;
}

export{
    saveCart,
    getCart,
    updateCart,
    updateCartQuantity,
    updateCartProduct,
    deleteCartProduct,
    deleteCartProducts,
    createPurchase
}