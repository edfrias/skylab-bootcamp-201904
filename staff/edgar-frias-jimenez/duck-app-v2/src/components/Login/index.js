import React from 'react'
import literals from './literals'
import './index.scss'

function Login({ lang, onLogin, error }) {
    const { title, email, password } = literals[lang]

    function handleSubmit(e) {
        e.preventDefault()

        const username = e.target.username.value
        const password = e.target.password.value

        onLogin(username, password)
    }

    return <section className="login">
        <h2>{title}</h2>
        <img className="login__image" alt="Login" title="Quack-in" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4fa86395-856f-4b6d-b890-b608f402d65a/d9ss710-d5e7411a-8c49-49e2-89c8-55f7797b4051.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzRmYTg2Mzk1LTg1NmYtNGI2ZC1iODkwLWI2MDhmNDAyZDY1YVwvZDlzczcxMC1kNWU3NDExYS04YzQ5LTQ5ZTItODljOC01NWY3Nzk3YjQwNTEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.70nf1GWG1YnbbKfgUDKNzEWzRKTKMgWhI8bn26u4fvE" />
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder={email} />
            <input type="password" name="password" placeholder={password} />
            <button>{title}</button>
            <span>{error}</span>
        </form>
    </section>
}

export default Login