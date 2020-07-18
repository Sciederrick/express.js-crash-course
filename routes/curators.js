const express = require('express')
const uuid = require('uuid')
const router = express.Router()
const curators = require('../Curators')

//Get All Curators
router.get('/', (req, res) => res.json(curators))

//Get One Curator
router.get('/:id', (req, res) => {
  const found = curators.some(curator => curator.id === parseInt(req.params.id))
  if(found) {
    res.json(curators.filter(curator => curator.id === parseInt(req.params.id)))
  } else {
    res.status(400).json({msg:`There is no member in this platform with the id ${req.params.id}`});
  }
})

//Add member
router.post('/', (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    institution: req.body.institution,
    course: req.body.course
  }

  if(!newMember.name||!newMember.institution||!newMember.course){
    res.status(400).json({ msg: 'Please include name, institution and course'});
  }

  curators.push(newMember)
  // res.json(curators)
  res.redirect('/')
})

//Update member
router.put('/:id', (req, res) => {
  const found = curators.some(curator => curator.id === parseInt(req.params.id))
  if(found) {
    const updatedMember = req.body
    curators.forEach(curator => {
      if(curator.id === parseInt(req.params.id)) {
        curator.name = updatedMember.name ? updatedMember.name : curator.name
        curator.institution = updatedMember.institution ? updatedMember.institution : curator.institution
        curator.course = updatedMember.course ? updatedMember.course : curator.course

        res.json({ msg: 'Curator updated', curator})
      }
    })
  } else {
    res.status(400).json({msg:`No curator with the id of ${req.params.id}`});
  }
})

//Delete member
router.delete('/:id', (req, res) => {
  const found = curators.some(curator => curator.id === parseInt(req.params.id))
  if(found) {
    res.json({
      msg: 'Curator deleted',
      curators: curators.filter(curator => curator.id !== parseInt(req.params.id))
    })
  } else {
    res.status(400).json({msg:`There is no curator in this platform with the id ${req.params.id}`});
  }
})

module.exports = router;
