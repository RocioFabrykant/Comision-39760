import ProductManager from "./managers/productmanager.js";
import fs from 'fs';
const productManager = new ProductManager('./files/Productos.json');

const env = async () => {
    //const productos = await productManager.getProducts();
    //console.log(productos);

    //await productManager.addProduct('peine', 'para peinar', 30, 'direccionfoto', 123, 30);
    //await productManager.addProduct('tijera', 'elemento para cortar 1', 30, 'direccion', '', 20);
    //await productManager.addProduct('cuter', 'elemento para cortar', 20, 'direccion', 123, 10);
    //await productManager.addProduct('regla', 'elemento para cortar', 20, 'direccion', 124, 10);
    const productResult = await productManager.getProducts();
    console.log(productResult);
    //console.log(await productManager.getProductbyId(2));
    const obj = {
        title: 'regla',
        description: 'elemento para cortar',
        price: 45,
        thumbnail: 'dire',
        code: 124,
        stock: 10
    }
    const productosluegoUpdate = await productManager.updateProduct(1, obj);
    console.log(productosluegoUpdate);
    //const productosluegoDelete = await productManager.deleteProduct(3);
    //console.log(productosluegoDelete);

}
env();
//fs.unlinkSync('./files/Productos.json');
