const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/loginUser", async (req, res) => {
  try {
    const docs = await User.find({
      email: req.body.email,
      password: req.body.password,
    })
      .select("id email password")
      .exec();

    if (docs.length === 0) {
      return res.status(400).json({
        message: "User not available",
      });
    }

    const response = {
      count: docs.length,
      id: docs.id,
      user: docs.map((doc) => {
        return {
          id: doc.id,
          email: doc.email,
          password: doc.password,
        };
      }),
    };

    res.status(200).json({ message: "success", data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: err,
    });
  }
});

router.post("/createUser", async (req, res) => {
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      position: req.body.position,
    });

    const result = await user.save();

    res.status(201).json({
      success: true,
      message: `Created user successfully as ${user.position}`,
      createdUser: {
        id: result.id,
        email: result.email,
        password: result.password,
        position: result.position,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

module.exports = router;
