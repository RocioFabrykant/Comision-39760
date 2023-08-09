//MSJE PERSONALIZADO DE ERROR

export const generateProductErrorInfo = (product)=>{
    return `One or more properties were incomplete or not valid.
    List of required properties:
    *title : needs to be a string, received ${product.title}
    *category : needs to be a string, received ${product.category}
    *description : needs to be a string, received ${product.description}
    *stock : needs to be a number, received ${product.stock}
    *price : needs to be a number, received ${product.price}
    *code : needs to be a string, received ${product.code}`

    //PARA QUE SEA MAS DESCRIPTIVO PARA EL FRONTEND
}