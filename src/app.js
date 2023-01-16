const express =require("express");
const path=require("path");
require("./db/conn");
const user = require("./models/usermessage");
const hbs=require("hbs");
const { Server } = require("http");
const { db, collection } = require("./models/usermessage");

const app = express();
var http = require('http').createServer(app)
var io= require('socket.io')(http)
const port =process.env.PORT || 3000;


//setting the path
const staticpath= path.join(__dirname,  "../public");
const templatepath= path.join(__dirname,  "../templates/views");
const partialpath= path.join(__dirname,  "../templates/partials");

//console.log(path.join(__dirname, "../public"));
app.use('/css',express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use('/js',express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use('/jq',express.static(path.join(__dirname, "../node_modules/jquery/dist")));
app.use(express.urlencoded({extended:false}))
app.use(express.static(staticpath))
app.set("view engine","hbs");
app.set("views",templatepath);
hbs.registerPartials(partialpath);

//routing
//app.get(path,callback)
app.get("/",(req,res)=>{
    res.render("index");
})

app.get("/chat",(req,res)=>{
    res.render("chat");
})



app.post("/contact",async(req,res) => {
   var name= req.body.name;
   var email=req.body.email;
   var phone= req.body.phone;
   var message=req.body.message;

   var data={
    "name": name,
    "email": email,
    "phone": phone,
    "message":message
   }

   db.collection('users').insertOne(data,(err,collection)=>{
    if(err){
        throw err;
    }
    console.log("Record inserted successfully");
   });

   return res.redirect('contact.hbs');

})

//server create
app.listen(port, ()=>{
    console.log('server is running at port no ${port}');
})