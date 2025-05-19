const express = require('express');
const { signup } = require('../controller/user');

const router = express.Router();


router.post("/usersignup", signup)


module.exports = router;