const express = require('express')
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')
let Sale = require('../../models/sale')
const router = express.Router()
const upload = require("../../utils/image-uploader");

router.get('/', auth, async (req, res) => {
  try {
    const sales = await Sale.find()
    res.send(sales)
  } catch (err) {
    res.status(500).send('Server error')
  }
})

router.get('/:id', async (req, res) => {
  try {
    const sale = await Sale.find({ _id: req.params.id });
    res.send(sale)
  } catch (err) {
    res.status(500).send('Server error')
  }
})

router.post(
  '/',upload.single("feedImage"),
  [
    check('title', 'Title is required')
      .not()
      .isEmpty(),
    check('phoneNumber', 'Phone number must be 10 digits').isLength({
      min: 10,
      max: 10
    }),
    check('petType', 'Pet is not a defined field')
      .trim()
      .toUpperCase()
      .isIn(['DOG', 'CAT', 'FISH', 'HORSE'])
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
      }

    
      const newsale = new Sale({
        user: req.headers.userId,
        petType: req.body.petType,
        breed: req.body.breed,
        color: req.body.color,
        age: req.body.age,
        description: req.body.description,
        title: req.body.title,
        location: req.body.location,
        price: req.body.price,
        phoneNumber: req.body.phoneNumber,
      });
      if (req.file) {
        newsale.photoURL = req.file.filename;
      }
      const result = await newsale.save()

      res.send(result)
    } catch (err) {
      res.status(500).send(err.message)
    }
  }
)


router.post(
  '/:saleId',upload.single("feedImage"),
  [
    check('title', 'Title is required')
      .not()
      .isEmpty(),
    check('phoneNumber', 'Phone number must be 10 digits').isLength({
      min: 10,
      max: 10
    }),
    check('petType', 'Pet is not a defined field')
      .trim()
      .toUpperCase()
      .isIn(['DOG', 'CAT', 'FISH', 'HORSE'])
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
      }

    
      const newsale = new Sale({
        user: req.headers.userId,
        petType: req.body.petType,
        breed: req.body.breed,
        color: req.body.color,
        age: req.body.age,
        description: req.body.description,
        title: req.body.title,
        location: req.body.location,
        price: req.body.price,
        phoneNumber: req.body.phoneNumber,
      });
      if (req.file) {
        newsale.photoURL = req.file.filename;
      }
      const result = await Sale.findOneAndUpdate({ _id: req.params.saleId }, newsale);
      res.send("Success");

      res.send(result)
    } catch (err) {
      res.status(500).send(err.message)
    }
  }
)

router.delete('/:saleId', async (req, res) => {
  try {
    await Sale.remove({ _id: req.params.saleId });
    res.send("Success");
  } catch (err) {
    res.status(500).send('Server error')
  }
})

router.put('/', async (req, res) => {
  try {
    const sale = Sale.findById(req.body.id)
    if (!sale) {
      return res.status(404).json({ msg: 'Sale not found' })
    }

    sale.petType = req.body.petType
    sale.breed = req.body.breed
    sale.color = req.body.color
    sale.age = req.body.age
    sale.description = req.body.description
    sale.title = req.body.title
    sale.location = req.body.location
    sale.price = req.body.price
    sale.phoneNumber = req.body.phoneNumber
    sale.photoURL = req.body.photoURL

    await sale.save()
    res.send(sale)
  } catch (err) {
    res.status(500).send('Server error')
  }
})

module.exports = router
