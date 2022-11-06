const express = require('express')
const router = express.Router()
const AttendanceModel = require('../models/attendance')

// routing endpoint users utama
// setiap ada async harus ada await
router.get('/', async(req, res) => {
    const attendance = await AttendanceModel.findAll()
    res.status(200).json({
        data: attendance,
        metadata: "test attendance endpoint"
    })
})
router.post('/checkin', async(req, res) => {
    const { nip } = req.body
    const attendance = await AttendanceModel.create({
        users_nip: nip, status: 'in'
    })
    res.status(200).json({
        data: attendance,
        metadata: "checkin successfull"
    })
})
router.post('/checkout', async(req, res) => {
    const { nip } = req.body
    const attendance = await AttendanceModel.create({
        users_nip: nip, status: 'out'
    })
    res.status(200).json({
        data: attendance,
        metadata: "checkout successfull"
    })
})
module.exports = router