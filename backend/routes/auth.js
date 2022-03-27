const { json } = require('express');
const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');


//Create a User using : POST "/api/auth/". Doesen't require auth

router.post('/', [
    body('name').isLength({ min: 3}),
    body('password','Password should have at least 5 characters').isLength({ min: 5}),
    body('email').isEmail(),
],(req, res)=>{

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      }).then(user => res.json(user))
      .catch(err=> {
        console.log(err)
        res.json({error: 'Please enter valid value.', message: err.message})
      })
      
})
module.exports = router