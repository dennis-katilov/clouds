const express = require('express')
const mongoose = require('mongoose')
const config = require('config')

const app = express()
const PORT = config.get('serverPORT')
const start = async () =>{
    try {
        await mongoose.connect(config.get('db'))
        app.listen(PORT, ()=>{
            console.log('Server start on port', PORT)
        })
    } catch (error) {
        
    }
}

start()