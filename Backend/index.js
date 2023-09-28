const express = require('express');
const port=5000;
const app=express();
//a middleware wihich allow the client request
const cors=require('cors');
const mongoose= require('mongoose');
const {MONGODB_URL} = require('./config');


mongoose.connect(MONGODB_URL);
mongoose.connection.on('connected',()=>{
    console.log("DB connected");
})
mongoose.connection.on('error',(error)=>{
    console.log("some error occur");
})

require('./models/sale-model')
require('./models/user-model')

app.use(cors());
app.use(express.json())
// require('./models/user-model')
app.use(require('./routes/sales_route'))
app.use(require('./routes/user-routes'))




app.listen(port ,()=>{
    console.log("server started")
})