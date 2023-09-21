import ProductsRepository from "../repositories/products.repository.js";
import UserRepository from "../repositories/users.repository.js";
import {
    sendEmail
} from '../config/mailing.config.js';

const userRepository = new UserRepository();
const productsRepository = new ProductsRepository();

const getProducts = async (limit, page, sort, query) => {
    const productos = await productsRepository.getProducts(limit, page, sort, query);
    return productos;
}

const getProduct = async (id) => {
    const producto = await productsRepository.getProductById(id);
    return producto;
}

const saveProduct = async (product) => {
    const rdo = await productsRepository.createProduct(product);
    return rdo;
}

const updateProduct = async (id, product) => {
    const rdo = await productsRepository.updateProduct(id, product);
    return rdo;
}

const getMockProducts = async () => {
    const products = await productsRepository.getMocked();
    return products;
}

const deleteProduct = async (id) => {
    const product = await productsRepository.getProductById(id);
    const user = await userRepository.getUserByEmail(product.owner);
    if (user.role === 'premium' && product.owner != 'admin') {
        const emailtoSend = {
            from: "E-commerce Fabrykant",
            to: product.owner,
            subject: "Eliminacion producto",
            html: `El producto ${product.title} es eliminado`
        };
        await sendEmail(emailtoSend);
    }
    await productsRepository.deleteProduct(id);

}

export {
    getProducts,
    getProduct,
    saveProduct,
    updateProduct,
    getMockProducts,
    deleteProduct
}