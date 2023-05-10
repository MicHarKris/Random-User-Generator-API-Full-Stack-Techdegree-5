const galleryContainer = document.getElementById('gallery');
const searchContainer = document.querySelector('.search-container');
const modalContainer = document.body;
const randomUserUrl = 'https://randomuser.me/api/';
let twelveUsers = [];

// Fetch Functions
function fetchData(url) {
    return fetch(url)
        .then(checkStatus)
        .then(response => response.json())
        .then(data => {
            twelveUsers = twelveUsers.concat(data.results[0]);
            return data.results[0];
        })
        .catch(error => console.log('Looks like there was a problem', error));
}

function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
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
}

// Gallery Functions

function fetchGallery(){
    for (let i = 0; i < 12; i++){
        fetchData(randomUserUrl)
            .then(data => createGallery(data, i)
    )}
}

function createGallery(data, id){
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

    const galleryItem = galleryContainer.lastElementChild;

    galleryItem.addEventListener('click', function(event) {
        createModal(event.currentTarget.id);
    });
} 

function createModal(id){
    const birthdayData = twelveUsers[id].dob.date;
    const birthdayRegex = /^(\d{4})-(\d{2})-(\d{2})T.*/;
    const birthday = birthdayRegex.exec(birthdayData);

    const modalHTML = `
        <div class="modal-container" id="modal-container-${id}">
        <div class="modal">
            <button type="button" id="modal-close-btn-${id}" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${twelveUsers[id].picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${twelveUsers[id].name.first} ${twelveUsers[id].name.last}</h3>
                <p class="modal-text">${twelveUsers[id].email}</p>
                <p class="modal-text cap">${twelveUsers[id].location.city}</p>
                <hr>
                <p class="modal-text">${twelveUsers[id].phone}</p>
                <p class="modal-text">${twelveUsers[id].location.street.number} ${twelveUsers[id].location.street.name}, ${twelveUsers[id].location.city}, ${twelveUsers[id].location.country} ${twelveUsers[id].location.postcode}</p>
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

 
        const modalCard = document.getElementById(`modal-container-${id}`);

        const closeButton = document.getElementById(`modal-close-btn-${id}`);
        const prevButton = document.getElementById(`modal-prev-${id}`);
        const nextButton = document.getElementById(`modal-next-${id}`);


    closeButton.addEventListener('click', () => {
        modalCard.remove();
    });

    prevButton.addEventListener('click', () => {
        if (id == 0) {
            createModal(11);
        } else {
            createModal(parseInt(id)-1);
        }
        modalCard.remove();
    });

    nextButton.addEventListener('click', () => {
        if (id == 11) {
            createModal(0);
        } else {
            createModal(parseInt(id)+1);
        }
        modalCard.remove();
    });
}

// Initialization
fetchGallery();
createSearch();