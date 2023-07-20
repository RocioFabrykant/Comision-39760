//import {CARTSDAO} from '../dao/index.js'
import {v4 as uuidv4} from 'uuid';
import CartsRepository from "../repositories/carts.repository.js";
import ProductRepository from "../repositories/products.repository.js";
import TicketRepository from '../repositories/tickets.repository.js'
const cartsRepository = new CartsRepository();
const productsRepository = new ProductRepository();
const ticketRepository = new TicketRepository();
import { sendEmail } from '../config/mailing.config.js';
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

const createPurchase = async (idCarrito,email)=>{
    const cart = await cartsRepository.getCartById(idCarrito);
    const productstoBuy = [];
    const nonStockProducts = [];
    let amount = 0;
    //const rdo = await cartsRepository.createPurchase(idCarrito);
    //return rdo;
    //STOCK
//     const cart = await cartModel.findOne({
//         _id: idCarrito
//     })
//     //.populate({path:'products.product', select:'stock'}).lean();
//     .populate('products.product').lean();
//    // return cart;
//     //let newarray = [];
//     // const cart = await cartModel.findOne({
//     //     _id: idCarrito
//     // }).lean()
//     //let arr = []
console.log(cart.products)
    for(const p of cart.products){
        const product = await productsRepository.getProductById(p._id);
        if(product.stock>= p.quantity){
            productstoBuy.push({
                title:p.title,
                price:p.price,
                quantity:p.quantity
            })
            await productsRepository.updateStock(product._id,p.quantity)
            await cartsRepository.deleteProductCart(idCarrito,product._id)
            amount+=p.quantity*p.price; 
        }else{
            nonStockProducts.push(p._id);
        }
    }

    //TICKET
    let code = uuidv4().toString;
    const dateNow = new Date().toLocaleDateString();
    const generateTicket = await ticketRepository.saveTicket(code,dateNow,amount,email);
    const ticket = {generateTicket,productstoBuy,nonStockProducts};

    const emailtoSend =  {from: "E-commerce Fabrykant",
    to: email, 
    subject: "Ticket", 
    html:await ticketRepository.listofProducts(productstoBuy,amount)};
    await sendEmail(emailtoSend);

    return  ticket
}

    
//     for(let i=0;i<cart.products.length;i++){
//         if(cart.products[i].quantity<= cart.products[i].product.stock){
//             cart.products[i].product.stock=  cart.products[i].product.stock - cart.products[i].quantity
//             //const product = cart.products[i].product.titlecart.products[i].product.description
//             const rdo = await productManager.update(cart.products[i].product._id.toString(),cart.products[i].product)
//             //console.log(cart.products[i]._id.toString(),cart.products[i].product)
            
//             return rdo;
//         }else{

//         }
//     }


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