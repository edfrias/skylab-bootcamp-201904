const express = require('express')
const package = require('./package.json')
const bodyParser = require('body-parser')
const logic = require('./logic')

const jsonParser = bodyParser.json()

const { argv: [, , port = 8080] } = process

const app = express()

app.post('/user', jsonParser, (req, res) => {
    const { body: { name, surname, email, password } } = req

    try {
        logic.registerUser(name, surname, email, password)
            .then(() => res.status(201).json({ message: 'User registry succeed. '}))
            .catch(({ message }) => {
                res.status(401).json({ error: message})
            })
    } catch ({ message }) {
        res.status(500).json({ error: message})
    }
})

app.post('/user/auth', jsonParser, (req, res) => {
    const { body: { email, password } } = req

    try {
        logic.authenticateUser(email, password)
            .then(token => res.status(200).json({ message: 'User authorized', token }))
            .catch(({ message }) => {
                res.status(401).json({ error: message })
            })
    } catch({ message }) {
        res.status(500).json({ error: message})
    }
})


app.get('/user', (req, res) => {
    const token = req.headers.authorization.slice(7)
    try {
        logic.retrieveUser(token)
            .then(user => res.status(200).json(user))
            .catch(({ message }) => {
                res.status(404).json({ error: message })
            })
    } catch({ message }) {
        res.status(500).json({ error: message })
    }
})

app.get('/ducks', jsonParser, (req, res) => {
    const token = req.headers.authorization.slice(7)
    const query = req.query.q
    try {
        logic.searchDucks(token, query)
            .then(data => res.status(200).json({ message: 'Succeed on retrieve items', data}))
            .catch(({ message }) => {
                res.status(404).json({ error: message })
            })
    } catch({ message }) {
        res.status(500).json({ error: message })
    }
})

app.get('/duck', jsonParser, (req, res) => {
    const token = req.headers.authorization.slice(7)
    const id = req.query.id

    try {
        logic.retrieveDuck(token, id)
            .then(data => res.status(200).json({ message: 'Succeed on retrieve item', data}))
            .catch(({ message }) => {
                res.status(404).json({ error: message })
            })
    } catch({ message }) {
        res.status(500).json({ error: message })
    }
})

app.post('/favs/duck', jsonParser, (req, res) => {
    const { body: { token, id } } = req

    try {
        logic.toggleFavDuck(token, id)
            .then(() => res.status(200).json({ message: 'Succeed on toogle fav state'}))
            .catch(({ message }) => {
                res.status(404).json({ error: message })
            })
    } catch({ message }) {
        res.status(500).json({ error: message })
    }
})

app.get('/favs/ducks', jsonParser, (req, res) => {
    const token = req.headers.authorization.slice(7)
    // const { body: { id } } = req ???

    try {
        logic.retrieveFavDucks(token, id)
            .then(data => res.status(200).json({ message: 'Succeed on toogle fav state', data}))
            .catch(({ message }) => {
                res.status(404).json({ error: message })
            })
    } catch({ message }) {
        res.status(500).json({ error: message })
    }
})

// TODO other routes

app.use(function (req, res, next) {
    res.redirect('/')
})

app.listen(port, () => console.log(`${package.name} ${package.version} up on port ${port}`))