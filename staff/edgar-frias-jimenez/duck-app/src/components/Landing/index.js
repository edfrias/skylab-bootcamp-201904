import React from 'react'
import literals from './literals'
import './index.scss'

function Landing({ lang, onRegister, onLogin }) {
    const { register, or, login } = literals[lang]

    return <section className="landing" onClick={e => e.preventDefault()}>
            <section>
                <img className="landing__image" title="Quack!" src="https://i.pinimg.com/736x/0f/49/37/0f49374bcac2b14eb86dba0db32bbc05.jpg" />
                <div>
                    <a href="" onClick={() => onRegister()}>{register}</a>
                    <span>{or}</span>
                    <a href="" onClick={() => onLogin()}>{login}</a>
                </div>
            </section>
        </section>
}

export default Landing