let apiData = [];
function getApiJson() {
    return new Promise((resolve, reject) => {
        fetch("https://pokeapi.co/api/v2/pokemon/ditto").then(api => {
            if (!api.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json(); 
          }).then(api => {
            resolve(api.results)
        }).catch(error => {
            //reject(error);
            throw Error("entro aca");
        })
    })
}

function returnApiData() {
    getApiJson().then(apiData => {
        console.log(apiData)
        resolve(apiData)
    })
    .catch(error => {
        reject(error);
        throw Error("noooo no se que paso kumpa");
    })
    console.log(apiData)
}