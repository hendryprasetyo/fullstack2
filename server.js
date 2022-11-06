const express = require('express')
const cors = require('cors')
const mysql2 = require('mysql2')
const port = 3100

const sequelize = require('./db.config')
sequelize.sync().then(() => console.log('database ready!!'))

// importent
const userEndpoint = require('./routes/users')
const attendanceEndpoint = require('./routes/attendance')

const app  = express()
app.use(cors())
app.use(express.json())

// importent
app.use('/users', userEndpoint)
app.use('/attendance', attendanceEndpoint)

app.listen(port, () => console.log(`running server on port ${port}`))
