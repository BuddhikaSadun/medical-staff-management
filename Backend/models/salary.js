const mongoose = require('mongoose');


const salarySchema= new mongoose.Schema({

    staffID:{
        type:Number,
        required:true,
    },
    post:{
        type:String,
        required:true,
    },
    basic:{
        type:Number,
        required:true,
    },
    allowance:{
        type:Number,
        required:true,
    },
    salDeduct:
    {
        type:String,
        required:false,
    },
    DeductReason:
    {
        type:String,
        required:false,
    }

})

module.exports=mongoose.model('salary',salarySchema);