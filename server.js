const express = require('express')

const server = express()
const PORT = 3000

server.get('/', (request,response) => {
    response.status(200)
    response.send("Hello World!")
})

server.get('/hello', (request, response) => {
    response.set('Content-Type', 'text/html') // To set header and tell the browser that the incoming data is HTML 
    response.send("<h1> Hello World </h1>")
})

server.use(express.json())
server.post('/', (request, response) => {
    const {name} = request.body
    response.send(`Welcome ${name}`)
})

server.listen(PORT, (error) => {
    if(!error){
        console.log(`Server running successfully at port: ${PORT}`)
    }
    else{
        console.log("Error occurred! Server can't run");
    }
})