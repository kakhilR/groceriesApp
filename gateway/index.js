import cors from 'cors';
import express from 'express';
import proxy from 'express-http-proxy';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/customer',proxy('http://localhost:8001'))
app.use('/shopping',proxy('http://localhost:8003'))
app.use('/products',proxy('http://localhost:8002'))

app.use('/', (req,res,next)=>{
    return res.status(200).json("hello from products")
})

app.listen(8000, ()=>{
    console.log('listening on 8000')
})