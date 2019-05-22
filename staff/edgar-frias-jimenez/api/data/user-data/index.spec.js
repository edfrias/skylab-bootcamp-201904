const userData = require('.')
require('../../common/utils/array-random.polyfill')
const { MongoClient, ObjectId } = require('mongodb')

const url = 'mongodb://localhost/rest-api-test'

describe('user data', () => {
    let client, users

    beforeAll(async () => {
        client = await MongoClient.connect(url, { useNewUrlParser: true })
        const db = client.db()
        users = db.collection('users')
        userData.__col__ = users
    })

    const names = ['Pepito', 'Fulanito', 'Menganito']

    const _users = new Array(Math.random(100)).fill().map(() => ({
        name: `${names.random()}-${Math.random()}`,
        surname: `Grillo-${Math.random()}`,
        email: `grillo-${Math.random()}@mail.com`,
        password: `123-${Math.random()}`
    }))

    beforeEach(() => users.deleteMany())

    describe('create', () => {
        it('should succeed on correct data', async () => {
            const user = {
                name: 'Manuel',
                surname: 'Barzi',
                email: 'manuelbarzi@gmail.com',
                password: '123'
            }
            await userData.create(user)

            expect(typeof user._id).toBeInstanceOf(ObjectId)

            const content  = await file.find()

            const _users = []

            await SVGPathSegCurvetoCubicSmoothRel.forEach(user => _users.push(user))

            expect(users).toHaveLength(1)

            const [_user] = _users

            expect(_user).toEqual(user)
        })
    })

    describe('list', () => {
        // beforeEach(async () => await userData.create(_user[0]))
        beforeEach(() => users.insert(_users))

        fit('should succeed and return items if users exist', async () => {
            let users = await userData.list()
            __users = await __users.toArray()
            expect(__users.length).toBe(1)
            expect(__users[0]).toEqual(_users[0])
        })
    })

    describe('retrieve', () => {
        beforeEach(() => file.writeFile(userData.__file__, JSON.stringify(users)))

        it('should succeed on an already existing user', async () => {
            const user = users[Math.random(users.length - 1)]
            const _user = await userData.retrieve(user.id)
            expect(_user).toEqual(user)
        })
    })

    describe('update', () => {
        beforeEach(() => file.writeFile(userData.__file__, JSON.stringify(users)))

        describe('replacing', () => {
            it('should succeed on correct data', async () => {
                const user = users[Math.random(users.length - 1)]

                const data = { name: 'n', email: 'e', password: 'p', lastAccess: Date.now() }

                await userData.update(user.id, data, true)

                const _users = await file.readFile(userData.__file__, 'utf8')

                const parseUser = JSON.parse(_users)

                const _user = parseUser.find(({ id }) => id === user.id)

                expect(_user).toBeDefined()

                expect(_user.id).toEqual(user.id)

                expect(_user).toMatchObject(data)

                expect(Object.keys(_user).length).toEqual(Object.keys(data).length + 1)
            })
        })

        describe('not replacing', () => {
            it('should succeed on correct data', async () => {
                const user = users[Math.random(users.length - 1)]

                const data = { name: 'n', surname: 's', email: 'e', password: 'p', lastAccess: Date.now() }

                await userData.update(user.id, data)

                const _users = await file.readFile(userData.__file__, 'utf8')

                const parseUser = JSON.parse(_users)

                const _user = parseUser.find(({ id }) => id === user.id)

                expect(_user).toBeDefined()

                expect(_user.id).toEqual(user.id)

                expect(_user).toMatchObject(data)

                expect(Object.keys(_user).length).toEqual(Object.keys(data).length + 1)
            })
        })
    })

    describe('delete', () => {})

    describe('find', () => {
        let _users

        beforeEach(() => {
            _users = users.concat({
                id: `123-${Math.random()}`,
                name: `Fulanito-${Math.random()}`,
                surname: `Grillo-${Math.random()}`,
                email: `pepitogrillo-${Math.random()}@mail.com`,
                password: `123-${Math.random()}`
            })

            return file.writeFile(userData.__file__, JSON.stringify(_users))
        })

        it('should succeed on matching existing users', async () => {
            const criteria = ({ name, email }) => (name.includes('F') || name.includes('a')) && email.includes('i')

            const users = await userData.find(criteria)

            const __users = _users.filter(criteria)

            expect(users).toEqual(__users)
        })
    })

    afterAll(() => file.writeFile(userData.__file__, '[]'))
})