const title = <h1>hola mundo</h1>

const names = ['Peter', 'John', 'Erika', 'Maria']

const items = names.map(name => <li>{name}</li>)

const list = <ul>{items}</ul>

function App() {
    return [title, list]
}

ReactDOM.render(<App />, document.getElementById('root'))