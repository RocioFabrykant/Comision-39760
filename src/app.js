import ProductManager from "./productmanager.js";
//import fs from 'fs';
import express from 'express';
const app = express();
const productManager = new ProductManager('./src/Productos.json');

//const env = async () => {
//const productos = await productManager.getProducts();
//console.log(productos);

//await productManager.addProduct('peine', 'para peinar', 30, 'direccionfoto', 123, 30);
//await productManager.addProduct('tijera', 'elemento para cortar 1', 30, 'direccion', '', 20);
//await productManager.addProduct('cuter', 'elemento para cortar', 20, 'direccion', 123, 10);
//await productManager.addProduct('regla', 'elemento para cortar', 20, 'direccion', 124, 10);

app.get('/products', async (req, res) => {

    //req.query;
    const productResult = await productManager.getProducts();

    //LIMIT
    const limit = Number(req.query.limit);
    if (limit > productResult.length || limit <= 0) {
        return res.send("limite incorrecto");
        //return res.send({productResult});
    } else if (!limit) {
        return res.send({
            productResult
        });
    }

    const nuevoArreglo = productResult.slice(0, limit);

    //opc 2 para LIMIT

    //  const nuevoArray = [];
    //  for(let i=0;i<limit;i++){
    //      nuevoArray.push(productResult[i]);
    //  }
    res.send({
        nuevoArreglo
    });

})

app.get('/products/:pid', async (req, res) => {
    //verificar si hay que agregar validacion
    const productId = Number(req.params.pid);
    const elProducto = await productManager.getProductbyId(productId);
    res.send({
        elProducto
    });
})

app.listen(8080, () => console.log('listening on port 8080'));
//const productResult = await productManager.getProducts();
//console.log(productResult);
//console.log(await productManager.getProductbyId(2));



// const obj = {
//     title: 'regla',
//     description: 'elemento para cortar',
//     price: 45,
//     thumbnail: 'dire',
//     code: 124,
//     stock: 10
// }
// const productosluegoUpdate = await productManager.updateProduct(1, obj);
// console.log(productosluegoUpdate);



//const productosluegoDelete = await productManager.deleteProduct(3);
//console.log(productosluegoDelete);

//}
//env();

//fs.unlinkSync('./files/Productos.json');