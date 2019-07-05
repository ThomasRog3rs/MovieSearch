const moviesContainer = document.getElementById('movies');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchText');
let errMsg = '';

searchForm.addEventListener('submit', e => {
  let search = searchInput.value;
  if (search != '') {
    getMovies(search);
  } else {
    errMsg = `<div class="alert alert-warning" style="width: 100%">
      <h4 class="alert-heading">Warning!</h4>
      <p class="mb-0">please enter something</p>
    </div>`;
    moviesContainer.innerHTML = errMsg;
  }
  e.preventDefault();
});

function getMovies(searchText) {
  axios
    .get(`http://www.omdbapi.com/?i=tt3896198&apikey=f5c1c3a7&s=${searchText}`)
    .then(res => {
      let movies = res.data.Search;
      //console.log(movies);
      if (movies == undefined) {
        errMsg = `<div class="alert alert-warning" style="width: 100%">
        <h4 class="alert-heading">Warning!</h4>
        <p class="mb-0">We could not find a movie with the name '${searchText}'</p>
      </div>`;
        moviesContainer.innerHTML = errMsg;
      } else {
        displayMovies(movies, searchText);
      }
    })
    .catch(err => {
      alert(err);
    });
}

function displayMovies(movies) {
  let html = '';
  movies.forEach(movie => {
    //console.log(movie);
    html += `<div class="col-lg-4 col-sm-12 mb-3">
        <div class="card">
          <h3 class="card-header">${movie.Title}</h3>
          <img
            style="height: 200px; width: 100%; display: block;"
            src=${movie.Poster}
            alt="Card image"
          />
          <a target="_blank" href="https://www.imdb.com/title/${
            movie.imdbID
          }/" class="card-link btn btn-primary">View More</a>
        </div>
        </div>`;
    console.log(movie);
    console.log(html);
  });
  moviesContainer.innerHTML = html;
}
