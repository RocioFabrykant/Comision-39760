import {
    productModel
} from '../models/products.js'


export default class Products {
    constructor() {
        console.log('Working products with DB');

    }
    getAll = async (limit, page, sort, query) => {


        let orden;
        sort === "asc" ? orden = 1 : orden = -1;


        const options = {

            sort: {
                price: orden
            },
            lean: true,
            limit: limit,
            page: page,

        }




        if (query != "") {
            const products = await productModel.paginate({
                query
            }, options);
            return products

        }
        const products = await productModel.paginate({}, options)

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
        if (rdo.length != 0) {
            return 'El producto ya existe'
        }
        const result = await productModel.create(product);
        return result;
    }

    update = async (id, product) => {
        const resultado = await productModel.findByIdAndUpdate(id, product);
        return resultado;
    }

    updateStock = async (id, stock) => {

        await productModel.updateOne({
            _id: id
        }, {
            $set: {
                stock: stock
            },
            upsert: true
        })
    }
    deleteProduct = async (id) => {
        await productModel.deleteOne({
            _id: id
        })
    }

}