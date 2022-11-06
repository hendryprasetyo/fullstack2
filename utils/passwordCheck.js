const bcrypt = require('bcrypt')
const UsersModel = require('../models/users')

const passwordCheck = async (nip, username, password) => {
    const userData = await UsersModel.findOne({where: {nip: nip, username: username}})
    console.log(userData)
    const compare = await bcrypt.compare(password, userData.password)
    return {compare, userData}
}

module.exports = passwordCheck