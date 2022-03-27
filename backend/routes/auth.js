const { json } = require('express');
const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { response } = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'TestAjit';

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
    const salt = await bcrypt.genSalt(10)
    const secPass = await bcrypt.hash(req.body.password, salt)
    //Check if  user with same email present alrady
    try{

    
    let user = await User.findOne({email: req.body.email})
    console.log(user)
    if(user){
        return res.status(400).json({error:"User with same email already present"})
    }
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })

    const data = {
        user:{
            id: user.id
        }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    // console.log(jwtData)

    res.json({authToken})


    }catch(error){
        console.error(error.message);
        res.status(500).send("Something went wrong !")
    }
    
}

)


//Authenticate a User using : POST "/api/auth/login". No login required
router.post('/login', [ 
    body('email', 'Enter valid email').isEmail(),
    body('password', 'Can not blank').exists(),
], async (req, res)=>{ 

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({erro: "Please enter valid credentials!"})
        }

        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            return res.status(400).json({erro: "Please enter valid credentials!"})
        }

        const payload = {
            user:{
                id:user.id  
            }
        }
        const authToken = jwt.sign(payload, JWT_SECRET);
        res.json({authToken})

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error.  Something went wrong !")
    }
}
)
module.exports = router