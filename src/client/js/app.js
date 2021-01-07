//Main Form Function
async function handleSubmit(event) {
    event.preventDefault()
    //Input data selectors
    let formPlace = document.getElementById('loc-input').value;
    console.log("The place is ",formPlace);
    let formStart = document.getElementById('start-date').value;
    console.log("The department date is ",formStart);
    let formReturn = document.getElementById('return-date').value;
    console.log("The return date is ",formReturn);


    //Instances for days' Calculations
    const today = new Date();
    const startDate = new Date(formStart);
    const endDate = new Date(formReturn);
    
    // Calculations reference: https://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript
    //const diffTime = Math.abs(date2 - date1);
    //const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const tripTime = Math.abs(endDate - startDate);
    const tripDays = Math.ceil(tripTime / (1000 * 60 * 60 * 24));
    console.log(tripDays + " trip days")

    const toTripTime = Math.abs(startDate - today);
    const toTripDays = Math.ceil(toTripTime / (1000 * 60 * 60 * 24));
    console.log(toTripDays + " days to depart");   

    await fetch('http://localhost:3010/newTrip',{
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Orign": "*",
        },
        body: JSON.stringify({
            Location: formPlace,
            StartDate: startDate,
            EndDate: endDate,
            Duration: tripDays,
            // UntilTrip: toTripDays

        })

    });


     fetch('http://localhost:3010/geoNames',{
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Orign": "*",
        }
        
    }).then(async function(){
        const dataGeoNames = await fetch("http://localhost:3010/geoNames");
        const geoNamesJson = await dataGeoNames.json();
        console.log(`Returning the ${dataGeoNames} `);
        console.log(`Api json: ${geoNamesJson}`)
        Client.updateUI(geoNamesJson);

    }).then(res => updateUI(res));


}

//Update UI Function after calling  

function updateUI(result){
    ///Results after successful submission 
    const planResults = document.getElementById("planner-results");
    //Show 
    planResults.style.display = 'flex';
    //Update place info
    const cityPlan = document.getElementById('city');
    const countryPlan = document.getElementById('country');
    cityPlan.innerHTML = result.city;
    countryPlan.innerHTML = result.country;
    const departureDate = getElementById('departure');
    departureDate.innerHTML = result.startDate;
    const daysUntilTrip = getElementById('days');
    daysUntilTrip.innerHTML = result.toTripDays;


}
export{handleSubmit, updateUI}