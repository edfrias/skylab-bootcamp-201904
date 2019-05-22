const validate = require('../common/validate')
const duckApi = require('../data/duck-api')
const { LogicError, FormatError } = require('../common/errors')
const userData = require('../data/user-data')
const { ObjectId } = require('mongodb')

const logic = {
    registerUser(name, surname, email, password) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return (async () => {
            const users = await userData.find(user => user.email === email)

            if (users.length) throw new LogicError(`user with email "${email}" already exists`)

            return userData.create({ email, password, name, surname })
        })()
    },

    authenticateUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return (async () => {
            const users = await userData.find(user => user.email === email)

            if (!users.length) throw new LogicError(`user with email "${email}" does not exist`)

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
            const user = await userData.retrieve(ObjectId(id))

            if (!user) throw new LogicError(`user with id "${id}" does not exist`)

            const { name, surname, email } = user

            return { name, surname, email }
        })()
    },

    searchDucks(id, query) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'query', value: query, type: 'string' }
        ])

        return userData.retrieve(id)
            .then(user => {
                if (!user) throw new LogicError(`user with id "${id}" does not exist`)

                return duckApi.searchDucks(query)
            })
            .then(ducks => ducks instanceof Array ? ducks : [])

    },

    retrieveDuck(id, duckId) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'duckId', value: duckId, type: 'string', notEmpty: true }
        ])

        if (!ObjectId.isValid(id)) throw new FormatError('invalid id')

        return (async () => {
            const user = await userData.retrieve(id)

            if (!user) throw new LogicError(`user with id "${id}" does not exist`)

            return duckApi.retrieveDuck(duckId)
        })()
    },

    toggleFavDuck(id, duckId) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'duckId', value: duckId, type: 'string', notEmpty: true }
        ])

        if (!ObjectId.isValid(id)) throw new FormatError('invalid id')

        return (async () => {
            const oid = ObjectId(id)

            const user = await userData.retrieve(oid)

            const { favs = [] } = user

            const index = favs.indexOf(duckId)

            if (index < 0) favs.push(duckId)
            else favs.splice(index, 1)

            await userData.update(oid, { favs })
        })()
    },

    retrieveFavDucks(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])

        return userData.retrieve(id)
            .then(user => {
                const { favs = [] } = user

                if (favs.length) {
                    const calls = favs.map(fav => duckApi.retrieveDuck(fav))

                    return Promise.all(calls)
                } else return favs
            })
    }
}

module.exports = logic