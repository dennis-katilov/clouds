const Router = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')

const router = new Router()

router.post('/registration', 
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Password must be longer than 6').isLength({min:6, max:20})
    ],
    async (req, res) =>{
    try {
        console.log(req.body)
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({message:'Incorrect request', errors})
        }
        const {email, password} = req.body
        const candidate = await User.findOne({email})
        if (candidate) {
            return res.status(400).json({message:`User with email ${email} already exist`})
        }
        const hashPassword = await bcrypt.hash(password, 15)
        const user = new User({email, password:hashPassword})
        await user.save()
        return res.json({message:`User was created`})
        
    } catch (e) {
        console.log(e)
        res.send({message:'Server error'})
    }
})

module.exports = router