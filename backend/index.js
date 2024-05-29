require('dotenv').config();
const express=require("express")
const cors=require("cors")
const bodyparser=require("body-parser")
const { default: mongoose, connect } = require("mongoose")
const app=express();
const auth = require('./routes/auth');
const {Content}= require('./schema')
const port= process.env.PORT|| 4000;
const ConnectionString=process.env.MONGODB_URI;
app.use(bodyparser.urlencoded({
    extended:true
}))
app.use(bodyparser.json())

// console.log(process.env.MONGODB_URI);

app.use(cors({
    origin: '*'
}));


mongoose.connect(ConnectionString)
    .then(()=>{
        console.log("Mongodb connected successfully !!")
    })
    .catch((err)=>{
        console.log(err)
    })

    //auth api's
app.use('/api/auth', auth);

app.get("/",(req,res)=>{
    res.send("API IS WORKING")
})

app.get("/jobs",async(req,res)=>{
    await Content.find()
        .then(found=>res.json(found))
})

app.post("/store",async(req,res)=>{
     let {title,work,name,url,location,link,des,skills,userId}=req.body
     console.log(req.body)
    const newData = new Content({
        title,work,name,url,location,link,des,skills,userId
      });
     
     await newData.save()
     return res.json("job posted succesfully");
})
app.delete('/:id', async(req, res) => {
    await Content.findByIdAndDelete(req.params.id);
    return res.status(200).json("deleted successful")
});


app.listen(port,()=>console.log(`Server started successfully in the port of ${port}`));
