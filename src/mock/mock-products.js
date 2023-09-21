import {
    faker
} from '@faker-js/faker';
//import faker from '@faker-js/faker';

const generateProduct = async () => {

    let products = [];
    for (let i = 0; i < 100; i++) {
        const product = {
            id: faker.database.mongodbObjectId(),
            title: faker.commerce.product(),
            description: faker.commerce.productDescription(),
            code: faker.string.alpha(5),
            category: faker.commerce.department(),
            price: faker.commerce.price(),
            stock: faker.string.numeric(1),
            status: faker.datatype.boolean()

        }

        products.push(product)
    }
    return products;
}

export {
    generateProduct
}