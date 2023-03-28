class ProductManager{
    constructor(){
        this.products = [];
    }
    addProduct = (title,description,price,thumbnail,code,stock) =>{
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        
        if(title != "" && description != "" && price != "" && thumbnail != "" && code != "" && stock != ""){
            if(this.products.length === 0){
                product.id = 1;
            }else{
                product.id = this.products[this.products.length - 1].id+1;
                if(this.products.find(product => product.code === code)){
                    console.log('el code ya existe');
                    return;
                }
            }
            this.products.push(product);
        

        }else{
            console.log('completar todos los campos obligatorios');
        }
    }

    getProducts = ()=>{
        return this.products;
    }

    getProductbyId = (id) =>{
        const productoid = this.products.findIndex(producto => producto.id === id )
        if(productoid != -1){
            console.log(this.products[productoid]);
        }else{
            console.log('Not found');
        }
    }
}

const producto = new ProductManager();
producto.addProduct('peine','para peinar',30,'direccionfoto',123,30);
producto.addProduct('tijera','para cortar',30,'foto','',20);
producto.addProduct('cuter','para cortar',20,'dire',123,10);
//producto.addProduct('Regla','para medir',25,'dire',12,10);
producto.getProductbyId(1);
console.log(producto.getProducts());