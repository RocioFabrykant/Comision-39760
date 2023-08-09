import {faker} from '@faker-js/faker';
//import faker from '@faker-js/faker'

const generateProduct = async ()=>{
    // const numOfProducts = parseInt(
    //     faker.random.numeric(1,{
    //         bannedDigits:["0"]
    //     })
    // )

    let products = [];
    for(let i = 0; i < 100;i++ ){
        const product = {
            id:faker.database.mongodbObjectId(),
            title:faker.commerce.product(),
            description:faker.commerce.productDescription(),
            code:faker.string.alpha(5),
            category:faker.commerce.department(),
            price:faker.commerce.price(),
            stock:faker.string.numeric(1),
            status:faker.datatype.boolean()
            //id:faker.datatype.uuid()
            
        }
        
        products.push(product)
    }   
        console.log(products)
        return products;
    }

    export {
        generateProduct
    }
