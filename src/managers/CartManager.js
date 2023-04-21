import fs from 'fs'
export default class CartManager {
    constructor(path) {
        this.carts = [];
        this.path = path;
    }
    async addCart(cart) {
        try {
            const carts = await this.getCarts();

            if (carts.length === 0) {
                cart.id = 1;
            } else {
                cart.id = carts[carts.length - 1].id + 1;
            }
            carts.push(cart);
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
            return cart;
        } catch (error) {
            console.log('entro en error')
            return error;
        }
    }
    async getCarts() {
        try {
            if (fs.existsSync(this.path)) {
                const carts = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
                console.log(carts)
                return carts;

            } else {
                return [];
            }
        } catch (error) {
            console.log('entro al error')
            return error;

        }
    }

    async getById(id) {
        try {
            if (fs.existsSync(this.path)) {
                const carts = await this.getCarts();
                const cart = carts.find(cart => cart.id === id);

                return cart;
            } else {
                return 'Not Found';
            }
        } catch (error) {
            return error;
        }

    }

    async addProduct(idProducto, idCarrito) {
        try {
            const carts = await this.getCarts();
            const indexCarts = carts.findIndex(c => c.id === idCarrito);
            console.log(indexCarts)
            const indexProductos = carts[indexCarts].products.findIndex(p => p.id === idProducto);
            console.log(indexProductos)
            if (indexProductos != -1) {
                carts[indexCarts].products[indexProductos].quantity += 1;
                await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
                return carts[indexCarts].products[indexProductos];

            } else {
                const producto = {
                    id: idProducto,
                    quantity: 1
                }
                console.log('es prod nuevo');
                carts[indexCarts].products.push(producto);
                await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));


                return producto;
            }
        } catch (error) {
            return error;
        }
    }
}