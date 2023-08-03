const express = require('express');
const Salary = require('../models/salary');
const router = express.Router();
const checkAuth = require('../middleawre/check-auth')


router.post('/save',(req,res)=>{

    let newSalary = new Salary(req.body);

    newSalary.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(201).json({
            success:"Posts saved successfully"
            
        }); 
    });

});

router.get('/',(req, res) => 
{
        //find data values using imported profile model     
        let newSalary = new Leave(req.body);
        
        Leave.find()
        
    .exec()
    .then(data => {
        console.log(data);
        const response ={
            count:data.length,
            login:data
        };
        res.status(200).json(response);

    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });

});

//update by id
router.put('/update/:id',checkAuth,(req,res)=>{

    Salary.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,salary)=>{
            if(err){
                
                return res.status(400).json({error:err});
            }

                return res.status(200).json({
                    success:"Updated successfully",salary
                    
                });

        }
                
    );
        
});

//delete by id


router.delete('/delete/:id',checkAuth,(req,res) =>{

    const pId = req.params.id;

    Leave.findByIdAndRemove(pId).exec((err,deletedSalary)=>{

    if(err) 
        return res.status(404).json({
            message:"Deleted unseccesfull",err
            
        });
    
        return res.json({
            message:"Deleted successfully",deletedSalary
        });
    });

});
module.exports = router;