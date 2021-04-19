const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();


const mockUserData = [
    {name:"Assaf",password:"password"}
]



// define the home page route
router.use('/login', (req, res) => {
    // authenticate the user
    const reqUserName = req.body.userName;
    const reqUserPassword = req.body.password;
    res.send({reqUserName, reqUserPassword})
});

module.exports = router;