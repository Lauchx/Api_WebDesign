let apiData = [];
function getApiJson() {
    return new Promise((resolve, reject) => {
        fetch("https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/cl.groups.json").then(api => {
            if (!api.ok) {
              throw new Error('Network response was not ok');
            }
            return api.json(); 
          }).then(apis => {
            resolve(apis.groups)
        }).catch(error => {
            
            throw Error("Error en fetch: ", error);
        })
    })
}

function returnApiData() {
    getApiJson().then(apisData => {
     let tbody = document.getElementById("Groups").getElementsByTagName("tbody")[0]
     tbody.innerHTML = "";

    
     apisData.forEach(apiData => {
        let newRow = tbody.insertRow();
        let cellGroup = newRow.insertCell();
        let cellTeams = newRow.insertCell();

        cellGroup.innerHTML = apiData.name;
        cellTeams.innerHTML = apiData.teams[0]+ "<br>";
        cellTeams.innerHTML +=  apiData.teams[1] + "<br>" ;
        cellTeams.innerHTML +=  apiData.teams[2]+ "<br>";
        cellTeams.innerHTML +=  apiData.teams[3]+ "<br>";
    });}).catch(error => {
        throw Error("Error en Promise: ", error);
    })
    
}
function addObject() {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest()
        xhr.open('POST', "https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/cl.groups.json")
        xhr.setRequestHeader('Content-Type', 'application/json')
        var data = JSON.stringify({
            'Team1': document.getElementById('team1').value,
            'Team2': document.getElementById('team2').value
        })
        var object = JSON.stringify({
            'name': document.getElementById('name').value,
            'data': data
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
}
