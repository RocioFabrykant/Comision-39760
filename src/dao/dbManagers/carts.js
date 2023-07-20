import ProductManager from './products.js'
import {
    cartModel
} from '../models/carts.js'
// import {
//     updateProduct as updateProductService} from '../services/products.service.js'
//import {PRODUCTSDAO} from '../dao/index.js'

const productManager = new ProductManager();
export default class Carts {
    
    constructor() {
        console.log('Working carts with DB');

    }
    getAll = async () => {
        const carts = await cartModel.find().lean();
        return carts;
    }
    getById = async (id) => {
        //
        
        const cart = await cartModel.findOne({
            _id: id
        }).populate('products.product').lean();
        //console.log(cart.products.product.title);
        // populate({path: "products.product", select: "title"}).lean();

        console.log(JSON.stringify(cart,null, '\t'))
        //console.log(cart)
        return cart;

    }

    save = async (cart) => {
        const result = await cartModel.create(cart);
        return result;
    }

    deleteProduct = async (idCarrito, idProducto) => {
        const rdo = await cartModel.updateOne({
            _id: idCarrito,
            "products.product": idProducto
        }, {
            $pull: {
                "products": {
                    "product": idProducto
                }
            }
        });

        return rdo;

    }

    deleteProducts = async (idCarrito) => {
        const rdo = await cartModel.updateOne({
            _id: idCarrito
        }, {
            $set: {
                products: []
            }
        }, {
            'new': true,
            'safe': true,
            'upsert': true
        });

        return rdo;
    }

    updateProducts = async (id, products) => {
        const newCart = await cartModel.updateOne({
            _id: id
        }, {
            $set: {
                products: products
            }
        })
        return newCart;
    }

    updateQuantity = async (idCarrito, idProducto, cantidad) => {
        const newQuantity = await cartModel.updateOne({
            _id: idCarrito
        }, {
            $set: {
                "products.$[elem].quantity": cantidad
            }
        }, {
            arrayFilters: [{
                "elem._id": idProducto
            }],
            upsert: true
        })

        return newQuantity;
    }

    update = async (id, product) => {
        const cart = await cartModel.findOne({
            _id: id
        }).lean()
        const rdo = cart.products.findIndex(e => e.product == product._id)
        console.log(rdo);
        if (rdo != -1) {
            const cantidad = (cart.products[rdo].quantity) + 1;
            const resultado = await cartModel.updateOne({
                _id: id,
                products: {
                    $elemMatch: {
                        product: product._id
                    }
                }
            }, {
                $set: {
                    'products.$.quantity': cantidad
                }
            }, {
                'new': true,
                'safe': true,
                'upsert': true
            })
            return resultado;
        }
        cart.products.push({product})
        // const result = await cartModel.updateOne({
        //     _id: id
        // }, {
        //     $push: {
        //         products: product
        //     }
        // });
        const result = await cartModel.updateOne({_id:id},cart)
        return result;
    }
    createPurchase = async (idCarrito)=>{
        const cart = await cartModel.findOne({
            _id: idCarrito
        })
        //.populate({path:'products.product', select:'stock'}).lean();
        .populate('products.product').lean();
       // return cart;
        //let newarray = [];
        // const cart = await cartModel.findOne({
        //     _id: idCarrito
        // }).lean()
        //let arr = []
        for(let i=0;i<cart.products.length;i++){
            if(cart.products[i].quantity<= cart.products[i].product.stock){
                cart.products[i].product.stock=  cart.products[i].product.stock - cart.products[i].quantity
                //const product = cart.products[i].product.titlecart.products[i].product.description
                const rdo = await productManager.update(cart.products[i].product._id.toString(),cart.products[i].product)
                //console.log(cart.products[i]._id.toString(),cart.products[i].product)
                
                return rdo;
            }else{

            }
        }
        // cart.products.forEach(function(a){
        // if(quantity <= a.stock) {
        // a.stock = a.stock - quantity;
        // console.log(a.stock)
        // newarray.push(a)
        // }
        // })
        // return newarray;
        //const newaarray = cart.products.map(e=>e.quantity<=e.stock)
    }
}