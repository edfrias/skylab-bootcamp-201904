import React from 'react'
import literals from './literals'
import './index.scss'

function Register({ lang, onRegister, error }) {
    const { title, name, surname, email, password } = literals[lang]

    function handleSubmit(e) {
        e.preventDefault()

        const {
            name: { value: name },
            surname: { value: surname },
            username: { value: username },
            password: { value: password }
        } = e.target

        onRegister(name, surname, username, password)
    }

    return <section className="register">
        <h2>{title}</h2>
        <img className="login__image" alt="Login" title="Quack-in" src="https://i.redd.it/j221odxep5p01.gif" />
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder={name} />
            <input type="text" name="surname" placeholder={surname} />
            <input type="text" name="username" placeholder={email} />
            <input type="password" name="password" placeholder={password} />
            <button>{title}</button>
            <span>{error}</span>
        </form>
    </section>
}

export default Register