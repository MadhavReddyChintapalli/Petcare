const express = require("express");
const router = express.Router();
const Feeds = require("../../models/feeds");
const buildError = require("../../utils/error-builder");
const upload = require("../../utils/image-uploader");

router.get("/", async (req, res) => {
  try {
    const records = await Feeds.find({});
    res.send(records);
  } catch (error) {
    buildError(res, 500, error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const records = await Feeds.find({ _id: req.params.id });
    res.send(records);
  } catch (error) {
    buildError(res, 500, error.message);
  }
});

router.post("/", upload.single("feedImage"), async (req, res) => {
  try {
    const currentFeed = new Feeds();
    if (req.file) {
      currentFeed.imageUrl = req.file.filename;
    }
    currentFeed.userId = req.headers.userId;
    currentFeed.title = req.body.title;
    currentFeed.description = req.body.description;
    await currentFeed.save();
    res.send("Success");
  } catch (error) {
    buildError(res, 500, error.message);
  }
});

router.put("/:postId", upload.single("feedImage"), async (req, res) => {
  try {
    const latestObj = {};
    if (req.file) {
      latestObj.imageUrl = req.file.filename;
    }
    if (req.body.title) {
      latestObj.title = req.body.title;
    }
    if (req.body.description) {
      latestObj.description = req.body.description;
    }
    await Feeds.findOneAndUpdate({ _id: req.params.postId }, latestObj);
    res.send("Success");
  } catch (error) {
    buildError(res, 500, error.message);
  }
});

router.delete("/:postId", async (req, res) => {
  try {
    await Feeds.remove({ _id: req.params.postId });
    res.send("Success");
  } catch (error) {
    buildError(res, 500, error.message);
  }
});

router.put("/mark-spam/:postId", async (req, res) => {
  try {
    if (!req.headers.isAdmin) {
      buildError(res, 400, "Unauthorized");
    }
    await Feeds.findOneAndUpdate(
      { _id: req.params.postId },
      { isSpam: req.body.isSpam }
    );
    res.send("Success");
  } catch (error) {
    buildError(res, 500, error.message);
  }
});

module.exports = router;
