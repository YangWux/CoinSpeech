const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User= require('../../models/User');

//GET api/users
//register user
//Access Public
router.post('/',[
  check('name','Name is required').not().isEmpty(),
  check('email',"please include a valid email ").isEmail(),
  check('password','Please enter password with 6 or more char').isLength({min:6})
],
async (req,res) =>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
  }
  //if user exists
  //encrypt password
  //return jsonwebtoken
  const {name,email,password,coins} =  req.body;
  try{
    let user = await User.findOne({email});
    if (user){
      //match the error
      res.status(400).json({errors:[{meg:"User already exists"}]});
    }
    user = new User({
      name,
      email,
      password,
      coins
      
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password,salt);
    await user.save();
    const payload = {
      user:{
        id: user.id
      }
    }
    jwt.sign(payload,
      config.get('jwtSecret'),
      {expiresIn:360000},
      (err,token) =>{
        if(err) throw err;
        res.json({token});
      }
  );
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server error');

  }




});


module.exports = router;