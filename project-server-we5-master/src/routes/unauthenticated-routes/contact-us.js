const express = require("express");
const router = express.Router();
const buildError = require("../../utils/error-builder");
const ContactUs = require("../../models/contact-us");

router.post("/", async (req, res) => {
  try {
    const contactUs = new ContactUs({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      message: req.body.message,
    });
    await contactUs.save();
    res.send("Success");
  } catch (error) {
    return buildError(res, 500, error.message);
  }
});

module.exports = router;
