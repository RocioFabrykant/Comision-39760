//
async function addToCart(element) {
    let isCartExist = localStorage.getItem('cartId') || 0;
    const product = element.closest(".product");
    const pid = product.querySelector("#product_id").textContent;
    isCartExist = localStorage.getItem('cartId') || null;

    if (isCartExist === null) {

        const newCart = await CreateCart();
        localStorage.setItem('cartId', newCart.payload);
        isCartExist = localStorage.getItem('cartId')
        const href = `/addtocart/${isCartExist}/product/${pid}`
    }
    await fetch(`/addtocart/${isCartExist}/product/${pid}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `${document.cookie['coderCookieToken']}`
        }
    }).then(result => {
        return result.status;
    });

} 

async function CreateCart () {
   const rs= await fetch('/api/carts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Cookie': `${document.cookie['coderCookieToken']}`
        }
    })
    const response = await rs.json();
    return response

    
}