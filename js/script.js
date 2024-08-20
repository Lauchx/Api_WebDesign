/*let mysql = require('mysql');

let conect = mysql.createConnection({
    host:"%",
    database: "puertas",
    user:"Lautaro",
    password:""
});

conect.connect(function(error){
    if(error)
    {
        throw error;
    }
    else{
        console.log("Conexion exitosa")
    }
})
    */
const apiGroups = [];
function getApiJson() {
    return new Promise((resolve, reject) => {
        fetch("http://localhost:3000/api/data").then(api => {
            if (!api.ok) {
                throw new Error('Error en la red');
            }
            return api.json();
        }).then(api => {
            resolve(api.groups)
        }).catch(error => {

            throw Error("Error en fetch: ", error);
        })
    })
}

getApiJson()
    .then(apiGroups => {
        let tbody = document.getElementById("Groups").getElementsByTagName("tbody")[0]
        tbody.innerHTML = "";
        apiGroups.forEach(apiGroups => {
            let newRow = tbody.insertRow();
            let cellGroup = newRow.insertCell();
            let cellTeams = newRow.insertCell();

            cellGroup.innerHTML = apiGroups.group;
            cellTeams.innerHTML = apiGroups.team1 + "<br>";
            cellTeams.innerHTML += apiGroups.team2 + "<br>";
            cellTeams.innerHTML += apiGroups.team3 + "<br>";
            cellTeams.innerHTML += apiGroups.team4 + "<br>";
        })
        .catch(error => {
                throw Error("Error en Promise: ", error);
            })
    })


function addObject() {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest()
        xhr.open('POST', "http://localhost:3000/api/data/predictions")
        xhr.setRequestHeader('Content-Type', 'application/json')

        var object = JSON.stringify({
            'name': document.getElementById('teamName').value,
        })
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response)
            } else {
                reject(Error(xhr.status + " " + xhr.statusText))
            }
        }
        xhr.onerror = function () {
            reject(Error('Error: unexpected network error.'))
        }
        xhr.send(object)
    })
}
function addPrediction(){
    let tbody = document.getElementById('').
}
function deleteObjet() {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest()
        xhr.open('DELETE', "http://localhost:3000/api/data/${id}")
        xhr.setRequestHeader('Content-Type', 'application/json')

        var object = JSON.stringify({
            'id': document.getElementById('name').value,
        })
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response)
            } else {
                reject(Error(xhr.status + " " + xhr.statusText))
            }
        }
        xhr.onerror = function () {
            reject(Error('Error: unexpected network error.'))
        }
        xhr.send(object)
    })
}
/* function addObject() {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest()
        xhr.open('POST', "https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/cl.groups.json")
        xhr.setRequestHeader('Content-Type', 'application/json')
        var teams = JSON.stringify({
            'team1': document.getElementById('team1').value,
            'team2': document.getElementById('team2').value
        })
        var object = JSON.stringify({
            'name': document.getElementById('name').value,
            'teams': teams
        })
        xhr.onload = function () {
            if (xhr.status == 200) {
                resolve(xhr.response)
            } else {
                reject(Error(xhr.statusText))
            }
        }
        xhr.onerror = function () {
            reject(Error('Error: unexpected network error.'))
        }
        xhr.send(object)
    }) 
} */
