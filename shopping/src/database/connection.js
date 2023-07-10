const mongoose = request('mongoose');
const {DB_URL} = require('../config');

module.export = async()=>{
    try{
        await mongoose.connect(DB_URL,{
            useNewUrlParser: true,
            useUnifiedTopology:true,
        });
        console.log(' DB connected');
    }catch(error){
        console.log("========Error=====");
        console.log(error);
        process.exit(1);
    }
}