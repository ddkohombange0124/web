const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

//creating a db
 mongoose.connect('mongodb://localhost:27017/userdetails',{
    //useCreateIndex:true,
    //useNewUrlParser:true,
    //useUnifielsTopology:true
}).then(() => {
    console.log("connection successful");
}).catch((error) => {
    console.log(error);

})
