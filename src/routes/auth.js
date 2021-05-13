const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const {registerValidation, loginValidation} = require('../validation');


//Register
router.post('/register', async (req,res) => {

    //validate the request
    const {error} = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    //check if the user is already in the db
    const emailExists = await User.findOne({email: req.body.email});
    if(emailExists) return res.status(400).send('Email already exists');


    //hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
     
    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashPassword
    });
    try {
        const savedUser = await user.save();
        res.send({user: user._id});
    }catch(err){
        res.status(400).send(err)
    }
});


//Login
router.post('/login', async (req,res) => {
    //validate the request
    const {error} = loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    //check if the email exists
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email or Password is wrong');

    //check if the password match
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Email or Password is wrong');

    res.send('Logged in')

});



module.exports = router;