const validate = require('../../common/validate')
const {LogicError} = require('../../common/errors')
const {UserData} = require('../data/models')

const logic = {

    registerUser(name, email, password) {

        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return (async() => {
            const users = await UserData.find({email})

            if(users.length) throw new LogicError(`user with this ${email} already exists`)

            await UserData.create({name, email, password})
        })()
    },

    authenticateUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return (async () => {
            const users = await UserData.find(user => user.email === email)

            if (!users.length) throw new LogicError(`user with this "${email}" does not exist`)

            const [user] = users

            if (user.password !== password) throw new LogicError('wrong credentials')

            return user._id.toString()
        })()
    },

    retrieveUser(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])

        if (!ObjectId.isValid(id)) throw new FormatError('invalid id')

        return (async () => {
            const user = await UserData.retrieve(ObjectId(id))

            if (!user) throw new LogicError(`user with id "${id}" does not exist`)

            const { name, surname, email } = user

            return { name, surname, email }
        })()
    },

}
module.export = logic