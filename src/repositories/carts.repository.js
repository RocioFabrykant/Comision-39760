import CartsDao from '../dao/dbManagers/carts.js'
export default class CartRepository {
    constructor() {
        this.dao = new CartsDao();
    }
    getCarts = async () => {
        const result = await this.dao.getAll();
        return result;
    }
    createCart = async (cart) => {
        const result = await this.dao.save(cart);
        return result;
    }

    getCartById = async (id) => {

        const result = await this.dao.getById(id);
        return result;
    }
    updateProductsCart = async (id, products) => {
        const result = await this.dao.updateProducts(id, products);
        return result;
    }
    deleteProductCart = async (id, idproduct) => {
        const result = await this.dao.deleteProduct(id, idproduct);
        return result;
    }
    deleteProductsCart = async (id) => {
        const result = await this.dao.deleteProducts(id);
        return result;
    }
    updateQuantityCart = async (id, idproduct, quantity) => {
        const result = await this.dao.updateQuantity(id, idproduct, quantity);
        return result;
    }
    updateCart = async (id, product) => {
        const result = await this.dao.update(id, product);
        return result;
    }
    createPurchase = async (id) => {
        const result = await this.dao.createPurchase(id);
        return result;
    }

}