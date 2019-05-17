

    updateUser(token, data) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'data', value: data, type: 'object', notEmpty: true }
        ])

        const { id } = _token.payload(token)

        return userApi.update(id, token, data)
            .then(response => {
                const { status, error } = response
                if (status === 'OK') return status
                else throw new LogicError(error)
            })
    },

    deleteUser(token, email, password) {
        validate.arguments([
            { name: 'token', value: token, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)
        const { id } = _token.payload(token)

        return userApi.delete(token, id, email, password)
            .then(response => {
                const { status, error } = response
                if (status === 'OK') return status
                else throw new LogicError(error)
            })
    }