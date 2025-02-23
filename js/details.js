const searchParams = location.search;
const params = new URLSearchParams(searchParams);
const id = params.get("id");

const detailsData = document.getElementById("detailsData")


const user = localStorage.getItem("userName");


const href = location.href;
if (user === null && href.includes('/details')) {
    location.replace('./index.html');
}


detailsAPI()

function detailsAPI() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzlhMWQ1MGY5NWMxNGEyZmM1YzNiZjNjMzE2ZGFlNiIsIm5iZiI6MTc0MDI2NTM3My45ODUsInN1YiI6IjY3YmE1NzlkYWJlZWRlMzZjNDQ2NjFjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2pkRpvA1zaoUk4XmORydtep-jnhLJLL2Z3Pui1Q2UUI'
        }
    };

    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
        .then(res => res.json())
        .then(res => {
            detailsMovie(res)
            console.log(res);
        })
        .catch(err => console.error(err));
}

function detailsMovie(api) {
    let detailsPage = `
                <div    class="col-md-4">
                    <img  src="https://image.tmdb.org/t/p/w500${api.poster_path}"" class="w-100" alt="${api.title}">
                </div>

                <div  class="col-md-8">
                    <h3 class="fs-2">Title: ${api.title}</h3>
                    <p>Category: <span class="badge text-bg-secondary text-uppercase">${api.genres[0].name}</span></p>
                    <p>popularity: <span class="badge text-bg-secondary">${api.popularity}</span></p>
                    <p>Realese date: <span class="badge text-bg-secondary">${api.release_date}</span></p>
                    <p class="fs-4 fw-fw-semibold">${api.overview}</p>
                    <a class="fs-5 btn btn-dark text-white" target="_blank" href="${api.homepage}">Movie's Page
                        </a>
                </div>

                
                `
    detailsData.insertAdjacentHTML("afterbegin", detailsPage)
    document.title = api.title

}

document.getElementById("navHome").addEventListener('click', () => [
    location.href = '/home.html'
])