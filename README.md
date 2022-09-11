Usage


<!-- Development -->
javascript: fetch('http://127.0.0.1:3000/client.js')
    .then(
        resp => resp.text()
            .then(text => eval(text))
    )

<!-- Production -->