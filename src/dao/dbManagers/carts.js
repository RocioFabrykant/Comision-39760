import mongoose from 'mongoose';
import {
    cartModel
} from '../models/carts.js'


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
        }).populate({ path: 'products.product', select: 'title' }).lean();
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
}