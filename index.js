import express from 'express';
import dotenv from './configs/dotenv.js';
import db from './configs/db.js';
import router from './router/index.js';
import cookieParser from 'cookie-parser';
import clientrout from './router/clientrout.js';

const port=dotenv.PORT || 3259;
const app=express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.set('view engine','ejs');
app.use(express.static('public'));

app.use('/api',router);
app.use('/',clientrout);

app.listen(port,(err)=>{
    if(err){
        console.log(err);       
    }else{
        console.log(`Server is running here: http://localhost:${port}`);
    }
});