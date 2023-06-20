import {Router} from 'express'
import { authToken,generateToken, passportCall,isValidPassword,createHash,authorization } from '../utils.js';
import Users from '../dao/dbManagers/users.js';
import passport from 'passport';
const router = Router();

const usersManager = new Users();
router.post('/register',async (req,res)=>{
    try{
        const {first_name,last_name,email,age,role,password} = req.body;
        console.log(first_name,last_name,email,age,role,password)
        if (!first_name || !last_name || !role || !email || !password)
        return res.status(400).send('incomplete values');
        const exists = await usersManager.getByEmail(email);
        console.log(exists)
        if(exists) return res.status(401).send({status:'error',error:'usuario ya existe'})
        const hashedPassword = createHash(password);
        const user = {
            ...req.body
        }

        user.password = hashedPassword;
        console.log(user);
        const result = await usersManager.save(user);
        const accessToken = generateToken(user)
        return res.status(200).send({status:'success',access_token:accessToken,user:result});
    }catch(error){
        return res.status(500).send({status:'error',error:error})
    }
})

router.post('/login', async(req,res)=>{
    try{    
    const {email,password} = req.body;
    const user = await usersManager.getByEmail(email); 
    if(!user) return res.status(401).send({status:'error', error:'Invalid Credentials'});
    const comparePassword = isValidPassword(user, password);
    if(!comparePassword) {
        return res.status(401).send({status:'error', error:'Invalid Credentials'});
    }
    const accessToken = generateToken(user)
    res.cookie('coderCookieToken',accessToken,{maxAge:60*60*1000}).send({status:'success'})

}catch(error){
    return res.status(500).send({status:'error',error:error})
}

})

router.get('/current',passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.send({status:'success',payload:req.user})
})

// router.get('/current-custom',passportCall('jwt'),authorization('user'),(req,res)=>{
//     res.send({status:'success',payload:req.user})
// })

export default router;