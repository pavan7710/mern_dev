const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')
const {check , validationResult} = require('express-validator')
const config = require("config")
const gravatar = require('gravatar')




router.post('/signup', [
    check('name' , 'Name is required').notEmpty(),
    check('email' , "plese Include a valid Email").isEmail(),
    check("password", 'pllese enter a password with 6 or more characters').isLength({min : 6})
], async (req ,res)=> {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors : errors.array()
        })
    }



    const {name , email , password} = req.body

    try {
        let user = await User.findOne({email})
        if (user){
            return res.status(400).json({
                errors : [{
                    msg : "User already exists"
                }
                ]
            })
        }

        const avatar = gravatar.url(email , {
            s:'200',
            r : 'pg',
            d:"mm"
        } )
    
        user = new User({
            name , email ,password , avatar
        })

        const salt = await bcrypt.genSalt(10)

        user.password = await bcrypt.hash(password , salt)

        await user.save()

        const payload = {
            user : {
                id : user.id
            }
        }

        jwt.sign(payload , config.get('jwtSecret'), {expiresIn :'30000000'} , (err , token) => {
            if(err) throw err
            return res.json({token})
        })


    } catch(e){
        console.log(err)
        return res.status(500).send('Server Error')
    }
})


module.exports = router