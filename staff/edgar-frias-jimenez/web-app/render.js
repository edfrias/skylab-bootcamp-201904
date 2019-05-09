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
        <main class="main with--borders is--rounded">
            <h1 class="title with--borders is--rounded">Welcome to server-app</h1>
            ${body}
        </main>
    </body>
    </html>`
}

module.exports = render
