const data = document.getElementById('data')
const loading = document.getElementById('loading')
const searchParams = location.search;
const params = new URLSearchParams(searchParams);
const movieName = params.get("name");

const user = localStorage.getItem("userName");


const href = location.href;
if (user === null && href.includes('/search')) {
    location.replace('./index.html');
}


searchAPI()

async function searchAPI() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzlhMWQ1MGY5NWMxNGEyZmM1YzNiZjNjMzE2ZGFlNiIsIm5iZiI6MTc0MDI2NTM3My45ODUsInN1YiI6IjY3YmE1NzlkYWJlZWRlMzZjNDQ2NjFjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2pkRpvA1zaoUk4XmORydtep-jnhLJLL2Z3Pui1Q2UUI'
        }
    };
    loading.classList.remove('d-none')

    fetch(`https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`, options)
        .then(res => res.json())
        .then(res => {
            if (res.results && res.results.length > 0) {
                displaySearchedMovie(res)
            } else {
                swal({
                    title: "Try Again!",
                    text: `No Movie with name ${movieName}`,
                    icon: "error",
                    button: "Back to home"
                }).then(() => {
                    location.href = '/home.html';
                });
            }
            loading.classList.add('d-none')

        })
        .catch(err => console.error(err));
}

function displaySearchedMovie(api) {
    const {
        results
    } = api
    let wrapper = ''
    for (const mov of results) {
        wrapper = `
            <div class="col">
                    <div   class="card my-4 ">
                    <div class="card-body">
                    <img  role="button" class="card-img-top" src="https://image.tmdb.org/t/p/w500${mov.poster_path}" alt="${mov.title}" onclick="navToDetails(${mov.id})" />
                        <h4 class="card-title mb-3">${mov.title}</h4>
                        <p class="card-text">${mov.overview.slice(0,100)}</p>
                    </div>
            </div>
            </div>
        `
        data.insertAdjacentHTML('afterbegin', wrapper)
        document.title = mov.title
    }
}
document.getElementById("navHome").addEventListener('click', () => [
    location.href = '/home.html'
])

window.navToDetails = function (movieId) {
    location.href = `./details.html?id=${movieId}`;
};