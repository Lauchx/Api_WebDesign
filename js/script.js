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
const apiGroups = []
function getApiJsonGroups() {
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
// I wil create a get method for "predictions". This way, if the user refreshes the page the predictions won´t be delete in the page 
getApiJsonGroups()
    .then(apiGroups => {
        let tbodyGroups = document.getElementsByTagName("tbody")[0]
        tbodyGroups.innerHTML = ""
        apiGroups.forEach(apiGroups => {
            let newRowTeams = tbodyGroups.insertRow()
            let cellGroup = newRowTeams.insertCell()
            let cellTeams = newRowTeams.insertCell()

            cellGroup.innerHTML = apiGroups.group;
            cellTeams.innerHTML = apiGroups.team1 + "<br>"
            cellTeams.innerHTML += apiGroups.team2 + "<br>"
            cellTeams.innerHTML += apiGroups.team3 + "<br>"
            cellTeams.innerHTML += apiGroups.team4 + "<br>"
        })
    })

const apiPredictions = []
function getApiJsonPredictions() {
    return new Promise((resolve, reject) => {
        fetch("http://localhost:3000/api/data").then(api => {
            if (!api.ok) {
                throw new Error('Error en la red');
            }
            return api.json();
        }).then(api => {
            resolve(api.predictions)
        }).catch(error => {
            throw Error("Error en fetch: ", error);
        })
    })
}
getApiJsonPredictions()
    .then(apiPredictions => {
        let tbodyPredictions = document.getElementsByTagName('tbody')[1]
        tbodyPredictions.innerHTML = ""
        apiPredictions.forEach(apiPredictions => {
            let newRowPredictions = tbodyPredictions.insertRow()
            let cellPredictions = newRowPredictions.insertCell()
            cellPredictions.innerHTML = apiPredictions.teamName + `<button onclick='deleteTeam(${apiPredictions.id})'>Delete</button>` + `<button onclick='upgradeTeam(${apiPredictions.id})'>Upgrade</button>`

            // piendo que si pongo id="apiPredictions.id" en un div o en alguna tag => puedo hacer que una tag tenga el id, asi borrarla. sino tambien lo puedo hacer que el boton tenga el id, y hacer un parentNode.remove().
            // es decir darle el id al botton, y borrar el padre, que en este caso es la row de la tabla.
        })

    })

function addTeam() {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest()
        xhr.open('POST', "http://localhost:3000/api/data/predictions")
        xhr.setRequestHeader('Content-Type', 'application/json')

        var team = JSON.stringify({
            'name': document.getElementById('teamName').value,
        })
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response)
            } else {
                reject(Error(xhr.status + " " + xhr.statusText))
            }
        }
        let tbody = document.getElementsByTagName('tbody')[1]

        let newRow = tbody.insertRow()
        let cellTeams = newRow.insertCell()
        let button = `<button onclick='deleteTeam()'></button>` // I need apiPredictions.id
        cellTeams.innerHTML = document.getElementById('teamName').value + button

        xhr.send(team)
    })
}

function deleteTeam(teamId) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest()
        xhr.open('DELETE', `http://localhost:3000/api/data/${teamId}`)
        xhr.setRequestHeader('Content-Type', 'application/json')

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
        xhr.send()
        getApiJsonPredictions()
    })
}


function upgradeTeam(teamId){
    let teamName = prompt("Nuevo nombre del equipo")
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest()
        xhr.open('PUT', `http://localhost:3000/api/data/${teamId}`)
        xhr.setRequestHeader('Content-Type', 'application/json')

        var team = JSON.stringify({
            'id': teamId,
            'name': teamName,
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
        xhr.send(team)
        getApiJsonPredictions()
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
