//import express
const express = require('express');
const { signUp, login } = require('../controllers/AuthController'); 
const { userVerification } = require('../middlewares/AuthMiddleware');
//initialize router
const router = express.Router();


//post register
router.post('/signup',signUp);

//get login
router.post('/login',login);

router.post('/',userVerification);


//get watchlist

//get watched list

//delete watchlist 

//delete watched list

//user can give rating...(optional) // will do according to time available

//edit account details

//delete account

module.exports = router;