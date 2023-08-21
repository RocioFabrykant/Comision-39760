import {getUsers as getUsersService,
    getUserByEmail as getUserService,
    createUser as saveUserService,
    resetPassword as resetPasswordService,
    newPassword as newPasswordService} from '../services/users.service.js'
    import { generateTokenReset,authTokenReset,createHash,isValidPassword } from '../utils.js';
const getUsers = async (req,res) =>{
    try {

        const userResult = await getUsersService();
            
        res.status(200).send({
            status: 'success',
            payload: userResult
        });

        
    } catch (error) {
        res.status(500).send({
            status: 'error',
            error
        });
    }
}

const getUser = async (req,res) =>{
    
    try {
        const email = req.params.email;
        const elUser = await getUserService(email);
        if(!elUser){
        
            return res.status(404).send({status:'error',message:'user not found'})
        }
        res.status(200).send({
            status: 'success',
            payload: elUser
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            error
        });
    }
}

const saveUser = async (req,res)=>{
    const user = req.body;


    if (!user.first_name || !user.last_name || !user.email || !user.age || !user.password) {
        return res.status(400).send({
            status: 'error',
            error: 'incomplete values'
        });
    }
    try {
        const rdo = await saveUserService(user);

        res.status(200).send({
            status: 'success',
            add: user,
            payload: rdo
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            error
        });
    }


}

const resetPassword = async (req,res)=>{
    const email = req.body.email;

    if(!email){
        return res.status(400).send({
            status: 'error',
            error: 'incomplete value'
        });
    }
    const elUser = await getUserService(email);
    if(!elUser){
    
        return res.status(404).send({status:'error',message:'user not found'})
    }

    try {
        const rdo = await resetPasswordService(email);
        console.log(typeof(rdo))
        res.status(200).send({
            status: 'success',
            add: email,
            payload: rdo
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 'error',
            error
        });
    }


}

const newPassword = async (req,res)=>{
    const token = req.params.tkn;
    console.log(token)
    //authTokenReset(token)
    //const email = req.email;
    const password = req.body.password;
    console.log(password)
    if(!password){
        return res.status(400).send({
            status: 'error',
            error: 'incomplete value'
        });
    }

    try {
        //const rdo = await newPasswordService(email,password);

        res.status(200).send({
            status: 'success',
            //add: email,
            //payload: rdo
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 'error',
            error
        });
    }
}


export {
    getUsers,
    getUser,
    saveUser,
    resetPassword,
    newPassword
}