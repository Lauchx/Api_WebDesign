let apiData = [];
function getApiJson() {
    return new Promise((resolve, reject) => {
        fetch("https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.clubs.json").then(api => {
            if (!api.ok) {
              throw new Error('Network response was not ok');
            }
            return api.json(); 
          }).then(apis => {
            resolve(apis.clubs)
        }).catch(error => {
            
            throw Error("entro aca");
        })
    })
}

function returnApiData() {
    getApiJson().then(apisData => {
     let tbody = document.getElementById("table").getElementsByTagName("tbody")[0]
     tbody.innerHTML = "";

    
     apisData.forEach(apiData => {
        let newRow = tbody.insertRow();
        let cell1 = newRow.insertCell();
        let cell2 = newRow.insertCell();

        cell1.innerHTML = apiData.code;
        cell2.innerHTML = apiData.name;
    });

       // resolve(apisData)
    })
    .catch(error => {
        throw Error("noooo no se que paso!!!!11!! ", error);
    })
    
}