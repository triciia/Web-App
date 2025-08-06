"use strict";

// function for our list view
async function getAllRecords() {
  let getResultElement = document.getElementById("brews");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer patJ16XFNlD2ArGQb.8cd313c86b92e2a506b233aa9294ce69a905a6ceabf0079ab1e3ef940f6b317a`,
    },
  };

  await fetch(
    `https://api.airtable.com/v0/appwpo3UidxK3Lgsh/Record%20Store%20Locations`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // response is an object w/ .records array

      getResultElement.innerHTML = ""; // clear brews

      let newHtml = "";

      for (let i = 0; i < data.records.length; i++) {
        let logo = data.records[i].fields["logo"]; // here we are getting column values
        let name = data.records[i].fields["Name"]; //here we are using the Field ID to fecth the name property
        let neighborhood = data.records[i].fields["neighborhood"];
        let description = data.records[i].fields["description"]

        

        newHtml += `
         <div class="card" style="width: 18rem;">
  <img src="${logo[0].url}" class="card-img-top" alt="Store Logo">
  <div class="card-body">
    <h5 class="card-title">${name}</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div> 
    
        
        `;
      }

      getResultElement.innerHTML = newHtml;
    });
}

getAllRecords();