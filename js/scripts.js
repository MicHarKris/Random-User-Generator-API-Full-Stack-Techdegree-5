const galleryContainer = document.getElementById('gallery');
const searchContainer = document.querySelector('.search-container');
const modalContainer = document.body;
const randomEmployeeUrl = 'https://randomuser.me/api/?results=12&nat=us';

// Two arrays for storing the fetched data and sorted data for later use.
let employeeArray = [];
let searchArray = [];

// Fetch Functions

// Fetch'es data from the API, converts the string to JSON format, and assigns them to the employeeArray, 
// for later use in functions that aren't called at this time.
function fetchData(url) {    
    return fetch(url)
        // .then(checkStatus)
        .then(response => response.json())
        .then(data => {
            employeeArray = data.results;
        })
        .catch(error => console.log('Looks like there was a problem', error));
}

// Search Functions
function createSearch(){
    const searchHTML = `
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>
    `;
    searchContainer.insertAdjacentHTML('beforeend', searchHTML);

    const searchButton = document.getElementById('search-submit');
    searchButton.addEventListener('click', searchFor);
}

function searchFor(event){
    event.preventDefault();

    removeGallery();

    const searchInput = document.querySelector('#search-input');
    const searchString = searchInput.value;
    
    if (searchString == '') {
        for (let i = 0; i < employeeArray.length; i++) {
            createGallery(employeeArray[i], i);
        }
    }

    for (let i = 0; i < employeeArray.length; i++) {
        const employee = employeeArray[i];
    
        // Convert the object to a string to perform the search
        const employeeString = JSON.stringify(employee);
    
        // Check if the search string is present in the object string
        if (employeeString.includes(searchString) && searchString != '') {
            searchArray.push(employeeArray[i]);
        }
    }

    for (let i = 0; i < searchArray.length; i++) {
        createGallery(searchArray[i], i);
    }
}

// Gallery Functions

// Removes the current gallery
function removeGallery(){
    const cards = document.getElementsByClassName('card');
    const cardsArray = Array.from(cards);

    cardsArray.forEach((card) => {
        card.remove();
        searchArray = [];
    });
}

// Creates a gallery of random employeess on the page.
function fetchGallery() {
    // Creates a 'Loading Employee List...' message on the page.
    const loadingHTML = `
    <div id="loading" class="header-inner-container">
        <h3>Loading Employee List...</h3>
    </div>
    `    
    galleryContainer.insertAdjacentHTML('beforeend', loadingHTML);
    
    // Calls the fetchData function, with a Promise.all() function, when all fetch'es concludes
    // const fetchPromises = [];
    // for (let i = 0; i < 12; i++) {
    //     fetchPromises.push(fetchData(randomEmployeeUrl));
    // }
  
    // When all the fetch promises have resolved, the 'Loading Employee List...' message is removed, 
    // and the createGallery() function is called equal to the amount of Employees successfully fetch'ed, 
    // and if the full twelve Employees are not fetch'ed, and error message is displayed after the gallery.
    fetchData(randomEmployeeUrl)
        .then(() => {
            console.log(employeeArray.length);
            const loadingText = document.getElementById(`loading`);
            loadingText.remove();

            for (let i = 0; i < employeeArray.length; i++) {
                createGallery(employeeArray[i], i);
            }

            if (employeeArray.length < 12){
                const loadErrorHTML = `
                <div id="loading" class="header-inner-container">
                    <h3>Could not load the full list of employees - please try again later.</h3>
                </div>
                `    
                galleryContainer.insertAdjacentHTML('beforeend', loadErrorHTML);
            }
        });
  }

function createGallery(data, id){
    // Gallery item HTML format is built, then added to the DOM inside the galleryContainer.
    const galleryHTML = `
    <div id="${id}" class="card">
        <div class="card-img-container">
            <img class="card-img" src="${data.picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${data.name.first} ${data.name.last}</h3>
            <p class="card-text">${data.email}</p>
            <p class="card-text cap">${data.location.city}, ${data.location.state}</p>
        </div>
    </div>
    `;
    galleryContainer.insertAdjacentHTML('beforeend', galleryHTML);

    // Reference is made to the relevant gallery element in the DOM.
    const galleryItem = galleryContainer.lastElementChild;

    // On click, the gallery item calls the createModal function, with a reference to the current targets ID number.
    galleryItem.addEventListener('click', function(event) {
        createModal(event.currentTarget.id);
    });
} 

// Modal Functions

// Creates a modal card, with an ID based on the employee selection.
function createModal(id){
    // Birthday date is formatted through a RegEx search grouping.
    const birthdayData = employeeArray[id].dob.date;
    const birthdayRegex = /^(\d{4})-(\d{2})-(\d{2})T.*/;
    const birthday = birthdayRegex.exec(birthdayData);

    // Modal Card HTML format is built, then added to the DOM inside the modalContainer.
    const modalHTML = `
        <div class="modal-container" id="modal-container-${id}">
        <div class="modal">
            <button type="button" id="modal-close-btn-${id}" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${employeeArray[id].picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${employeeArray[id].name.first} ${employeeArray[id].name.last}</h3>
                <p class="modal-text">${employeeArray[id].email}</p>
                <p class="modal-text cap">${employeeArray[id].location.city}</p>
                <hr>
                <p class="modal-text">${employeeArray[id].cell}</p>
                <p class="modal-text">${employeeArray[id].location.street.number} ${employeeArray[id].location.street.name}, ${employeeArray[id].location.city}, ${employeeArray[id].location.state} ${employeeArray[id].location.postcode}</p>
                <p class="modal-text">Birthday: ${birthday[2]}/${birthday[3]}/${birthday[1]}</p>
            </div>
        </div>

        <div class="modal-btn-container">
            <button type="button" id="modal-prev-${id}" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next-${id}" class="modal-next btn">Next</button>
        </div>
    </div>
    `;
    modalContainer.insertAdjacentHTML('beforeend', modalHTML);

    // References are made to all the relevant Modal elements in the DOM.
    const modalCard = document.getElementById(`modal-container-${id}`);
    const closeButton = document.getElementById(`modal-close-btn-${id}`);
    const prevButton = document.getElementById(`modal-prev-${id}`);
    const nextButton = document.getElementById(`modal-next-${id}`);

    //  On click, removes the modal from the DOM
    closeButton.addEventListener('click', () => {
        modalCard.remove();
    });

    // On click, creates a new modal, with an ID one lower than the current modal, and finds the same Index in the employeeArray to reference.
    // If current ID is the first index, instead the index at employeeArray.length-1 (length does not include 0) is referenced.
    // Then the previous modal is removed from the DOM.
    prevButton.addEventListener('click', () => {
        if (id == 0) {
            createModal(employeeArray.length-1);
        } else {
            createModal(parseInt(id)-1);
        }
        modalCard.remove();
    });

    // On click, creates a new modal, with an ID one higher than the current modal, and finds the same Index in the employeeArray to reference.
    // If current ID is the last index, instead the index at employeeArray.length+1 (length does not include 0) is referenced.
    // Then the previous modal is removed from the DOM.
    nextButton.addEventListener('click', () => {
        if (id == employeeArray.length-1) {
            createModal(0);
        } else {
            createModal(parseInt(id)+1);
        }
        modalCard.remove();
    });
}

// Initialization of the Gallery and the Search Field
fetchGallery();
createSearch();