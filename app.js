const url = 'https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json';
let userData = [];
async function asyncAwait(){
    const response = await fetch(url);
    const data = response.json();
    return data;
}
let fetchedData = asyncAwait();
fetchedData.then(response => {
    userData = response;
    const firstNameHeading = document.querySelector(".first-name-heading");
    const lastNameHeading = document.querySelector(".last-name-heading");
    const ageHeading = document.querySelector(".age-heading");
    const emailHeading = document.querySelector(".email-heading");
    const websiteHeading = document.querySelector(".website-heading");
    function clearPage(){
        firstNameHeading.innerHTML = '<h4>First Name</h4>';
        lastNameHeading.innerHTML = '<h4>Last Name</h4>';
        ageHeading.innerHTML = '<h4>Age</h4>';
        emailHeading.innerHTML = '<h4>Email</h4>';
        websiteHeading.innerHTML = '<h4>Website</h4>';
    }
    function pagination(){
        let currentPage = 1;
        let userTrimData = userData.filter(item=> item.id >= (currentPage * 10) - 9 && item.id <= currentPage * 10);
        // Targetting the pagination container
        const paginationContainer = document.querySelector(".pagination");
        const backwardButton = document.createElement("button");
        backwardButton.classList.add("backward-button");
        backwardButton.innerHTML = `<i class="fas fa-backward"></i>`;
        paginationContainer.appendChild(backwardButton);
        for(let i=1; i<=50; i++){
            const pageButton = document.createElement("button");
            pageButton.classList.add("pagination-button");
            pageButton.textContent = i;
            paginationContainer.appendChild(pageButton);
        }
        const forwardButton = document.createElement("button");
        forwardButton.classList.add("forward-button");
        forwardButton.innerHTML = `<i class="fas fa-forward"></i>`;
        paginationContainer.appendChild(forwardButton);
        // Targetting pages
        const paginationButtons = document.querySelectorAll(".pagination button");
        paginationButtons[0].style.pointerEvents = 'none';
        paginationButtons.forEach(item =>{
            item.addEventListener("click", ()=>{
                if(parseInt(item.innerHTML)){
                    currentPage = parseInt(item.innerHTML);
                    if(currentPage === 1){
                        backwardButton.style.pointerEvents = 'none';
                        forwardButton.style.pointerEvents = 'auto';
                    }
                    else if(currentPage === 50){
                        backwardButton.style.pointerEvents = 'auto';
                        forwardButton.style.pointerEvents = 'none';
                    }
                    else{
                        backwardButton.style.pointerEvents = 'auto';
                        forwardButton.style.pointerEvents = 'auto';
                    }
                    
                    let userTrimData = userData.filter(item => {
                        return item.id >= (currentPage * 10) - 9 && item.id <= currentPage * 10;
                    });
                    clearPage();
                    renderData(userTrimData);
                    
                }
                else{
                    if(item === backwardButton){
                        currentPage--;
                        if(currentPage === 1){
                            backwardButton.style.pointerEvents = 'none';
                            forwardButton.style.pointerEvents = 'auto';
                        }
                    }
                    else if(item === forwardButton){
                        currentPage++;
                        if(currentPage === 50){
                            backwardButton.style.pointerEvents = 'auto';
                            forwardButton.style.pointerEvents = 'none';
                        }
                    }
                    let userTrimData = userData.filter(item => {
                        return item.id >= (currentPage * 10) - 9 && item.id <= currentPage * 10;
                    });
                    clearPage();
                    renderData(userTrimData);
                    
                }
                
            });
        });
        clearPage();
        renderData(userTrimData);
    }
    pagination();

    function renderData(userTrimData){
        for (const item of userTrimData){
            const firstName = document.createElement("p");
            firstName.classList.add("user-info-childs");
            firstName.textContent = `${item.first_name}`;
            firstNameHeading.appendChild(firstName);
            const lastName = document.createElement("p");
            lastName.classList.add("user-info-childs");
            lastName.textContent = `${item.last_name}`;
            lastNameHeading.appendChild(lastName);
            const age = document.createElement("p");
            age.classList.add("user-info-childs");
            age.textContent = `${item.age}`;
            ageHeading.appendChild(age);
            const email = document.createElement("p");
            email.classList.add("user-info-childs");
            email.textContent = `${item.email};`
            emailHeading.appendChild(email);
            const websitePara = document.createElement("p");
            websitePara.classList.add("website-para");
            const website = document.createElement("a");
            website.classList.add("website");
            website.href =  `${item.web}`;
            website.text = `${item.web}`;
            websitePara.appendChild(website)
            websiteHeading.appendChild(websitePara);
        }
    }
    // console.log(window.location);
    const searchInput = document.getElementById("search");
    const searchFont = document.querySelector(".fa-search");
    
    
    searchInput.addEventListener("keyup",(event)=>{
        
        if(event.key === 'Enter'){
            const employeeInfo = userData.filter((item)=> item.first_name.toLowerCase() === searchInput.value.toLowerCase() || item.last_name.toLowerCase() === searchInput.value.toLowerCase());
            window.location = `userProfile.html?id=${employeeInfo[0].id}`;
            searchInput.value = '';
        }
        else{
            searchFont.addEventListener("click", ()=>{
                const employeeInfo = userData.filter((item)=> item.first_name.toLowerCase() === searchInput.value.toLowerCase() || item.last_name.toLowerCase() === searchInput.value.toLowerCase());
                try{
                    if(employeeInfo.length === 0){
                        throw 'error throwed';
                    }
                    window.location = `userProfile.html?id=${employeeInfo[0].id}`;
                    searchInput.value = '';
                }
                catch(error){
                    // console.log(error);
                }
                
            });
        }
    });
});
