import fs from 'fs'
export default class ProductManager {
    constructor(path) {
        this.products = [];
        this.path = path;
    }
    addProduct = async (producto) => {
        try {
            const productos = await this.getProducts();

            if (productos.length === 0) {
                producto.id = 1;
            } else {
                producto.id = productos[productos.length - 1].id + 1;
                if (productos.find(p => p.code === producto.code)||productos.find(p => p.title === producto.title)) {
                    return 'El producto ya existe';
                }

            }
            productos.push(producto);

            await fs.promises.writeFile(this.path, JSON.stringify(productos, null, '\t'));
            return productos;



        } catch (error) {
            return 'error';
        }
    }

    getProducts = async () => {
        try {

            if (fs.existsSync(this.path)) {
                const productos = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'));
                return productos;
            } else {
                return [];
            }
        } catch (error) {
            return error;
        }

    }

    getProductbyId = async (id) => {
        try {

            if (fs.existsSync(this.path)) {
                const productos = await this.getProducts();
                const productoid = productos.findIndex(producto => producto.id === id);
                if (productoid != -1) {
                    return productos[productoid];
                } else {
                    return 'Not found';
                }
            } else {
                return 'no existe el archivo';
            }

        } catch (error) {
            return error;
        }
    }

    updateProduct = async (id, obj) => {
        try {
            if (fs.existsSync(this.path)) {
                const productos = await this.getProducts();
                const productoId = await this.getProductbyId(id);
                if (productoId != 'Not found') {
                    productos[productos.findIndex(producto => producto.id === id)] = {
                        ...obj,
                        id: id
                    };
                } else {
                    return 'no existe el id';

                }

                await fs.promises.writeFile(this.path, JSON.stringify(productos, null, '\t'));
                return productos[productos.findIndex(producto => producto.id === id)];
            } else {
                return 'no existe el archivo';
            }
        } catch (error) {
            return error;
        }
    }

    deleteProduct = async (id) => {
        try {
            const productos = await this.getProducts();
            const productoId = await this.getProductbyId(id);
            if (productoId != 'Not found') {
                const nuevosProductos = productos.filter(producto => producto.id !== id);
                await fs.promises.writeFile(this.path, JSON.stringify(nuevosProductos, null, '\t'));
                return nuevosProductos;
            } else {
                return 'Not found';
            }

        } catch (error) {
            return error;
        }
    }
}