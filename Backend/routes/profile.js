const express = require("express");
const Profile = require("../models/profile.js");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

const checkAuth = require("../middleawre/check-auth");
//const upload =multer({dest:'./uploads/'});

//configure the way of storing file

const storage = multer.diskStorage({
  // destination: function(req, file, cb){
  //   cb(null,'./uploads/');
  //},
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

// setting to accept files with extension jpeg/png only
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

//upload varibale to define localstorage of file

const upload = multer({
  dest: "./uploads/",
  //storage:storage,
  limits: { fileSize: 1024 * 1024 * 5 }, //size limit-less than 5MB
  fileFilter: fileFilter,
});

//Routes

router.post("/save", upload.single("profileImg"), (req, res, next) => {
  console.log(req.file);
  const profile = new Profile({
    // _id: new mongoose.Types.(),
    name: req.body.name,
    post: req.body.post,
    dept: req.body.dept,
    contactNo: req.body.contactNo,
    //  profileImg: req.file.path
  });

  profile
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        success: true,
        message: "Created profile successfully",
        createdProfile: {
          name: result.name,
          post: req.body.post,
          dept: req.body.dept,
          contactNo: req.body.contactNo,
          //  profileImg: req.file.path,
          _id: req.body._id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

//retrieve a  single record by id
router.get("get/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const profile = await Profile.findById(id).exec();
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }
    res.status(200).json({ data: profile, success: "successfully retrieved" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//retreive all profile details

router.get("/get", (req, res, next) => {
  Profile.find()
    .select("id name profileImg post dept contactNo")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        profile: docs.map((doc) => {
          return {
            id: doc._id,
            name: doc.name,
            post: doc.post,
            dept: doc.dept,
            contactNo: doc.contactNo,
            profileImg: doc.profileImg,
          };
        }),
      };
      //   if (docs.length >= 0) {
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

//update by id
router.put("/update/:id", (req, res) => {
  Profile.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, profile) => {
      if (err) {
        return res.status(400).json({ error: err });
      }

      return res.status(200).json({
        success: "Updated successfully",
      });
    }
  );
});

//delete by id

router.delete("/delete/:id", (req, res) => {
  const pId = req.params.id;

  Profile.findByIdAndRemove(pId).exec((err, deletedProfile) => {
    if (err)
      return res.status(404).json({
        message: "Deleted unseccesfull",
        err,
      });

    return res.json({
      message: "Deleted successfully",
      deletedProfile,
    });
  });
});

module.exports = router;
