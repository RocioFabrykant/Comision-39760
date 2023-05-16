import {
    productModel
} from '../models/products.js'


export default class Products {
    constructor() {
        console.log('Working products with DB');

    }
    getAll = async () => {
        const products = await productModel.find().lean();
        return products;
    }
    getById = async (id) => {
        const product = await productModel.findById(id);
        return product;
    }

    save = async (product) => {

        const rdo = await productModel.find({
            $or: [{
                code: product.code
            }, {
                title: product.title
            }]
        });
        if (!rdo) {
            return 'El producto ya existe'
        }
        const result = await productModel.create(product);
        return result;
    }

    update = async (id, product) => {
        const resultado = await productModel.findByIdAndUpdate(id, product);
        return resultado;
    }
}