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
const fetchMovies3 = async () => {
  const url = `${tmdbCommand}/movie/top_rated?api_key=d2a72e143d40bab7f709c8672b90046b&language=ko-kr&page=1`;
  const response = await fetch(url);
  const { results } = await response.json();
  return results;
};

const getMovies = async () => {
  const [movies1, movies2, movies3] = await Promise.all([
    fetchMovies1(),
    fetchMovies2(),
    fetchMovies3(),
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
    } else if (category === "upcoming") {
      upcomingUl.appendChild(li);
    } else if (category === "toprated") {
      topratedUl.appendChild(li);
    }
  };

  // Now playing
  movies1.forEach((movie, index) => {
    createElement(movie, index, "nowplaying");
  });

  //upcoming
  movies2.forEach((movie, index) => {
    createElement(movie, index, "upcoming");
  });

  // TopRated
  movies3.forEach((movie, index) => {
    createElement(movie, index, "toprated");
  });

  //moving slide
  const initializeSlider = (
    sliderSelector,
    rightArrowSelector,
    leftArrowSelector
  ) => {
    const slider = document.querySelector(sliderSelector);
    const slides = slider.querySelectorAll("li");
    const slidesToShow = 5;
    const slideWidth = 160;
    const slideMargin = 25;
    let currentIndex = 0;
    let isTransitioning = false;

    const cloneCount = slidesToShow;
    const firstClones = Array.from(slides)
      .slice(0, cloneCount)
      .map((slide) => slide.cloneNode(true));
    const lastClones = Array.from(slides)
      .slice(-cloneCount)
      .map((slide) => slide.cloneNode(true));

    slider.prepend(...lastClones);
    slider.append(...firstClones);
    const updateSlider = () => {
      const offset =
        -(slideWidth + slideMargin) * (currentIndex + slidesToShow);
      slider.style.transform = `translateX(${offset}px)`;
    };

    slider.style.transition = "none";
    updateSlider();

    document.querySelector(rightArrowSelector).addEventListener("click", () => {
      if (isTransitioning) return;

      isTransitioning = true;
      currentIndex += slidesToShow;

      if (currentIndex === slides.length) {
        slider.style.transition = "transform 0.5s";
        updateSlider();

        setTimeout(() => {
          slider.style.transition = "none";
          currentIndex = 0;
          updateSlider();
          isTransitioning = false;
        }, 500);
      } else {
        slider.style.transition = "transform 0.5s";
        updateSlider();
        setTimeout(() => (isTransitioning = false), 500);
      }
    });

    document.querySelector(leftArrowSelector).addEventListener("click", () => {
      if (isTransitioning) return;

      isTransitioning = true;
      currentIndex -= slidesToShow;

      if (currentIndex < 0) {
        slider.style.transition = "transform 0.5s";
        updateSlider();

        setTimeout(() => {
          slider.style.transition = "none";
          currentIndex = slides.length - slidesToShow;
          updateSlider();
          isTransitioning = false;
        }, 500);
      } else {
        slider.style.transition = "transform 0.5s";
        updateSlider();
        setTimeout(() => (isTransitioning = false), 500);
      }
    });
  };

  initializeSlider(
    ".nowplaying ul",
    "#nowplayingRightArrow",
    "#nowplayingLeftArrow"
  );
  initializeSlider(".upcoming ul", "#upcomingRightArrow", "#upcomingLeftArrow");
  initializeSlider(".toprated ul", "#topratedRightArrow", "#topratedLeftArrow");
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
