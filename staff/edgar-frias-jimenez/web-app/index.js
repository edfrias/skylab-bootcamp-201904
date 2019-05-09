const express = require('express')
const bodyParser = require('./body-parser')
const render = require('./render')
const landing = require('./components/landing')
const logic = require('./logic')
const package = require('./package.json')

const { argv: [, , port = 8080] } = process

const app = express()

app.use(express.static('public'))

let user = {}

app.get('/register', (req, res) =>
    res.send(render(`
        <form class="register" method="post" action="/register">
            <input type="text" name="name" placeholder="Name" autofocus required>
            <input type="text" name="surname" placeholder="Surname">
            <input type="email" name="email" placeholder="Email">
            <input type="password" name="password" placeholder="Password" required>
            <button>Register</button>
        </form>
    `))
)

app.post('/register', bodyParser, (req, res) => {

    const { name, surname, email, password } = req.body

    logic.registerUser(name, surname, email, password)
        .then()

    res.send(render(`<p>Ok, user correctly registered, you can now proceed to <a href="/login">login</a></p>`))
})

app.get('/login', (req, res) =>
    res.send(render(`<form class="login" method="post" action="/login">
            <input type="text" name="username">
            <input type="password" name="password">
            <button>Login</button>
        </form>`))
)

app.post('/login', bodyParser, (req, res) => {
    const { username, password } = req.body

    if (username === user.username && password === user.password) res.redirect('/home')
    else res.send('403',
        render(`
            <form class="login" method="post" action="/login">
                <input type="text" name="username">
                <input type="password" name="password">
                <button>Login</button>
            </form>
            <p>Wrong credentials Please try again.</p>
        `))
})

app.get('/home', (req, res) =>
    res.send(render(`<h1>Welcome, ${user.username}!</h1>`))
)

app.get('/', (req, res) =>
    res.send(render(landing()))
)

app.listen(port, () => console.log(`${package.name} v${package.version} up and running`))