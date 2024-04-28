const Router = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')

const router = new Router()

router.post('/registration', async (req, res) =>{
    try {
        const {email, password} = req.body
        const candidate = User.findOne({email})
        if (candidate) {
            return res.status(400).json({message:`User with email {$email} already exist`})
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const user = new User({email, password:hashPassword})
        user.save()
        
    } catch (error) {
        console.log(error)
        res.send({message:'Server errer'})
    }
})