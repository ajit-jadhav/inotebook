const { json } = require("express");
const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { response } = require("express");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser")


const JWT_SECRET = "TestAjit";

//ROUTE 1: Create a User using : POST "/api/auth/createuser". No login required

router.post(
  "/createuser",
  [
    body("name").isLength({ min: 3 }),
    body("password", "Password should have at least 5 characters").isLength({
      min: 5,
    }),
    body("email").isEmail(),
  ],
  async (req, res) => {
    let success = false; 
    //if there are errors return bad req and error
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    //Check if  user with same email present alrady
    try {
      let user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (user) {
        return res
          .status(400)
          .json({ error: "User with same email already present" });
      }
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      // console.log(jwtData)
      success = true
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Something went wrong !");
    }
  }
);

//ROUTE 2:Authenticate a User using : POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    body("email", "Enter valid email").isEmail(),
    body("password", "Can not blank").exists(),
  ],
  async (req, res) => {
    let success=false
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success=false
        return res.status(400).json({ erro: "Please enter valid credentials!" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success=false
        return res.status(400).json({  erro: "Please enter valid credentials!" });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(payload, JWT_SECRET);
      success=true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error.  Something went wrong !");
    }
  }
);

//ROUTE 3:Authenticate a User using : POST "/api/auth/getuser". Login required
router.post("/getuser", fetchuser, async (req, res) => {

  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.status(200).send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error.  Something went wrong !");
  }
}
);

module.exports = router;
