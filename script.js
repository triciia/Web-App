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
        let address = data.records[i].fields["address"]
        let neighborhood = data.records[i].fields["neighborhood"];
        let description = data.records[i].fields["description"];

        newHtml += `
             <div class="col-md-4 store-card">
            <div class="card">
              ${logo ? `<img src="${logo[0].url}" alt="Photo of ${name}">` : ``}
              <div class="card-body">
                <h5 class="card-title">
                   ${name}
                </h5>
                <p>${address}</p>
                <a class="mt-1 btn btn-primary mt-2" href="stores.html?id=${
                  data.records[i].id
                }">Learn more!</a>
              </div>
            </div>
          </div>
    
    
        
        `;
      }

      getResultElement.innerHTML = newHtml;
    });
}

// function for our detail view
async function getOneRecord(id) {
  let getResultElement = document.getElementById("brews");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer patJ16XFNlD2ArGQb.8cd313c86b92e2a506b233aa9294ce69a905a6ceabf0079ab1e3ef940f6b317a`,
    },
  };

  await fetch(
    `https://api.airtable.com/v0/appwpo3UidxK3Lgsh/Record%20Store%20Locations/${id}`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // response is a single object
       getResultElement.innerHTML = "";

       let newHtml = "";

      let image = data.fields["img"];
      let name = data.fields["name"];
      let address = data.fields["Address"];
      let zip = data.fields["zip"];
      let neighborhood = data.fields["neighborhood"];
      let description = data.fields["description"];
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

       newHtml = `
             <div class="row">
          <div class="col">
            ${
              image
                ? `<img class="details-image" src="${image[0].url}" alt="Photo of ${name}">`
                : ``
            }
            
          </div>
          </div>

              `;

      getResultElement.innerHTML = newHtml;
    });
}

let idParams = window.location.search.split("?id=");
if (idParams.length >= 2) {
  getOneRecord(idParams[1]);
} else {
  getAllRecords();
}
