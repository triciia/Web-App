"use strict";

// function for our list view
async function getAllRecords() {
  let getResultElement = document.getElementById("records");

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
                <p class = "address">${address}</p>
                <a class="mt-1 btn btn-primary mt-2 " href="stores.html?id=${
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
  let getResultElement = document.getElementById("records");

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
      let name = data.fields["Name"];
      let address = data.fields["address"];
      let zip = data.fields["zip"];
      let neighborhood = data.fields["neighborhood"];
      let phone = data.fields["phone"];
      let description = data.fields["description"];
      let logo = data.fields["Logo"];
      let storeHours = data.fields["hours"];
      let website = data.fields["url"];
      let yelp = data.fields["Yelp"];
      let email = data.fields["Email"];
      let rating = data.fields["rating"];
      let buy = data.fields["buy?"];

       let hoursHtml = "";
      if ("hours" in data.fields) {
        hoursHtml += "<ul>";
        let hours = data.fields["hours"].split("\n\n");
        for (let i = 0; i < hours.length; i++) {
          hoursHtml += `<li>${hours[i]}</li>`;
        }
        hoursHtml += "</ul>";
      }

      newHtml = `
      <div class = "details-container">
  <div class="row">
    <a class="back-button btn w-auto col-3" href="./stores.html">Back to All Stores </a>
  </div>
  <div class="row">
    <div class="col">
      ${
        image
          ? `<img class="details-image" src="${image[0].url}" alt="Photo of ${name}">`
          : ``
      }
      <h4>Check out their website!</h4>
       <i class="bi bi-globe me-2"></i><a href="${website}" target="_blank">${name}</a>
      <hr>
      <h4>Contact</h4>
      <p><i class="bi bi-telephone me-2"></i>${phone || ''}</p>
      <p><i class="bi bi-envelope me-2"></i>${email || ''}</p>
    </div>
    <div class="col-lg-7">
      <h2 id="details-title">${name}</h2>
      <hr>
      <h4>Description</h4>
      <p>${description || ''}</p>
      <hr>
      <h4>Address</h4>
      <p class="addresses text-decoration-none">${address || ''}</p>
      <hr>
      <h4>Hours</h4>
      <p class="text-light">${hoursHtml}</p>
      <h4>Buys Used Records?</h4>
  <p>${buy ? "Yes, this store buys used records." : "No, this store does not buy used records."}</p>
    </div>
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
