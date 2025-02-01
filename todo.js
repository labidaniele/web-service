let http = require("http");
http.createServer(function (request, response) {
   response.writeHead(200, {'Content-Type': 'text/plain'});
   response.end('Hello World!\n');
}).listen(80);

// definizione di variabili DOM, tra cui un bottone che chiamiamo "insertButton"

let todos = []; // lista dei task

const render = () => {

   // codice che genera l'html da todos

}

const send = (todo) => {

    return new Promise((resolve, reject) => {
 
       fetch("/todo/add", {
 
          method: 'POST',
 
          headers: {
 
             "Content-Type": "application/json"
 
          },
 
          body: JSON.stringify(todo)
 
       })
 
       .then((response) => response.json())
 
       .then((json) => {
 
          resolve(json); // risposta del server all'aggiunta
 
       })
 
    })
 
 }
 
 const load = () => {
 
    return new Promise((resolve, reject) => {
 
       fetch("/todo")
 
       .then((response) => response.json())
 
       .then((json) => {
 
          resolve(json); // risposta del server con la lista
 
       })
 
    })
 
 }

 insertButton.onclick = () => {

    const todo = {          
 
       name: todoInput.value,
 
       completed: false
 
    }      
 
    send({todo: todo}) // 1. invia la nuova Todo
 
     .then(() => load()) // 2. caricala nuova lista
 
     .then((json) => { 
 
       todos = json.todos;
 
       todoInput.value = "";
 
       render();  // 3. render della nuova lista
 
    });
 
 }

 load().then((json) => {

   todos = json.todos;

   render();

});