//extra info - cors vs csp

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

//import multer
var multer = require("multer");

//import routes

const profileRoutes = require("./routes/profile");
const salaryRoutes = require("./routes/salary");
const leaveRoutes = require("./routes/leave");
const userRoutes = require("./routes/user");
const basicUser = require("./routes/basicAuth");

app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/profile", profileRoutes);
app.use("/salary", salaryRoutes);
app.use("/leave", leaveRoutes);
app.use("/user", userRoutes);
app.use("/basicUser", basicUser);

const port = 8000;

const url =
  "mongodb+srv://buddhikaSadun:sadun123@clusterdemo.aqzosav.mongodb.net/hospital_db?retryWrites=true&w=majority";

app.get("/", function (req, res) {
  res.send("<html><body><h1>Hello World</h1></body></html>");
});

//restrict the access of headers (adjust the response we receive)
/*
app.use((req,res) =>{

    //res.header('Access-Control-Allow-Origin','*'); //can restict the client writing a url in second field  
    //res.header("Access-Control-Allow-Headers","Origins,X-Requested-With,Content-Type,Acept,Authorization");
    if(res.header=='OPTIONS'){
        res.header("Access-Control-Allow-Headers","PUT,POST,PATCH,DELETE,GET");
        return res.status(200).json({});
    }
});
*/

//connect the database
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected!!");
  })
  .catch((err) => {
    console.log(err);
  });

mongoose.Promise = global.Promise;

app.listen(port, () => {
  console.log(`Backend is running on: ${port}`);
});
