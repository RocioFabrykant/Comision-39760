import {
    v4 as uuidv4
} from 'uuid';
import CartsRepository from "../repositories/carts.repository.js";
import ProductRepository from "../repositories/products.repository.js";
import TicketRepository from '../repositories/tickets.repository.js'
const cartsRepository = new CartsRepository();
const productsRepository = new ProductRepository();
const ticketRepository = new TicketRepository();
import {
    sendEmail
} from '../config/mailing.config.js';
const saveCart = async (cart) => {
    const rdo = await cartsRepository.createCart(cart);
    return rdo
}
const getCart = async (id) => {
    const cart = await cartsRepository.getCartById(id);
    return cart;
}
const updateCart = async (idCarrito, productos) => {
    const newCart = await cartsRepository.updateProductsCart(idCarrito, productos)
    return newCart;
}
const updateCartQuantity = async (idCarrito, idProducto, quantity) => {
    const newCart = await cartsRepository.updateQuantityCart(idCarrito, idProducto, quantity);
    return newCart;
}
const updateCartProduct = async (idCarrito, producto) => {
    const newCart = await cartsRepository.updateCart(idCarrito, producto);
    return newCart;
}
const deleteCartProduct = async (idCarrito, idProducto) => {
    const rdo = await cartsRepository.deleteProductCart(idCarrito, idProducto);
    return rdo;
}
const deleteCartProducts = async (idCarrito) => {
    const rdo = await cartsRepository.deleteProductsCart(idCarrito);
    return rdo;
}

const createPurchase = async (idCarrito, purchaser) => {
    const cart = await cartsRepository.getCartById(idCarrito);
    const productstoBuy = [];
    const nonStockProducts = [];
    let amount = 0;

    for (const p of cart.products) {
        const product = await productsRepository.getProductById(p.product);

        if (product.stock >= p.quantity) {
            productstoBuy.push({
                title: product.title,
                price: product.price,
                quantity: p.quantity
            })

            amount += p.quantity * product.price;
            await productsRepository.updateStock(p.product, product.stock - p.quantity)
            await cartsRepository.deleteProductCart(idCarrito, p.product)

        } else {
            nonStockProducts.push(p.product);
        }
    }

    let code = uuidv4();
    const purchase_datetime = new Date();

    const generateTicket = await ticketRepository.saveTicket({
        purchase_datetime,
        code,
        amount,
        purchaser
    });
    const ticket = {
        generateTicket,
        productstoBuy,
        nonStockProducts
    };

    const emailtoSend = {
        from: "E-commerce Fabrykant",
        to: purchaser,
        subject: "Ticket",
        html: await ticketRepository.listofProducts(productstoBuy, amount)
    };
    await sendEmail(emailtoSend);

    return ticket
}




export {
    saveCart,
    getCart,
    updateCart,
    updateCartQuantity,
    updateCartProduct,
    deleteCartProduct,
    deleteCartProducts,
    createPurchase
}