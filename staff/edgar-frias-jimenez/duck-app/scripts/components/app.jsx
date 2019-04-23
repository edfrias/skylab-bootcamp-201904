const { Component, Fragment } = React

class App extends Component {
    state = { lang: 'en', visible: logic.isUserLoggedIn ? 'home' : 'landing', error: null, name: null }

    handleLanguageChange = lang => this.setState({ lang })

    handleRegisterNavigation = () => this.setState({ visible: 'register' })

    handleLoginNavigation = () => this.setState({ visible: 'login' })

    handleRegister = (name, surname, username, password) => {
        logic.registerUser(name, surname, username, password, error => {
            if (error) {
                return this.setState({ error: error.message })
            } else {
                this.setState({ visible: 'login' })
            }
        })
    }

    handleLogin = (username, password) =>
        logic.loginUser(username, password, error => {
            if (error) return this.setState({ error: error.message })

            logic.retrieveUser((error, user) => {
                if (error) return this.setState({ error: error.message })

                this.setState({ visible: 'home', name: user.name })
            })
        })

    componentDidMount() {
        logic.isUserLoggedIn && logic.retrieveUser((error, user) => {
            if (error) return this.setState({ error: error.message })

            this.setState({ name: user.name })
        })
    }

    render() {
        const {
            state: { lang, visible, error, name },
            handleLanguageChange,
            handleRegisterNavigation,
            handleLoginNavigation,
            handleRegister,
            handleLogin
        } = this

        return (
            <Fragment>
                <LanguageSelector onLanguageChange={handleLanguageChange} />

                {visible === 'landing' && <Landing lang={lang} onClickRegister={handleRegisterNavigation} onClickLogin={handleLoginNavigation} />}

                {visible === 'register' && <Register lang={lang} onRegister={handleRegister} error={error} />}

                {visible === 'login' && <Login lang={lang} onLogin={handleLogin} error={error} />}

                {visible === 'home' && <Home lang={lang} name={name} />}
            </Fragment>
        )
    }
}