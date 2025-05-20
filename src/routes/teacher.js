const express = require('express');
const {  signupTeacher } = require('../controller/teacher');

const router = express.Router();


router.post("/teachersignup", signupTeacher)



module.exports = router;