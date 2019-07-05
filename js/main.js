//Global vars
const moviesContainer = document.getElementById('movies');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchText');

//Listen for form submit
searchForm.addEventListener('submit', e => {
  //get the input
  let search = searchInput.value;
  //make sure the search is valid
  if (search != '') {
    //get movies based from search
    getMovies(search);
  } else {
    //display err
    alert('Warning', 'Please enter something', 'warning');
  }
  e.preventDefault();
});

const getMovies = searchText => {
  //Get movies base from search
  axios
    .get(`http://www.omdbapi.com/?i=tt3896198&apikey=f5c1c3a7&s=${searchText}`)
    .then(res => {
      //set movies (array of objects)
      let movies = res.data.Search;
      //make sure something was returned
      if (movies == undefined) {
        //tell the user no movies were found
        alert(
          'No movies found',
          `We could not find a movie with the name '${searchText}'`,
          'danger'
        );
      } else {
        //display the movies
        displayMovies(movies);
      }
    })
    .catch(err => {
      //if promise fails, alert with the err msg
      alert(err);
    });
};

const displayMovies = movies => {
  //set output var
  let html = '';
  //add to output var for each movie in the array
  movies.forEach(movie => {
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
  });
  //add to the DOM
  moviesContainer.innerHTML = html;
};

const alert = (title, msg, type) => {
  //alert types
  /**
   * warning
   * danger
   * success
   */

  //set the alert
  let alertMsg = `<div class="alert alert-${type}" style="width: 100%">
  <h4 class="alert-heading">${title}</h4>
  <p class="mb-0">${msg}</p>
</div>`;

  //add alert to the DOM
  moviesContainer.innerHTML = alertMsg;
};
