const express = require('express')
const mongoose = require('mongoose')
const config = require('config')

const app = express()
const PORT = config.get('serverPORT')
const start = () =>{
    try {
        app.listen(PORT, ()=>{
            console.log('Server start on port', PORT)
        })
    } catch (error) {
        
    }
}

start()