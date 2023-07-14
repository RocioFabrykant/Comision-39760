import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport'
export const createHash = password => bcrypt.hashSync(password,bcrypt.genSaltSync(10));
export const isValidPassword = (user,password) => bcrypt.compareSync(password,user.password);
const PRIVATE_KEY = 'coder39760'
export const generateToken = (user)=>{
    const token = jwt.sign({user},PRIVATE_KEY,{expiresIn:'24h'})
    return token;
}
//es un middleware, req, res, next
export const authToken = (req,res,next)=>{
const authToken = req.headers.authorization;
if(!authToken) return res.status(401).send({error:'No Authenticated'})
const token = authToken.split(' ')[1];

jwt.verify(token,PRIVATE_KEY,(error,credentials)=>{
    //verifico con private key creada y callback error por si se genera
    //credentials es lo que tengamos embebido
    if(error) return res.status(403).send({error:'not authorized'})
    req.user = credentials.user;
    next();
})
}

export const passportCall = (strategy)=>{
    return async (req,res,next)=>{
        //intervenimos en el passport.authenticate customizamos el msje
        passport.authenticate(strategy,function(err,user,info){
            if(err)return next (err);
            if(!user){
                return res.status(401).send({error:info.messages?info.messages:info.toString()})
            }
            req.user = user;
            next();
        })(req,res,next)
    }
    
}

export const authorization = (role) =>{
    return async (req,res,next)=>{
        if(req.user.role!= role) return res.status(403).send({error:'Not permissions'})
        next();
    }
}
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



export default __dirname;