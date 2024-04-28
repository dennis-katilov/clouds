const Router = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')

const router = new Router()

router.post('/registration', 
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Password must be longer than 6').isLength({min:6})
    ],
    async (req, res) =>{
    try {
        const errrors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({message:'Incorrect request', errrors})
        }
        const {email, password} = req.body
        const candidate = User.findOne({email})
        if (candidate) {
            return res.status(400).json({message:`User with email {$email} already exist`})
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const user = new User({email, password:hashPassword})
        await user.save()
        return res.json({message:`User was created`})
        
    } catch (error) {
        console.log(error)
        res.send({message:'Server errer'})
    }
})

module.exports = router