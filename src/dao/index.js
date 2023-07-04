import mongoCartDao from './dbManagers/carts.js'
import mongoProductDao from './dbManagers/products.js'

const MongoCartDao = new mongoCartDao();
const MongoProductDao = new mongoProductDao();
//crear las instancias de manejo de datos con archivos

//export const TOYSDAO = config.persistence === 'MEMORY' ? MemoryToyDao: MongoToyDao;
//dependiendo de vble de ambiente persistencia..

export const CARTSDAO = MongoCartDao;
export const PRODUCTSDAO = MongoProductDao;