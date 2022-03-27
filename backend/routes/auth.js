const { json } = require('express');
const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { response } = require('express');


//Create a User using : POST "/api/auth/createuser". No login required

router.post('/createuser', [
    body('name').isLength({ min: 3}),
    body('password','Password should have at least 5 characters').isLength({ min: 5}),
    body('email').isEmail(),
], async (req, res)=>{
    //if there are errors return bad req and error 
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Check if user with same email present alrady
    try{

    
    let user = await User.findOne({email: req.body.email})
    console.log(user)
    if(user){
        return res.status(400).json({error:"User with same email already present"})
    }
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      })
    res.json(user)
    }catch(error){
        console.error(error.message);
        res.status(500).send("Something went wrong !")
    }
    
}

)
module.exports = router