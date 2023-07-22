import dotEnv from 'dotenv';
dotEnv.config();

if(process.env.NODE_ENV !== 'prod'){
    const configFile = `./.env.${process.env.NODE_ENV}`;
    dotEnv.config({path: configFile});
} else{
    dotEnv.config();
}

const configurations = {
    PORT: process.env.PORT,
    DB_URL: process.env.MONGODB_URI,
    APP_SECRET: process.env.APP_SECRET,
    MESSAGE_BROKER_URL:process.env.MESSAGE_BROKER_URL,
    EXCHANGE_NAME:'ONLINE_SHOPPING',
    CUSTOMER_BINDING_KEY: 'CUSTOMER_SERVICE',
    QUEUE_NAME:'CUSTOMER_QUEUE'
}

export { configurations };

