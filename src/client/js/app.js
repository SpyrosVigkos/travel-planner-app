//Main Form Function
async function handleSubmit(event) {
    event.preventDefault()
    let formPlace = document.getElementById('loc-input').value;
    

    fetch('http://localhost:8080/geoNames',{
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Orign": "*",
        },
        body: JSON.stringify({formPlace: formPlace}),
    }).then(async function(){
        const dataGeoNames = await fetch("http://localhost:8080/all");
        const GeoNamesJson = await dataGeoNames.json();
        updateUI(GeoNamesJson);

    })


}

//Update UI Function after calling  

async function updateUI(result){
    ///Results after successful submission 
    const planResults = document.getElementById("planner-results");
    //Show 
    planResults.style.display = 'flex';
    //Update place info
    const cityPlan = document.getElementById('city');
    const countryPlan = document.getElementById('country');
    cityPlan.innerHTML = result.city;
    countryPlan.innerHTML = result.country;


}
export{handleSubmit, updateUI}