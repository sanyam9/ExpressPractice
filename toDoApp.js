const express = require("express")

const app = express()
const PORT = 3000

app.use(express.json())

let idCount = 1
var toDoList = []

app.get('/tasks', (request, response) => {
    response.status(200)
    response.send(toDoList)
})

app.get('/task/:id', (request, response) => {
    const {idToSearch} = request.params
    toDoList.forEach(task => {
        if (task.id === parseInt(idToSearch)) {
            response.status(200).send(task)
        }
    })

})

app.post('/tasks', (request, response) => {
    let newTask = request.body
    newTask = { "id": idCount++, ...newTask, "isComplete": false }
    toDoList.push(newTask)
    response.status(201).send(newTask)
})

app.delete('/task/:id', (request, response) => {
    const {idToDelete} = request.params
    toDoList = toDoList.filter(task => task.id !== parseInt(idToDelete))
    response.status(200).send()
})

app.patch('/task/:id', (request, response) => {
    const {idToModify} = request.params
    const indexInArray = toDoList.findIndex(task => task.id === parseInt(idToModify))
    const newTask = request.body
    for (key of Object.keys(newTask)) {
        toDoList[indexInArray][key] = newTask[key]
    }
    response.status(200).send(toDoList[indexInArray])
})

app.put('/task/:id', (request, response) => {
    const {idToModify} = request.params
    const indexInArray = toDoList.findIndex(task => task.id === parseInt(idToModify))
    const newTask = request.body
    for (key of Object.keys(newTask)) {
        toDoList[indexInArray][key] = newTask[key]
    }
    response.status(200).send(toDoList[indexInArray])
})

app.listen(PORT, (error) => {
    if (!error) {
        console.log(`Server running successfullt at port ${PORT}`);
    }
    else {
        console.log("Error occurred! Server failed to run");
    }
})