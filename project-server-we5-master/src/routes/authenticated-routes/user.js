const express = require("express");
const router = express.Router();
const buildError = require("../../utils/error-builder");
const User = require("../../models/user");
const upload = require("../../utils/image-uploader");
const auth = require("../../middleware/auth");
const bcrypt = require("bcryptjs");

router.put("/", upload.single("userImage"), async (req, res) => {
  try {
    const currentUser = await User.findOne({ _id: req.body.userId });
    let hashPass;
    if (req.body.password) {
      hashPass = await bcrypt.hash(req.body.password, 12);
    }
    if (req.file) {
      currentUser.profilePictureUrl = req.file.filename;
    }
    currentUser.name = req.body.name;
    if (hashPass) {
      currentUser.password = hashPass;
    }
    if (req.body.gender) {
      currentUser.gender = req.body.gender;
    }
    if (req.body.dateOfBirth) {
      currentUser.dateOfBirth = req.body.dateOfBirth;
    }
    if (req.body.isOnBoarded) {
      currentUser.isOnBoarded = true;
    }
    await currentUser.save();
    res.send(currentUser);
  } catch (error) {
    return buildError(res, 500, error.message);
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.find({ _id: req.params.id });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
