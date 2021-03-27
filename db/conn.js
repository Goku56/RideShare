const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/Auth",{
    useCreateIndex:true,
    useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>console.log(`connection is successfull...`))
.catch((e)=>console.log(`connection is failed due to error: ${e}`));

