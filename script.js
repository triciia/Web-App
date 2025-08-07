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
        let description = data.records[i].fields["description"];

        newHtml += `
         <div class="card" style="width: 18rem;">
  <img src="${logo[0].url}" class="card-img-top card-img-all" alt="Store Logo">
  <div class="card-body">
    <h5 class="card-title">${name}</h5>
    <p class="card-text"></p>
    <a href="stores.html?id=${data.records[i].id}" class="btn btn-primary btn-all ">Learn More!</a>
  </div>
</div> 
    
        
        `;
      }

      getResultElement.innerHTML = newHtml;
    });
}

// function for our detail view
async function getOneRecord(id) {
  let jobsResultElement = document.getElementById("brews");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer pateG7pBF1CkfmcW7.2c666498dc7818660958fea1c0bb95e5e1d33bbdb4871fed8ee5696394e05ce5`,
    },
  };

  await fetch(
    `https://api.airtable.com/v0/appwpo3UidxK3Lgsh/Record%20Store%20Locations${id}`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // response is a single object

      let picture = data.fields["Picture"];
      let name = data.fields["Name"];
      let address = data.fields["Address"];
      let zip = data.fields["Zip"];
      let neighborhood = data.fields["Neighborhood"];
      let description = data.fields["Description"];
      let logo = data.fields["Logo"];
      let hours = data.fields["Hours"];
      let happy = data.fields["Happy"];
      let food = data.fields["Food"];
      let website = data.fields["Website"];
      let merchandise = data.fields["Merchandise"];
      let rating = data.fields["Rating"];
      let star = data.fields["Stars"];
      let outdoor = data.fields["Outdoor"];
      let yelp = data.fields["Yelp"];
      let map = data.fields["Map"];

      let newHtml = `
        <div class="card list mb-3">
  <div class="row g-0">
    <div class="col-md-4 d-flex justify-content-center align-items-center">
     ${
       logo
         ? `<img class="img-fluid back ms-4" alt="${name}" src="${logo[0].url}">`
         : ``
     }
    </div>

      `;

      jobsResultElement.innerHTML = newHtml;
    });
}

let idParams = window.location.search.split("?=id");
if (idParams.length >= 2) {
  getOneRecord(idParams[1]);
} else {
  getAllRecords();
}
