const logic = require('.')
const { LogicError, RequirementError } = require('../common/errors')
const userData = require('../data/user-data')
const duckApi = require('../data/duck-api')
require('../common/utils/object-matches.polyfill')
const { MongoClient } = require('mongodb')


describe('logic', () => {
    const name = 'Manuel'
    const surname = 'Barzi'
    let email
    const password = '123'

    beforeAll(async () => {
        client = await MongoClient.connect(url, { useNewUrlParser: true })
        const db = client.db()
        users = db.collection('users')
        userData.__col__ = users
    })

    beforeEach(async () => {
        await users.deleteMany()

        email = `manuelbarzi-${Math.random()}@gmail.com`
    })

    describe('users', () => {
        describe('register user', () => {
            it('should succeed on correct user data', async () => {
                const response = await logic.registerUser(name, surname, email, password)
                    expect(response).toBeUndefined()
                    const users = await userData.find(user => user.matches({ name, surname, email, password }))
                    expect(users).toBeDefined()
                    expect(users).toHaveLength(1)
            })

            describe('on already existing user', () => {
                beforeEach(() => userData.create(name, surname, email, password))

                it('should fail on retrying to register', async () => {
                    try {
                        await logic.registerUser(name, surname, email, password)
                    } catch (error) {
                        expect(error).toBeDefined()
                        expect(error).toBeInstanceOf(LogicError)
                        expect(error.message).toBe(`user with email "${email}" already exists`)
                    }
                })
            })

            it('should fail on undefined name', async () => {
                const name = undefined
                try {
                    await logic.registerUser(name, surname, email, password)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error.message).toBe('name is not optional')
                }
            })

            it('should fail on null name', async () => {
                const name = null
                try {
                    await logic.registerUser(name, surname, email, password)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error.message).toBe('name is not optional')
                }
            })

            it('should fail on empty name', async () => {
                const name = ''
                try {
                    await logic.registerUser(name, surname, email, password)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error.message).toBe('name is empty')
                }
            })

            it('should fail on blank name', async () => {
                const name = ' \t    \n'
                try {
                    await logic.registerUser(name, surname, email, password)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error.message).toBe('name is empty')
                }
            })

            it('should fail on undefined surname', async () => {
                const surname = undefined
                try {
                    await logic.registerUser(name, surname, email, password)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error.message).toBe('surname is not optional')
                }
            })

            it('should fail on null surname', async () => {
                const surname = null
                try {
                    await logic.registerUser(name, surname, email, password)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error.message).toBe('surname is not optional')
                }
            })

            it('should fail on empty surname', async () => {
                const surname = ''
                try {
                    await logic.registerUser(name, surname, email, password)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error.message).toBe('surname is empty')
                }
            })

            it('should fail on blank surname', async () => {
                const surname = ' \t    \n'
                try {
                    await logic.registerUser(name, surname, email, password)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error.message).toBe('surname is empty')
                }
            })

            it('should fail on undefined email', async () => {
                const email = undefined
                try {
                    await logic.registerUser(name, surname, email, password)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error.message).toBe('email is not optional')
                }
            })

            it('should fail on null email', async () => {
                const email = null
                try {
                    await logic.registerUser(name, surname, email, password)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error.message).toBe('email is not optional')
                }
            })

            it('should fail on empty email', async () => {
                const email = ''
                try {
                    await logic.registerUser(name, surname, email, password)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error.message).toBe('email is empty')
                }
            })

            it('should fail on blank email', async () => {
                const email = ' \t    \n'
                try {
                    await logic.registerUser(name, surname, email, password)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error.message).toBe('email is empty')
                }
            })

            it('should fail on non-email email', async () => {
                const nonEmail = 'non-email'
                try {
                    await logic.registerUser(name, surname, nonEmail, password)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error.message).toBe(`${nonEmail} is not an e-mail`)
                }
            })
        })

        describe('authenticate user', () => {
            beforeEach(() =>
                userData.create({ name, surname, email, password })
            )

            it('should succeed on correct user credential', async () => {
                const id = await logic.authenticateUser(email, password)
                expect(typeof id).toBe('string')
                expect(id.length).toBeGreaterThan(0)
            })

            it('should fail on non-existing user', async () => {
                try {
                    await logic.authenticateUser(email = 'unexisting-user@mail.com', password)
                    throw Error('should not reach this point')
                } catch (error) {
                    expect(error).toBeDefined()
                    expect(error).toBeInstanceOf(LogicError)
                    expect(error.message).toBe(`user with email "${email}" does not exist`)
                }
            })
        })

        describe('retrieve user', () => {
            let id

            beforeEach(async () => {
                await userData.create({ name, surname, email, password })
                await userData.find(user => user.email === email)
                id = users[0]._id.toString()
           })

            it('should succeed on correct user id', async () => {
                const user = await logic.retrieveUser(id)
                expect(user.id).toBeUndefined()
                expect(user.name).toBe(name)
                expect(user.surname).toBe(surname)
                expect(user.email).toBe(email)
                expect(user.password).toBeUndefined()
            })

            it('should fail on unexisting user id', () => {
                id = 'wrong-id'
                try {
                    await logic.retrieveUser(id)
                    throw new Error('should not reach this point')
                } catch (error) {
                    expect(error).toBeDefined()
                    expect(error).toBeInstanceOf(LogicError)
                    expect(error.message).toBe(`user with id "${id}" does not exist`)
                }
            })
        })

        describe('toggle fav duck', () => {
            let id, duckId

            beforeEach(() => {
                duckId = `${Math.random()}`

                return userData.create({ name, surname, email, password })
                    .then(() => userData.find(user => user.email === email))
                    .then(([user]) => id = user.id)
            })

            it('should succeed adding fav on first time', () =>
                logic.toggleFavDuck(id, duckId)
                    .then(response => expect(response).toBeUndefined())
                    .then(() => userData.retrieve(id))
                    .then(user => {
                        const { favs } = user

                        expect(favs).toBeDefined()
                        expect(favs).toBeInstanceOf(Array)
                        expect(favs).toHaveLength(1)
                        expect(favs[0]).toBe(duckId)
                    })
            )

            it('should succeed removing fav on second time', () =>
                logic.toggleFavDuck(id, duckId)
                    .then(() => logic.toggleFavDuck(id, duckId))
                    .then(response => expect(response).toBeUndefined())
                    .then(() => userData.retrieve(id))
                    .then(user => {
                        const { favs } = user

                        expect(favs).toBeDefined()
                        expect(favs).toBeInstanceOf(Array)
                        expect(favs).toHaveLength(0)
                    })
            )

            it('should fail on null duck id', () => {
                duckId = null

                expect(() => logic.toggleFavDuck(duckId)).toThrowError(RequirementError, 'id is not optional')
            })
        })

        describe('retrieve fav ducks', () => {
            let id, _favs

            beforeEach(() => {
                _favs = []

                return duckApi.searchDucks('')
                    .then(ducks => {
                        for (let i = 0; i < 10; i++) {
                            const randomIndex = Math.floor(Math.random() * ducks.length)

                            _favs[i] = ducks.splice(randomIndex, 1)[0].id
                        }

                        return userData.create({ email, password, name, surname, favs: _favs })
                    })
                    .then(() => userData.find(user => user.email === email))
                    .then(([user]) => id = user.id)

            })

            it('should succeed adding fav on first time', () =>
                logic.retrieveFavDucks(id)
                    .then(ducks => {
                        ducks.forEach(({ id, title, imageUrl, description, price }) => {
                            const isFav = _favs.some(fav => fav === id)

                            expect(isFav).toBeTruthy()
                            expect(typeof title).toBe('string')
                            expect(title.length).toBeGreaterThan(0)
                            expect(typeof imageUrl).toBe('string')
                            expect(imageUrl.length).toBeGreaterThan(0)
                            expect(typeof description).toBe('string')
                            expect(description.length).toBeGreaterThan(0)
                            expect(typeof price).toBe('string')
                            expect(price.length).toBeGreaterThan(0)
                        })
                    })
            )
        })
    })

    describe('ducks', () => {
        let id

        beforeEach(() =>
            userData.create({ email, password, name, surname })
                .then(() => userData.find(user => user.email === email))
                .then(([user]) => id = user.id)
        )

        describe('search ducks', () => {
            it('should succeed on correct query', () =>
                logic.searchDucks(id, 'yellow')
                    .then(ducks => {
                        expect(ducks).toBeDefined()
                        expect(ducks).toBeInstanceOf(Array)
                        expect(ducks.length).toBe(13)
                    })

                // TODO other cases
            )
        })

        describe('retrieve duck', () => {
            let duck

            beforeEach(() =>
                duckApi.searchDucks('yellow')
                    .then(ducks => duck = ducks[0])
            )

            it('should succeed on correct duck id', () =>
                logic.retrieveDuck(id, duck.id)
                    .then(_duck => {
                        expect(_duck).toMatchObject(duck)

                        expect(typeof _duck.description).toBe('string')
                        expect(_duck.description.length).toBeGreaterThan(0)
                    })
            )
        })
    })

    afterAll(() => client.close(true))
})