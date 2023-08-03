const mongoose=require('mongoose');
const leaveSchema=new mongoose.Schema({
    
    signatureImg:{
        type:String
    
    },
    staffID:{
        type:String,
        required:true
      
    },
    
    dateOfLeave:{
        type:Date,
        required:true

    },
    reason:{
        type:String,
        required:true
    },
    
})

module.exports=mongoose.model('leave',leaveSchema);