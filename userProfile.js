const url = 'https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json';
let userData = [];
async function asyncAwait(){
    const response = await fetch(url);
    const data = response.json();
    return data;
}
const fetchedData = asyncAwait();
fetchedData.then(response =>{
    userData = response;
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get("id"));
    const employee = userData.filter((item)=> item.id === productId);

    const head = document.querySelector(".head h2");
    head.innerHTML = `Details: ${employee[0].first_name} ${employee[0].last_name}`;
    const firstName = document.querySelector(".first-name");
    firstName.innerHTML = `First Name: <span>${employee[0].first_name}</span>`;
    const lastName = document.querySelector(".last-name");
    lastName.innerHTML = `Last Name: <span>${employee[0].last_name}</span>`;
    const companyName = document.querySelector(".company-name");
    companyName.innerHTML = `Company Name: <span>${employee[0].company_name}</span>`;
    const city = document.querySelector(".city");
    city.innerHTML = `City: <span>${employee[0].city}</span>`;
    const state = document.querySelector(".state");
    state.innerHTML = `State: <span>${employee[0].state}</span>`;
    const zip = document.querySelector(".zip");
    zip.innerHTML = `Zip: <span>${employee[0].zip}</span>`;
    const email = document.querySelector(".email");
    email.innerHTML = `Email: <span>${employee[0].email}</span>`;
    const web = document.querySelector(".web");
    web.innerHTML = `Web: <span>${employee[0].web}</span>`;
    const age = document.querySelector(".age");
    age.innerHTML = `Age: <span>${employee[0].age}</span>`;

    const homePage = document.querySelector(".fa-arrow-left");
    homePage.addEventListener("click", ()=>{
        window.location = `index.html`;
    })
});