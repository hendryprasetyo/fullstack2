const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db.config')

class Attendance extends Model { }

Attendance.init({
    users_nas: {
        type: DataTypes.INTEGER,
    },
    username: {
        type: DataTypes.CHAR
    },
    status: {
        type: DataTypes.ENUM('in', 'out')
    }
}, {
    sequelize,
    modelName: 'Attendance'
})

module.exports = Attendance