// API
// import { API_KEY } from "./env.js";

const tmdbCommand = "https://api.themoviedb.org/3";

const fetchMovies1 = async () => {
  const url = `${tmdbCommand}/movie/now_playing?api_key=d2a72e143d40bab7f709c8672b90046b&language=ko-kr&page=1`;
  const response = await fetch(url);
  const { results } = await response.json();
  return results;
};
const fetchMovies2 = async () => {
  const url = `${tmdbCommand}/movie/upcoming?api_key=d2a72e143d40bab7f709c8672b90046b&language=ko-kr&page=1`;
  const response = await fetch(url);
  const { results } = await response.json();
  return results;
};

const getMovies = async () => {
  const [movies1, movies2] = await Promise.all([
    fetchMovies1(),
    fetchMovies2(),
  ]);

  const nowplayingUl = document.querySelector(".nowplaying ul");
  const upcomingUl = document.querySelector(".upcoming ul");
  const topratedUl = document.querySelector(".toprated ul");

  // create Element
  const createElement = (movie, index, category) => {
    const {
      adult,
      genre_ids,
      id,
      overview,
      poster_path,
      release_date,
      title,
      vote_average,
    } = movie;
    const li = document.createElement("li");
    const moviePoster = document.createElement("div");
    const movieTitle = document.createElement("div");
    const movieDesc = document.createElement("div");
    const img = document.createElement("img");
    const ageLimit = document.createElement("span");
    const movieNum = document.createElement("span");
    const release = document.createElement("span");
    const vote = document.createElement("span");

    img.src = `https://image.tmdb.org/t/p/original/${poster_path}`;

    const adultKo = adult === false ? "ALL" : "18";
    ageLimit.innerText = adultKo;
    movieNum.innerText = index + 1;
    movieTitle.innerText = title;
    release.innerText = release_date;
    vote.innerText = `⭐${parseFloat(vote_average).toFixed(2)}`;
    moviePoster.className = "moviePoster";
    movieTitle.className = "movieTitle";
    movieDesc.className = "movieDesc";
    li.className = id;
    li.setAttribute("data-category", category);

    movieDesc.append(release, vote);
    moviePoster.append(img, ageLimit, movieNum);
    li.append(moviePoster, movieTitle, movieDesc);
    if (category === "nowplaying") {
      nowplayingUl.appendChild(li);
    }
  };

  // Now playing
  movies1.forEach((movie, index) => {
    createElement(movie, index, "nowplaying");
  });

  // mainSlider
  const mainSlider = document.querySelector(".mainSlider");

  movies1.forEach((movie) => {
    console.log(movie);
    const figure = document.createElement("figure");
    figure.innerHTML = `<img src="https://image.tmdb.org/t/p/original/${movie.backdrop_path}" alt="img">`;
    mainSlider.appendChild(figure);
  });

  const figures = mainSlider.querySelectorAll("figure");
  // let 변수선언은 변수를 변경할수있다.
  let currentIndex = 0;

  const showNextSlide = () => {
    figures[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % figures.length;
    figures[currentIndex].classList.add("active");
  };

  figures[currentIndex].classList.add("active");

  setInterval(showNextSlide, 3000);
};

getMovies();

// GNB
const naviLis = document.querySelectorAll(".gnb > ul > li");
// console.log(naviLis);
naviLis.forEach((naviLi) => {
  naviLi.addEventListener("mouseover", () => {
    const submenus = document.querySelectorAll(".submenu");
    const menu_bg = document.querySelector(".menu_bg");
    submenus.forEach((submenu) => {
      submenu.style.maxHeight = "270px";
      submenu.style.opacity = "1";
      menu_bg.style.maxHeight = "360px";
      menu_bg.style.opacity = "1";
    });
  });
  naviLi.addEventListener("mouseout", () => {
    const submenus = document.querySelectorAll(".submenu");
    const menu_bg = document.querySelector(".menu_bg");
    submenus.forEach((submenu) => {
      submenu.style.maxHeight = "0px";
      submenu.style.opacity = "0";
      menu_bg.style.maxHeight = "0px";
      menu_bg.style.opacity = "0";
    });
  });
});

// Accordion
const contents = document.querySelectorAll(".content");
//contents[0].style.display = "block";
const titles = document.querySelectorAll(".title");
titles.forEach((title) => {
  title.addEventListener("click", () => {
    contents.forEach((item) => {
      item.style.display = "none";
    });
    titles.forEach((item) => {
      if (item !== title) {
        item.classList.remove("active");
      }
    });
    const content = title.nextElementSibling;
    if (title.classList.contains("active")) {
      title.classList.remove("active");
      content.style.display = "none";
    } else {
      title.classList.add("active");
      content.style.display = "block";
    }
  });
});

// Search Modal
const searchBtn = document.querySelector(".fa-magnifying-glass");
const modalSearch = document.querySelector(".modal-search");
const close = document.querySelector(".close");
searchBtn.addEventListener("click", () => {
  modalSearch.classList.add("active");
});

close.addEventListener("click", () => {
  modalSearch.classList.remove("active");
});
