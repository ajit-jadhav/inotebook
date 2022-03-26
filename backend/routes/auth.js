const { json } = require('express');
const express = require('express');
const User = require('../models/User');
const router = express.Router();


//Create a User using : POST "/api/auth/". Doesen't require auth

router.post('/', (req, res)=>{
    console.log(req.body);
    const user  = User(req.body);
    user.save();
    res.json([])
})
module.exports = router