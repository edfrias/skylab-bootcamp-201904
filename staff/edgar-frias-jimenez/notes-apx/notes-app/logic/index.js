const validate = require('../common/validate')
const { LogicError } = require('../common/errors')
const { User, Note } = require('../data/models')

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
            const user = await User.findOne({'email': email})
            if (user) throw new LogicError(`user with email "${email}" already exists`)

            return User.create({ email, password, name, surname })
        })()
    },

    authenticateUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return (async () => {
            const user = await User.findOne({email})

            if (!user) throw new LogicError(`user with email "${email}" does not exist`)

            return user.id
        })()
    },

    retrieveUser(id) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true }
        ])

        return (async () => {
            const user = await User.findById(id)

            if (!user) throw new LogicError(`user with id "${id}" does not exist`)

            const { name, surname, email } = user

            return { name, surname, email }
        })()
    },

    addPublicNote(userId, text) {
        validate.arguments([
            { name: 'userId', value: userId, type: 'string', notEmpty: true },
            { name: 'text', value: text, type: 'string', notEmpty: true }
        ])

        return (async () => {
            try {
                await Note.create({ author: userId, text })
                return console.log('Note successfully created!')
            } catch (error) {
                throw new LogicError(`${error}, unable to publish note.`)
            }
        })()
    },

    removePublicNote(noteId) {
        validate.arguments([
            { name: 'id', value: noteId, type: 'string', notEmpty: true }
        ])

        return (async () => {
            try {
                await Notes.findByIdAndDelete(noteId)
                return console.log('Note successfully erased')
            } catch (error) {
                throw new LogicError(`${error}, unable to delete note.`)
            }
        })()
    },

    listPublicNotes(userId) {
        // TODO validate inputs

        // TODO implement logic
    },

    addPrivateNote(userId, text) {userId, text
        validate.arguments([
            { name: 'userId', value: userId, type: 'string', notEmpty: true },
            { name: 'text', value: text, type: 'string', notEmpty: true }
        ])

        return (async () => {
            try {
                const user = await User.findById(userId)
                const addPrivateNote = await Notes.create({ text: text, userId })

                await user.text.push(addPrivateNote)
                await user.save()

                return console.log('Note successfully created!')
            } catch (error) {
                throw new LogicError(`${error}, unable to publish note.`)
            }
        })()
    },


    addPrivateNote(userId, text) {
        // TODO validate inputs

        // TODO implement logic
    },

    removePrivateNote(userId, noteId) {
        // TODO validate inputs

        // TODO implement logic
    },

    listPrivateNotes(userId) {
        // TODO validate inputs

        // TODO implement logic
    }
}

module.exports = logic