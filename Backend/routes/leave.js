const express = require('express');
const Leave = require('../models/leave');
const router = express.Router();

const mongoose = require("mongoose");
const multer =require('multer');
const checkAuth=require('../middleawre/check-auth');
const {authEmp,authNum} = require('../middleawre/role-auth');



// setting to accept files with extension jpeg/png only 
const fileFilter = (req,file,cb) =>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true);
    }else{
        cb(null,false);
    }
};


//upload varibale to define localstorage of file 

const upload = multer({
    dest:'./uploads/',
    //storage:storage,
    limits:{fileSize:1024 * 1024 * 5},      //size limit-less than 5MB   
    fileFilter:fileFilter
});  



router.post("/save", upload.single('signatureImg'),(req, res, next) => {
    console.log(req.file);
    const leave = new Leave({
      
       // _id: new mongoose.Types.ObjectId(),
      staffID: req.body.staffID,
      dateOfLeave: req.body.dateOfLeave,
      reason:req.body.reason,
      signatureImg: req.file.path

    });
    leave
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Created Leave successfully",
          createdProfile: {

            staffID: req.body.staffID,
            dateOfLeave: req.body.dateOfLeave,
            reason:req.body.reason,
            signatureImg: req.file.path, 

            _id: result._id,
              
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

 router.get("/:number",authNum,(req,res,next) =>{

  const no = req.params.number;
  return res.json(`auth sucessful  ${no}` );
 }) 

//retreive all leave details

router.get("/" ,authEmp(["admin"]),(req, res, next) => {
    Leave.find()
      .select("name email signatureImg")
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          products: docs.map(doc => {
            return {
              _id: doc._id,  
              
              staffID: doc.staffID,
              dateOfLeave: doc.dateOfLeave,
              reason:doc.reason,
              signatureImg: doc.signatureImg, 
              
              
            };
          })
        };
        //   if (docs.length >= 0) {
        res.status(200).json(response);
       
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });



//update by id
router.put('/update/:id',checkAuth,(req,res)=>{

    Leave.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,login)=>{
            if(err){
                
                return res.status(400).json({error:err});
            }

                return res.status(200).json({
                    success:"Updated successfully",login
                    
                });

        }
                
    );
        
});

//delete by id


router.delete('/delete/:id',checkAuth,(req,res) =>{

    const pId = req.params.id;

    Leave.findByIdAndRemove(pId).exec((err,deletedLeave)=>{

    if(err) 
        return res.status(404).json({
            message:"Deleted unseccesfull",err
            
        });
    
        return res.json({
            message:"Deleted successfully",deletedLeave
        });
    });

});
module.exports = router;