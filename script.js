// API
// import { API_KEY } from "./env.js";

const tmdbCommand = "https://api.themoviedb.org/3";

const fetchMovies1 = async () => {
  const url = `${tmdbCommand}/movie/now_playing?api_key=680a234b0f0f37ebdd0a2329bb75809a&language=ko-kr&page=1`;
  const response = await fetch(url);
  const { results } = await response.json();
  return results;
};
const fetchMovies2 = async () => {
  const url = `${tmdbCommand}/movie/upcoming?api_key=680a234b0f0f37ebdd0a2329bb75809a&language=ko-kr&page=1`;
  const response = await fetch(url);
  const { results } = await response.json();
  return results;
};

const getMovies = async () => {
  const [movies1, movies2] = await Promise.all([
    fetchMovies1(),
    fetchMovies2(),
  ]);

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
      menu_bg.style.maxHeight = "340px";
      menu_bg.style.opacity = "1";
    });
    // console.log(submenus);
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
    // console.log(submenus);
  });
});
