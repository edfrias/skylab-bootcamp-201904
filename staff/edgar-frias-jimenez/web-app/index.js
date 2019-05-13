const express = require('express')
const { injectLogic, checkLogin } = require('./middlewares')
const render = require('./components/render')
const package = require('./package.json')
const bodyParser = require('body-parser')
const session = require('express-session')

const urlencodedParser = bodyParser.urlencoded({ extended: false })

const { argv: [, , port = 8080] } = process

const app = express()

app.set('view engine', 'pug')
app.set('views', 'components')

app.use(session({
    secret: 'my super secret phrase to encrypt my session',
    resave: true,
    saveUninitialized: true
}))

app.use(express.static('public'), injectLogic)

app.get('/', checkLogin('/home'), (req, res) => res.render('landing', { logout: true }))

app.get('/register', checkLogin('/home'), (req, res) => res.render('register', { logout: true }))

app.post('/register', [checkLogin('/home'), urlencodedParser], (req, res) => {
    const { body: { name, surname, email, password }, logic } = req
    debugger
    try {
        logic.registerUser(name, surname, email, password)
            .then(() => res.render('login', { email, message: 'Your register has been successful, please, log in', logout: true}))
            .catch(({ message }) => {
                res.render('register',{ name, surname, email, message })
            })
    } catch ({ message }) {
        res.render('register',{ name, surname, email, message })
    }
})

app.get('/login', checkLogin('/home'), (req, res) =>
    res.render('login', { logout: true })
)

app.post('/login', [checkLogin('/home'), urlencodedParser], (req, res) => {
    const { body: { email, password }, logic, session } = req
    debugger
    try {
        logic.loginUser(email, password)
            .then(() => {
                session.token = logic.__userToken__

                res.redirect('/home')
            })
            .catch(({ message }) => res.render('login', { email, message, logout: true }))
    } catch ({ message }) {
        res.render('login', { email, message, logout: true })
    }
})

app.get('/home', checkLogin('/', false), (req, res) => {
    const { logic } = req
    debugger
    logic.retrieveUser()
        .then(({ name }) => res.render('home', name))
        .catch(({ message }) => res.render('home', { message }))
})

app.get('/home/search', checkLogin('/', false), urlencodedParser, (req, res) => {
    const { query: { query }, logic, session } = req

    session.query = query
    debugger
    return logic
        .retrieveUser()
            .then(({ name }) => {
                logic.searchDucks(query)
                    .then(ducks => {
                        ducks = ducks.map(({ id, title, imageUrl: image, price }) => ({
                            url: `/home/duck/${id}`,
                            id,
                            title,
                            image,
                            price,
                        }))

                        res.render('home', { name, query, ducks })
                    })
            })
            .catch(({ message }) => res.render('home', { message }))
})


app.get('/home/duck/:id', checkLogin('/', false), (req, res) => {
    const { params: { id }, logic, session: { query } } = req

    logic.retrieveDuck(id)
        .then(({ title, imageUrl: image, description, price }) => {
            const duck = { title, image, description, price }

            return logic.retrieveUser()
                .then(({ name }) => res.render('home', { query, name, duck }))
        })
})

app.post('/home/duck/:id', checkLogin('/', false), urlencodedParser, (req, res) => {
    const {
      params: { id },
      body,
      session: { logic },
    } = req;
    if (body.toggleFav) {
      return logic.toggleFavDuck(id).then(() => res.redirect(req.url));
    } else res.redirect(req.url);
  });

app.post('/logout', (req, res) => {
    req.session.destroy()

    res.redirect('/')
})

app.use(function (req, res, next) {
    res.redirect('/')
})

app.listen(port, () => console.log(`${package.name} ${package.version} up on port ${port}`))
