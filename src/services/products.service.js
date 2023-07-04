import {PRODUCTSDAO} from '../dao/index.js'

const getProducts = async(limit,page,sort,query)=>{
    const productos = await PRODUCTSDAO.getAll(limit,page,sort,query);
    return productos;
}

const getProduct = async(id)=>{
    const producto = await PRODUCTSDAO.getById(id);
    return producto;
}

const saveProduct = async(product)=>{
    const rdo = await PRODUCTSDAO.save(product);
    return rdo;
}

const updateProduct = async(id,product)=>{
    const rdo = await PRODUCTSDAO.update(id,product);
    return rdo;
}

export{
    getProducts,
    getProduct,
    saveProduct,
    updateProduct
}