//import {PRODUCTSDAO} from '../dao/index.js'
import ProductsRepository from "../repositories/products.repository.js";

const productsRepository = new ProductsRepository();

const getProducts = async(limit,page,sort,query)=>{
    const productos = await productsRepository.getProducts(limit,page,sort,query);
    return productos;
}

const getProduct = async(id)=>{
    const producto = await productsRepository.getProductById(id);
    return producto;
}

const saveProduct = async(product)=>{
    const rdo = await productsRepository.createProduct(product);
    return rdo;
}

const updateProduct = async(id,product)=>{
    const rdo = await productsRepository.updateProduct(id,product);
    return rdo;
}

export{
    getProducts,
    getProduct,
    saveProduct,
    updateProduct
}