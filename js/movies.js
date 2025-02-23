const movieData = document.getElementById('movieData')
const loading = document.getElementById('loading')
const user = localStorage.getItem("userName");


const href = location.href;
if (user === null && href.includes('/allmovies')) {
    location.replace('./index.html');
}

// Events
document.querySelectorAll(".menu a").forEach(function (link) {
    link.addEventListener("click", function (e) {
        document.querySelector(".menu .active").classList.remove("active");
        e.target.classList.add("active");
        filterMovies(e.target.dataset.category)
        console.log(e.target.dataset.category);
    });
});
filterMovies('action')

async function filterMovies(genres) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzlhMWQ1MGY5NWMxNGEyZmM1YzNiZjNjMzE2ZGFlNiIsIm5iZiI6MTc0MDI2NTM3My45ODUsInN1YiI6IjY3YmE1NzlkYWJlZWRlMzZjNDQ2NjFjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2pkRpvA1zaoUk4XmORydtep-jnhLJLL2Z3Pui1Q2UUI'
        }
    };

    loading.classList.remove('d-none')
    fetch(`https://api.themoviedb.org/3/search/movie?query=${genres}&include_adult=false&include_video=true&language=en-US&page=1`, options)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            displayMovies(res)
            loading.classList.add('d-none')
        })
        .catch(err => console.error(err));

}


function displayMovies(api) {
    const {
        results
    } = api
    let wrapper = ''
    for (const mov of results) {
        wrapper += `
            <div  class="col">
                    <div   class="card my-4      ">
                        <img role="button" class="card-img-top" src="https://image.tmdb.org/t/p/w500${mov.poster_path}" alt="${mov.title}" onclick="navToDetails(${mov.id})" />
                        <div class="card-body">
                            <h4 class="card-title mb-3">${mov.title}</h4>
                            <p class="card-text">${mov.overview.slice(0,100)}</p>
                        </div>
            </div>
            </div>
        `
    }
    movieData.innerHTML = wrapper
}

window.navToDetails = function (movieId) {
    location.href = `./details.html?id=${movieId}`;
};