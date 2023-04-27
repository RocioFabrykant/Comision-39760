import {Router} from 'express';
import ProductManager from "../managers/productmanager.js";

const router = Router();
const productManager = new ProductManager('./src/files/Productos.json');

router.get('/',async (req,res)=>{
    res.render('home',{productos:await productManager.getProducts()});

})

router.get('/realtimeproducts',async(req,res)=>{
    res.render('realTimeProducts',{productos:await productManager.getProducts()})
})


export default router;