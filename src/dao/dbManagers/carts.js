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
        // const cart = await cartModel.findById(id);
        const cart = await cartModel.findOne({
            _id: id
        })
        return cart;
    }

    save = async (cart) => {
        const result = await cartModel.create(cart);
        return result;
    }

    update = async (id, product) => {
        const cart = await cartModel.findOne({
            _id: id
        }).lean()
        const rdo = cart.products.findIndex(e => e.id === product.id)
        if (rdo != -1) {
            const cantidad = (cart.products[rdo].quantity) + 1;
            const resultado = await cartModel.updateOne({
                _id: id,
                products: {
                    $elemMatch: {
                        id: product.id
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
        const result = await cartModel.updateOne({
            _id: id
        }, {
            $push: {
                products: product
            }
        });
        return result;
    }
}