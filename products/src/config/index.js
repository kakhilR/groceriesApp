import dotEnv from 'dotenv';
dotEnv.config();

if(process.env.NODE_ENV !== "prod"){
    const configFile = `./.env.${process.env.NODE_ENV}`;
    dotEnv.config({path:configFile});
}else{
    dotEnv.config();
}


const configurations = {
    PORT: process.env.PORT,
    DB_URL:process.env.MONGODB_URI,
    APP_SECRET:process.env.APP_SECRET,
    BASE_URL:process.env.BASE_URL,
    EXCHANGE_NAME:process.env.EXCHANGE_NAME,
    CUSTOMER_SERVICE: "customer_service",
    SHOPPING_SERVICE: "shopping_service",

}

export { configurations };