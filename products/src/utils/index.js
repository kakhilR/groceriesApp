import amqplib from "amqplib";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { configurations } from "../config/index.js";

//Utility functions
export const GenerateSalt = async () => {
  return await bcrypt.genSalt();
};

export const GeneratePassword = async (password, salt) => {
  return await bcrypt.hash(password, salt);
};

export const ValidatePassword = async (
  enteredPassword,
  savedPassword,
  salt
) => {
  return (await this.GeneratePassword(enteredPassword, salt)) === savedPassword;
};

export const GenerateSignature = async (payload) => {
  try {
    return await jwt.sign(payload, configurations.APP_SECRET, { expiresIn: "30d" });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const ValidateSignature = async (req) => {
  try {
    const signature = req.get("Authorization");
    console.log(signature);
    const payload = await jwt.verify(signature.split(" ")[1], configurations.APP_SECRET);
    req.user = payload;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const FormateData = (data) => {
  if (data) {
    return { data };
  } else {
    throw new Error("Data Not found!");
  }
};


// export const PublishUserEvents= async (payload)=>{
//   axios.post('http://localhost:8000/customer/app-events',{
//     payload
//   })
// }

// export const PublishShoppingEvents= async (payload)=>{
//   axios.post('http://localhost:8000/shopping/app-events',{
//     payload
//   })
// }


// message broker

// create chanel
export const createChannel = async () =>{
  try{
    const connection = await amqplib.connect(configurations.MESSAGE_BROKER_URL);
    const channel = await connection.createChannel();
    await channel.assertExchange(configurations.EXCHANGE_NAME,'direct',false);
    return channel;
  }catch(e){
    throw e;
  }
}


export const publishMessage = async (channel, binding_key, message) => {
  try{
    await channel.publish(configurations.EXCHANGE_NAME, binding_key, Buffer.from(message));
  }catch(e){
    throw e;
  }
}


export const subscribeMessage = async (channel, service) =>{
  try{
    const appQueue = await channel.assertQueue(configurations.QUEUE_NAME);
    channel.bindQueue(appQueue.queue, configurations.EXCHANGE_NAME, binding_key);

    channel.consume(appQueue.queue,data =>{
      console.log('received data');
      console.log(data.content.toString());
      channel.ack(data);
    })
  }catch(e){
    throw e;
  }
}
