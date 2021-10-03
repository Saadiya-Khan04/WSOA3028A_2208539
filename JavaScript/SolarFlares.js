function fetchData()
{
  fetch('https://api.nasa.gov/DONKI/FLR?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=edpcJZECdLNrtxoA503TIHd8NtrhheSBW7lqT7vg')
  .then(response => {
    console.log(response);
    
    return response.json()

   .catch(error => {
    console.log(error)
   }); 

  })

  .then(data => {
    console.log(data); 

    //.map creates an array
    const display = data.map(flareInfo => { 
     return `
     <article class="Flares">
     <p>Date And Time:  ${flareInfo.beginTime } </p>
     <p>Flare ID:  ${flareInfo.flrID } </p>
     <p>Peak Time:  ${flareInfo.peakTime } </p>
     </article>
     `;
    })

    //.join creates and returns a new string by adding the elements in the array
    .join("");

    console.log(display);

    document.getElementById("site").innerHTML = display; 
  }) 
}
fetchData(); 

// API Key: edpcJZECdLNrtxoA503TIHd8NtrhheSBW7lqT7vg


