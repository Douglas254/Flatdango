// Write your code here
// Our API
const base_URL = "http://localhost:3000/films";

// Films class
function Films(
  id,
  title,
  runtime,
  capacity,
  showtime,
  tickets_sold,
  description,
  poster
) {
  (this.id = id),
    (this.title = title),
    (this.runtime = runtime),
    (this.capacity = capacity),
    (this.showtime = showtime),
    (this.tickets_sold = tickets_sold),
    (this.description = description),
    (this.poster = poster);
}

document.addEventListener("DOMContentLoaded", () => {
  getFilms();
});

// function to get all the films from the API and render them on the browser
const getFilms = () => {
  fetch(base_URL)
    .then((res) => res.json())
    .then((filmsData) => {
      //   console.log(filmsData);
      const movies = document.getElementById("films");
      filmsData.forEach((filmData) => {
        //destructure all the films data to the filmDataInfo variable
        let filmDataInfo = new Films(
          filmData.id,
          filmData.title,
          filmData.runtime,
          filmData.capacity,
          filmData.showtime,
          filmData.tickets_sold,
          filmData.description,
          filmData.poster
        );
        // console.log(filmData.id);
        const list = document.createElement("li");
        list.className = "film item";
        list.innerText = filmData.title;
        movies.append(list);

        // add onClick functionalities to the list item movies
        list.addEventListener("click", () => {
          getOneFilm(filmDataInfo.id);
        });
      });
    })
    .catch((error) => {
      throw error;
    });
};

// function to get specific film and render it on the browser
const getOneFilm = (id) => {
  fetch(`${base_URL}/${id}`)
    .then((res) => res.json())
    .then((filmData) => {
      let filmDataInfo = new Films(
        filmData.id,
        filmData.title,
        filmData.runtime,
        filmData.capacity,
        filmData.showtime,
        filmData.tickets_sold,
        filmData.description,
        filmData.poster
      );

      document.getElementById("poster").src = filmDataInfo.poster;
      document.getElementById("title").innerText = filmDataInfo.title;
      document.getElementById(
        "runtime"
      ).innerText = `${filmDataInfo.runtime} minutes`;
      document.getElementById("film-info").innerText = filmDataInfo.description;
      document.getElementById("showtime").innerText = filmDataInfo.showtime;
      document.getElementById("ticket-num").innerText =
        filmDataInfo.capacity - filmDataInfo.tickets_sold;

      document.getElementById("buy-ticket").addEventListener("click", () => {
        // console.log("clicked");
        if ((document.getElementById("ticket-num").innerText -= 1) <= 0) {
          return (document.getElementById("ticket-num").innerText = 0);
        }
      });
    })
    .catch((error) => {
      throw error;
    });
};
