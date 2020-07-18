const express = require('express')
const router = express.Router()
const categories = require('../../Categories')

//Get All One Health Issues Categories
router.get('/', (req, res) => res.json(categories))

//Get One Health Issues Per Categories
router.get('/:category', (req, res) => {
  const found = categories.some(category => category.category === req.params.category)
  if(found) {
      res.json(categories.filter(category => category.category === req.params.category))
  } else {
    res.status(400).json({msg:`${req.params.category} category not found`});
  }
})

module.exports = router;
