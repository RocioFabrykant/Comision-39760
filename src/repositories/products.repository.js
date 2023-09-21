import {
    generateProduct
} from '../mock/mock-products.js';
import ProductsDao from '../dao/dbManagers/products.js';

export default class ProductRepository {
    constructor() {
        this.dao = new ProductsDao();
    }
    getProducts = async (limit, page, sort, query) => {
        const result = await this.dao.getAll(limit, page, sort, query);
        return result;
    }
    createProduct = async (product) => {
        const result = await this.dao.save(product);
        return result;
    }

    getProductById = async (id) => {

        const result = await this.dao.getById(id);
        return result;
    }
    updateProduct = async (id, product) => {
        const result = await this.dao.update(id, product);
        return result;
    }
    updateStock = async (id, stock) => {
        await this.dao.updateStock(id, stock)
    }
    getMocked = async () => {
        const productos = await generateProduct();
        return productos;
    }
    deleteProduct = async (id) => {
        await this.dao.deleteProduct(id)
    }

}