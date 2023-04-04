import fs from 'fs'
export default class ProductManager {
    constructor(path) {
        this.products = [];
        this.path = path;
    }
    addProduct = async (title, description, price, thumbnail, code, stock) => {
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        try {
            const productos = await this.getProducts();
            if (title != "" && description != "" && price != "" && thumbnail != "" && code != "" && stock != "") {
                if (productos.length === 0) {
                    product.id = 1;
                } else {
                    product.id = productos[productos.length - 1].id + 1;
                    if (productos.find(product => product.code === code)) {
                        console.log('el code ya existe');
                        return;
                    }
                }
                productos.push(product);
                await fs.promises.writeFile(this.path, JSON.stringify(productos, null, '\t'));


            } else {
                console.log('completar todos los campos obligatorios');
            }
        } catch (error) {
            console.log(error);
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
            console.log(error);
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
            console.log(error);
        }
    }

    updateProduct = async (id, obj) => {
        //ver de reutilizar getproducts y getproductbyid
        try {
            if (fs.existsSync(this.path)) {
                const productos = await this.getProducts();
                const productoId = await this.getProductbyId(id); 
                if(productoId != 'Not found'){
                    productos[productos.findIndex(producto => producto.id === id)] = {...obj,id:id};
                }else{
                    return 'no existe el id';
                    
                }
                
                await fs.promises.writeFile(this.path, JSON.stringify(productos, null, '\t'));
                    return productos;
                } 
             else {
                return 'no existe el archivo';
            }
        } catch (error) {
            console.log(error);
        }
    }

    deleteProduct = async (id) => {
        try {
            const productos = await this.getProducts();
            //const productoid = productos.findIndex(producto => producto.id === id);
            const productoId = await this.getProductbyId(id);
            if (productoId != 'Not found') {
                productos.splice(productos.findIndex(producto => producto.id === id), 1);
                await fs.promises.writeFile(this.path, JSON.stringify(productos, null, '\t'));
                return productos;
            } else {
                return 'Not found';
            }

        } catch (error) {
            console.log(error);
        }
    }
}