import {
    Router
} from 'express';
import {
    passportCall,
    authorization
} from '../utils.js'
import {
    getProducts,
    getProduct,
    saveProduct,
    updateProduct,
    mockingProducts,
    deleteProduct
} from '../controllers/products.controller.js'
import toAsyncRouter from 'async-express-decorator';

const router = toAsyncRouter(Router());


router.get('/', getProducts)

router.get('/mocking-products', mockingProducts)

router.get('/:pid', getProduct)

router.post('/', passportCall('jwt'), authorization('premium', 'admin'), saveProduct)

router.put('/:pid', passportCall('jwt'), authorization('admin'), updateProduct)
router.delete('/:pid', deleteProduct)


export default router;