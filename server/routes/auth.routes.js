const Router = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')

const router = new Router()

router.post('/registration', 
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Password must be longer than 4').isLength({min:4, max:20})
    ],
    async (req, res) =>{
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({message:'Incorrect request', errors})
        }
        const {email, password} = req.body
        const candidate = await User.findOne({email})
        if (candidate) {
            return res.status(400).json({message:`User with email ${email} already exist`})
        }
        const hashPassword = await bcrypt.hash(password, 8)
        const user = new User({email, password:hashPassword})
        await user.save()
        return res.json({message:`User was created`})
        
    } catch (e) {
        console.log(e)
        res.send({message:'Server error'})
    }
})

router.post('/login', 
    async (req, res) =>{
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        if (!user) {
            res.status(400).json({message:`User not found`})
        }
        const isPassValid = bcrypt.compareSync(password, user.password)
        if (!isPassValid) {
            res.status(400).json({message:`Invalid email or password`})
        }
        const token = jwt.sign({id:user.id}, config.get("secretKey"), {expiresIn:"2h"})
        return res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                discSpace: user.discSpace,
                usedSpace: user.usedSpace,
                avatar: user.avatar
            }
        })
    } catch (e) {
        console.log(e)
        res.send({message:'Server error'})
    }
})

module.exports = router 