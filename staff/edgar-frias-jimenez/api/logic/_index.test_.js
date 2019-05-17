const logic = require('.')
const { LogicError, RequirementError, ValueError, FormatError } = require('../common/errors')
const userApi = require('../data/user-api')
const duckApi = require('../data/duck-api')
const atob = require('atob')

describe('logic', () => {
    const name = 'Manuel'
    const surname = 'Barzi'
    let email
    const password = '123'

    beforeEach(() => {
        email = `manuelbarzi-${Math.random()}@gmail.com`
        __userToken__ = null
    })

    describe('users', () => {

        describe('update user', () => {
            let id, token

            const newData = { "age": 33 }
            beforeEach(() =>
                userApi.create(email, password, { name, surname })
                    .then(response => {
                        id = response.data.id

                        return userApi.authenticate(email, password)
                    })
                    .then(response => token = response.data.token)
            )

            it('should succeed on update user with the info provided', () => {
                debugger
                console.log(response)
                logic.updateUser(token, id, newData)
                .then(response => {
                    debugger
                    console.log(response)
                        expect(response.status).toBeDefined()
                        expect(response.status).toBe('OK')
                    })
                    .then(() => userApi.retrieve(id, token))
                    .then(response =>{
                        expect(response.data).toMatchObject(newData)
                    })
            })
        })

        describe('delete user', () => {
            let id, token

            beforeEach(() =>
                userApi.create(email, password, { name, surname })
                    .then(response => {
                        id = response.data.id

                        return userApi.authenticate(email, password)
                    })
                    .then(response => token = response.data.token)
            )

            it('should succeed on delete a user', () => {
                logic.deleteUser(token, id, email, password)
                    .then(response => {
                        expect(response.status).toBeDefined()
                        expect(response.status).toBe('OK')
                    })
                    .then(() => userApi.authenticate(email, password))
                    .then(response => {
                        expect(response).toBeDefined
                        expect(response.status).toBe('KO')
                        expect(error.message).toBe(`user with username \"${email}\" does not exist`)
                    })
            })
        })

    })
