'use strict'

const userApi = {
    __url__: 'https://skylabcoders.herokuapp.com/api',
    __timeout__: 0,

    create(name, surname, username, password, callback) {
        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'username', value: username, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true },
            { name: 'callback', value: callback, type: 'function' }
        ])

        call(`${this.__url__}/user`, (error, response) => {
            if (error) return callback(error)

            callback(undefined, JSON.parse(response))
        }, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, surname, username, password }),
                timeout: this.__timeout__
            })
    },

    authenticate(username, password, callback) {
        validate.arguments([
            { name: 'username', value: username, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true },
            { name: 'callback', value: callback, type: 'function' }
        ])

        call(`${this.__url__}/auth`, (error, response) => {
            if (error) return callback(error)

            callback(undefined, JSON.parse(response))
        }, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
            timeout: this.__timeout__
        })
    },

    retrieve(id, token, callback) {
        validate.arguments([
            { name: 'id', value: id, type: 'string', notEmpty: true },
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'callback', value: callback, type: 'function' }
        ])

        call(`${this.__url__}/user/${id}`, (error, response) => {
            if (error) return callback(error)

            callback(undefined, JSON.parse(response))
        }, {
            headers: { Authorization: `Bearer ${token}` },
            timeout: this.__timeout__
        })
    }
}