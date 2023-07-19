import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


import { configurations } from '../config/index.js';


export const GenerateSalt = async ()=>{
    return await bcrypt.genSalt();
}

export const GeneratePassword = async (password,salt)=>{
    return await bcrypt.hash(password,salt);
}

export const ValidatePassword = async ( enteredPassword,savedPassword,salt)=>{
    return (await GeneratePassword(enteredPassword,salt)===savedPassword);
}

export const GenerateSignature = async (payload) => {
    try {
      return await jwt.sign(payload, configurations.APP_SECRET, { expiresIn: "30d" });
    } catch (error) {
      console.log(error);
      return error;
    }
  };

export const validateSignature = async (req) => {
    try{
        const signature = req.get("Authorization");
        console.log(signature);
        const payload = await jwt.verify(signature.split(" ")[1], configurations.APP_SECRET);
        req.user = payload;
        return true;
    }catch(error){
        console.log(error);
        return false;
    }
}

export const FormateData = (data)=>{
    if(data){
        return { data };
    }else{
        throw new Error("Data Not Found");
    }
}