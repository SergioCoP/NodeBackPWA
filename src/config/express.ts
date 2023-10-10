import bodyParser from 'body-parser';
import express from 'express';
const cors = require('cors');
import path from 'path'
import { userRouter } from '../modules/user/adapters/user.controller';


const app = express();

app.use(express.static(path.join(__dirname,'../public')))

app.use(
    cors({
        origin: '*'
    })
);

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json({limit:'20mb'})); //limite de mb por peticion
app.get('/',(req,res)=>{
    res.send('Server running...');
});

//Routes
app.use('api/user',userRouter)

export default app;