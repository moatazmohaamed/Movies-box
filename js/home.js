// handling if user changed the url without login
const username = document.getElementById(`name`)
const logOutBtn = document.getElementById("logOutBtn");
const rowData = document.getElementById("rowData")
const data = document.getElementById("data")
const moviesBtn = document.getElementById("moviesBtn")
const movies = document.getElementById("movies")
const searchInput = document.getElementById("searchInput")
const alertMsg = document.getElementById("alertMsg")
const user = localStorage.getItem("userName");
AOS.init();


logOutBtn.addEventListener("click", function () {
    localStorage.removeItem(`userName`)
    location.href = './index.html';
})

const href = location.href;
if (user === null && href.includes('/home')) {
    location.replace('./index.html');
}

setTimeout(() => {
    let heading = `<h4 class="alert-heading">Welcome ${user} 👋</h4>`;
    alertMsg.insertAdjacentHTML('beforeend', heading);
    setTimeout(() => {
        alertMsg.remove()
    }, 2000)
}, 1000);
/* ---------------------------------------- */

// Swiper inint
const progressCircle = document.querySelector(".autoplay-progress svg");
const progressContent = document.querySelector(".autoplay-progress span");
document.addEventListener('DOMContentLoaded', function () {
    new Swiper(".mySwiper", {
        centeredSlides: true,
        rewind: true,
        pagination: {
            el: ".swiper-pagination",
            dynamicBullets: true,
            clickable: true,
        },
        keyboard: {
            enabled: true,
        },
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        on: {
            autoplayTimeLeft(s, time, progress) {
                progressCircle.style.setProperty("--progress", 1 - progress);
                progressContent.textContent = `${Math.ceil(time / 1000)}s`;
            }
        }
    });
});

// Movies api
moviesApi()


async function moviesApi() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzlhMWQ1MGY5NWMxNGEyZmM1YzNiZjNjMzE2ZGFlNiIsIm5iZiI6MTc0MDI2NTM3My45ODUsInN1YiI6IjY3YmE1NzlkYWJlZWRlMzZjNDQ2NjFjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2pkRpvA1zaoUk4XmORydtep-jnhLJLL2Z3Pui1Q2UUI'
        }
    };

    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
        .then(res => res.json())
        .then(api => {
            displayMovies(api)
        })
        .catch(err => console.error(err));


    const options2 = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzlhMWQ1MGY5NWMxNGEyZmM1YzNiZjNjMzE2ZGFlNiIsIm5iZiI6MTc0MDI2NTM3My45ODUsInN1YiI6IjY3YmE1NzlkYWJlZWRlMzZjNDQ2NjFjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2pkRpvA1zaoUk4XmORydtep-jnhLJLL2Z3Pui1Q2UUI'
        }
    };

    fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options2)
        .then(res => res.json())
        .then(res => {
            newArrival(res)
        })
        .catch(err => console.error(err));
}

function displayMovies(api) {
    const {
        results
    } = api
    let movie = []
    for (const movies of results.slice(0, 4)) {
        movie += `
                <div class="col">
                      <div  class="card">
                        <img class="card-img-top" src="https://image.tmdb.org/t/p/w500${movies.poster_path}" alt="${movies.title}"  onclick="navToDetails(${movies.id})" />
                        <div class="card-body">
                            <h4 class="card-title mb-3">${movies.title}</h4>
                            <p class="card-text">${movies.overview.slice(0,100)}</p>
                        </div>
            </div>
                
                
                </div>
            `
    }
    rowData.insertAdjacentHTML('beforeend', movie)
}

function newArrival(api) {
    const {
        results
    } = api
    let movie = []
    for (const movies of results.slice(0, 12)) {
        movie += `
            <div  data-aos="fade-right" class="card my-4 ">
                        <img  role="button" class="card-img-top" src="https://image.tmdb.org/t/p/w500${movies.poster_path}" alt="${movies.title}" onclick="navToDetails(${movies.id})" />
                        <div class="card-body">
                            <h4 class="card-title mb-3">${movies.title}</h4>
                            <p class="card-text">${movies.overview.slice(0,100)}</p>
                        </div>
            </div>
            `
    }
    data.insertAdjacentHTML('afterbegin', movie)
}

window.navToDetails = function (movieId) {
    location.href = `./details.html?id=${movieId}`;
};

searchInput.addEventListener('keydown', (e) => {
    if (e.key == "Enter") {
        location.href = `./search.html?name=${searchInput.value}`;
    }
})

moviesBtn.addEventListener('click', () => {
    location.href = '/allmovies.html'
})

movies.addEventListener('click', () => {
    location.href = '/allmovies.html'
})