const express = require('express');
const { signup, signin } = require('../controller/user');

const router = express.Router();


router.post("/usersignup", signup)
router.post("/usersignin", signin)


module.exports = router;