const express = require('express')
const router = express.Router()
const UsersModel = require('../models/users')
const bcrypt = require('bcrypt')
// const { sync } = require('../models/users')
const passwordCheck = require('../utils/passwordCheck')

// routing endpoint users utama
// setiap ada async harus ada await
router.get('/', async(req, res) => {
    const users = await UsersModel.findAll()
    res.status(200).json({
        data: users,
        metadata: "test user endpoint"
    })
})
router.post('/', async(req, res) => {
    // nip, username, password akan di tangkep oleh backend dari frontend
    const { nip, username, name, password } = req.body

    const encryptedPassword = await bcrypt.hash(password, 8)


    const users = await UsersModel.create({
        nip, username, name, password: encryptedPassword
    })
    res.status(200).json({
        data: users,
        metadata: "test user endpoint"
    })
})
router.put('/', async(req, res) => {
    // nip, username, password akan di tangkep oleh backend dari frontend
    const { nip, username, name, password,newPassword } = req.body

    const check = await passwordCheck(nip,username, password)

    const encryptedPassword = await bcrypt.hash(newPassword, 8)

    // password yang muncul di db  === password dari inputan
    if (check.compare === true){
        const users = await UsersModel.update({
            name, password: encryptedPassword
        }, {where: {nip: nip, username: username}})
        res.status(200).json({
            users: {updated: users[0]},
            metadata: "user update!"
        })
    } else  {
        res.status(400).json({
            error: "data invalid"
        })
    }
})

router.post('/login', async (req, res) => {
    const { nip, username, password } = req.body
    const check = await passwordCheck(nip,username, password)
    if (check.compare === true){
        res.status(200).json({
            user: check.userData,
            metadata: "login success"
        })
    } else{
        res.status(400).json({
            error: "data invalid"
        })
    }
})


module.exports = router