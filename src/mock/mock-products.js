import {faker} from '@faker-js/faker';
//faker.locale = "es";
const generateProduct = async ()=>{
    // const numOfProducts = parseInt(
    //     faker.random.numeric(1,{
    //         bannedDigits:["0"]
    //     })
    // )

    let products = [];
    for(let i = 0; i < 100;i++ ){
        const product = {
            title:faker.commerce.product(),
            description:faker.commerce.productDescription(),
            code:faker.random.alpha(5),
            category:faker.commerce.department(),
            price:faker.commerce.price(),
            stock:faker.random.numeric(1),
        //id:faker.datatype.uuid()
            _id:faker.database.mongodbObjectId()
        }
        products.push(product)
    }
    return products;
    }

    export {
        generateProduct
    }
