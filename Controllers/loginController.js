import { supabase } from '../db/connectSupaBase.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export async function loginController(req,res){
    const {username,password} = req.body

    try{
        const {data:users , error:fetchError} = await supabase
        .from('users')
        .select('*')
        .eq('username',username);

        if(fetchError) throw fetchError;

        if(!users || users.length === 0){
            return res.status(400).json({error:"User not found"});
        }

        const user = users[0];
        

        const isPasswordValid = await bcrypt.compare(password,user.hash_password)
        if(!isPasswordValid){
            return res.status(401).json({error:'Invalid password'})
        }


        const token = jwt.sign(
            {
                id:user.id,
                username:user.username,
                role:user.role
            },
            process.env.JWT_SECRET,
            {expiresIn: "1d"}

        );
        res.json({token});

    }catch(err){
        console.error('login error',err.message)
    }
}