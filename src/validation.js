//validation
const Joi = require('@hapi/joi')

//validation for login
const loginValidation = data => {
    const schema = Joi.object({
        email:Joi.string().min(5).required().email(),
        password:Joi.string().min(5).max(1024).required()
    })
    return schema.validate(data) // validates and returns an obj
}

//validation for register
const registerValidation = data => {
    const schema = Joi.object({
        name:Joi.string().min(2).required(),
        email:Joi.string().min(5).required().email(),
        password:Joi.string().min(5).max(1024).required()
    })
    return schema.validate(data) // validates and returns an obj
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;


