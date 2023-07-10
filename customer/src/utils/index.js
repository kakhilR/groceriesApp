import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


import { APP_SECRET } from '../config';



module.exports.GenerateSalt = async ()=>{
    return await bcrypt.genSalt();
}

module.exports.GeneratePassword = async (password,salt)=>{
    return await bcrypt.hash(password,salt);
}

module.exports.ValidatePassword = async ( enteredPassword,savedPassword,salt)=>{
    return (await this.GeneratePassword(enteredPassword,salt)===savedPassword);
}

module.exports.ValidateSignature = async (req) => {
    try{
        const signature = req.get("Authorization");
        console.log(signature);
        const payload = await jwt.verify(sugnature.split(" ")[1],APP_SECRET);
        req.user = payload;
        return true;
    }catch(error){
        console.log(error);
        return false;
    }
}

module.exports.FormateData = (data)=>{
    if(data){
        return { data };
    }else{
        throw new Error("Data Not Found");
    }
}