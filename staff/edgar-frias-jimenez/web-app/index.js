const express = require('express')
const bodyParser = require('./body-parser')

const { argv: [, , port] } = process

const app = express()

app.use(express.static('public'))

let user = {}

function render(body) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Server App</title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <main class="main">
            <h1 class="title">Welcome to server-app</h1>
            ${body}
        </main>
    </body>
    </html>`
}

app.get('/register', (req, res) =>
    res.send(render(`<form class="register" method="post" action="/register">
            <input type="text" name="username">
            <input type="password" name="password">
            <button>Register</button>
        </form>`))
)

app.post('/register', bodyParser, (req, res) => {

    const { username, password } = req.body

    user.username = username
    user.password = password

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

app.get('/landing', (req, res) =>
    res.send(render(`<h1>This is a landing</h1>`))
)

app.listen(port)