const express = require("express");
const fs = require("fs");
const cors = require('cors');

const server = express();
server.use(express.json());

server.listen(3001, () => {
  console.log("server server");
});

server.use(cors());

server.get("/", (req, res) => {
  fs.readFile("./todos.json", (err, data) => {
    res.send(JSON.parse(data));
  },
  );
});

server.post("/", (req, res) => {
  const { body } = req;
  fs.readFile("./todos.json", (err, data) => {
    const db = JSON.parse(data);
    
    db.toDoList.push(req.body);

    fs.writeFile("./todos.json", JSON.stringify(db), (err) => {
      if (err) {
        console.log("error", err);
      } else {
        res.send(db);
      }
    });
  });
});

server.delete('/', (req, res) => {
  fs.readFile('./todos.json', (err, data) => {
    const db = JSON.parse(data);
    const newTodos = db.todos.filter(todo => req.body.id !== todo.id)
    db.todos = newTodos;

    fs.writeFile("./todos.json", JSON.stringify(db), (err) => {
      if (err) {
        console.log("error", err);
      } else {
        res.send(db);
      }
    });
  })
});

server.put('/', (req, res) => {
  fs.readFile('./todos.json', (err, data) => {
    const db = JSON.parse(data);
    const { body } = req;
    const idx = db.todos.findIndex(todo => req.body.id === todo.id);
    db.todos[idx].completed = !db.todos[idx].completed;

    fs.writeFile("./todos.json", JSON.stringify(db), (err) => {
      if (err) {
        console.log("error", err);
      } else {
        res.send(db);
      }
    });
  })
});


//корсы
//сделать добавление, удаление, создание, обновление(изменение complete)