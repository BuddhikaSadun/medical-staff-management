const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  profileImg: {
    // data:Buffer,
    //contentType:String
    type: String,
  },

  name: {
    type: String,
  },

  dept: {
    type: String,
    //required : true //value is required(validation technique)
  },

  post: {
    type: String,
  },
  contactNo: {
    type: String,
    //required :true
  },
});

module.exports = mongoose.model("Profile", profileSchema);
