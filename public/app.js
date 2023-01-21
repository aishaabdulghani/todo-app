import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-analytics.js";
import { getDatabase, push, set, ref, onValue, update, remove } from "https://www.gstatic.com/firebasejs/9.6.5/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyDSKKwI5fR0sPB1ExgHP8HS6PugEK5scYM",
//     authDomain: "todo-connected-with-database.firebaseapp.com",
//     projectId: "todo-connected-with-database",
//     storageBucket: "todo-connected-with-database.appspot.com",
//     messagingSenderId: "159771918538",
//     appId: "1:159771918538:web:a69fcfa6f0daa6e5c13433",
//     measurementId: "G-RWBXB8GE2Y"
// };
const firebaseConfig = {
    apiKey: "AIzaSyApQOh_jvgXuiHzPAfYCjDBE0bdszLUTaA",
    authDomain: "todo-app-882e0.firebaseapp.com",
    projectId: "todo-app-882e0",
    storageBucket: "todo-app-882e0.appspot.com",
    messagingSenderId: "642008203406",
    appId: "1:642008203406:web:571abfb549b8851ee549df",
    measurementId: "G-5YQP1L984B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const Db = getDatabase()

//FIreBase Khtm//


window.addingValue = function () {
    var obj = {
        todo: document.getElementById('a').value
    }
    if (obj.todo == '') {
        alert('Please Enter Value')
        return;
    }
    var Userref = push(ref(Db, 'Todos/'))
    obj.id = Userref.key

    set(Userref, obj)
}


window.get = function () {
    var render = document.getElementById('render')
    onValue(ref(Db, 'Todos/'), function (todo) {
        render.innerHTML = ""
        var Todos = Object.values(todo.val())
        if (Todos.length > 0) {
            document.getElementById('render').style.display = 'block';
            for (var i = 0; i < Todos.length; i++) {
                var app = Todos[i]
                console.log(app.todo)
                render.innerHTML += `<p class="text-center text-dark d-flex justify-content-between ms-3 pt-3">TODO : ${app.todo}   <button onclick="TodoUpdate('${app.id}')" class="btn bg-success p-2 px-5  text-light">EDIT</button>
                <button onclick="Tododel('${app.id}')" class="btn bg-danger text-center p-2 px-5  text-light">DELETE</button> </p> <br/>`

            }
            var a = document.getElementById('a').value = ""
        }

    })
}
get()
window.Tododel = function (id) {
    remove(ref(Db, `Todos/${id}`))
}
window.deleteAll = function (id) {
    remove(ref(Db, `Todos/`))
}

window.TodoUpdate = function (id) {
    // console.log(id);
    var NewTodo = prompt('Enter Update')
    if (NewTodo == '' || NewTodo == undefined) {
        alert('Please Enter Value')
        return
    }
    update(ref(Db, `Todos/${id}`), {
        todo: NewTodo
    })
}
