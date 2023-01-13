const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")
const userRouter = require("./routes/userRouter.js")
const postRouter= require("./routes/postRouter.js")


const app = express()

// Parse Application/json
app.use(bodyParser.json({extended:true}));

// Parse Application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

// User routes
app.use("/users",userRouter )

// Post routes
app.use("/posts",postRouter )



//Defining Connection URL & PORT
const CONNECTION_URL = 'mongodb://localhost:27017/blog';
const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>console.log(`Server running on port :${PORT}`))
mongoose.connect(CONNECTION_URL,{useNewUrlParser: true, useUnifiedTopology:true})
.then(()=>console.log('Database connected Succesfully'))
.catch((error)=> console.log(error.message));
