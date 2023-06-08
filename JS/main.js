/*********************Слайдер*********************/
let slides = document.querySelectorAll(".carousel-slide");
let dots = document.querySelectorAll(".carousel-dot");
let prevBtn = document.querySelector(".carousel-prev");
let nextBtn = document.querySelector(".carousel-next");
let slidePositionInfo = document.querySelector(".carousel-position");
let activeSlideIndex = 0;

const setSlidePosition = () => {
    slidePositionInfo.innerHTML = `${activeSlideIndex + 1} / ${slides.length}`;
};

const getInitSlidesValue = () => {
    slides[activeSlideIndex].classList.add("active");
    dots[activeSlideIndex].classList.add("active");
    setSlidePosition();
};
getInitSlidesValue();

const handleChangeActiveSlide = (index) => {
    for (let slide of slides) {
        if (slide.classList.contains("active")) {
            slide.classList.remove("active");
        }
    }
    slides[index].classList.add("active");
    setSlidePosition();
};

const handleChangeActiveDot = (index) => {
    for (let dot of dots) {
        if (dot.classList.contains("active")) {
            dot.classList.remove("active");
        }
    }
    dots[index].classList.add("active");
};

const handleNextSlide = () => {
    if (activeSlideIndex === slides.length - 1) {
        activeSlideIndex = 0;
    } else {
        activeSlideIndex++;
    }
    handleChangeActiveSlide(activeSlideIndex);
    handleChangeActiveDot(activeSlideIndex);
};
const handlePrevSlide = () => {
    if (activeSlideIndex === 0) {
        activeSlideIndex = slides.length - 1;
    } else {
        activeSlideIndex--;
    }
    handleChangeActiveSlide(activeSlideIndex);
    handleChangeActiveDot(activeSlideIndex);
};
prevBtn.addEventListener("click", handlePrevSlide);
nextBtn.addEventListener("click", handleNextSlide);

dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        activeSlideIndex = index;
        handleChangeActiveSlide(activeSlideIndex);
        handleChangeActiveDot(activeSlideIndex);
    });
});
/**********************Акардион*********************/
let accordionHeader = document.querySelectorAll(".accordion-header");
let accordionContent = document.querySelectorAll(".accordion-content");

accordionHeader.forEach((header, index) => {
    header.addEventListener("click", () => {
        // header.classList.toggle("active");
        // accordionContent[index].classList.toggle("active");
        if (header.classList.contains("active")) {
            header.classList.remove("active");
            accordionContent[index].classList.remove("active");
        } else {
            accordionHeader.forEach((item, i) => {
                item.classList.remove("active");
                accordionContent[i].classList.remove("active");
            });
            header.classList.add("active");
            accordionContent[index].classList.add("active");
        }
    });
});
/**************************tabs***********************/

const tabLinks = document.querySelectorAll(".tablinks");
const tabContents = document.querySelectorAll(".tabcontent");

tabLinks[0].classList.add("active");
tabContents[0].classList.add("show");

tabLinks.forEach((tabLink, index) => {
    tabLink.addEventListener("click", () => {
        tabLinks.forEach((item) => item.classList.remove("active"));
        tabContents.forEach((item) => item.classList.remove("show"));

        tabLinks[index].classList.add("active");
        tabContents[index].classList.add("show");
    });
});
/***************************MENU**********************/
const nav = document.querySelector("nav");
const menuButton = document.querySelector("#menu-button");
const menu = document.querySelector("#menu");
const links = document.querySelectorAll("a");

const handleChangeMenu = () => {
    menuButton.classList.toggle("active");
    menuButton.innerHTML = menuButton.classList.contains("active")
        ? "&#10006"
        : "&#9776";
    nav.classList.toggle("active");
    menu.classList.toggle("active");
};

menuButton.addEventListener("click", handleChangeMenu);
links.forEach((link) => link.addEventListener("click", handleChangeMenu));
/***********************Theme-switcher******************/
const switcher = document.querySelector("#theme-switcher");

const darkThemeValue = !!localStorage.getItem("dark-theme");

if (darkThemeValue) {
    switcher.checked = true;
    document.body.classList.add("dark-theme");
}
switcher.addEventListener("change", (e) => {
    if (e.target.checked) {
        localStorage.setItem("dark-theme", e.target.checked);
    } else {
        localStorage.removeItem("dark-theme");
    }
    document.body.classList.toggle("dark-theme");
});
/******************Generate-Random-Number*************/

const postWrapper = document.querySelector(".post-wrapper");
const generateBtn = document.getElementById("generateBtn");
const minValue = document.getElementById("minValue");
const maxValue = document.getElementById("maxValue");
const result = document.getElementById("result");

const getPost = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((data) => data.json())
        .then((result) => {
            postWrapper.innerHTML = `
            <p>Post-ID: ${result.id}</p>
            <p>Post-Title: ${result.title}</p>
            <p>Post-Body: ${result.body}</p>
            `;
        });
};

generateBtn.addEventListener("click", () => {
    const min = parseInt(minValue.value);
    const max = parseInt(maxValue.value);

    if (isNaN(min) || isNaN(max) || min > max) {
        result.innerHTML = "введите коректное значение";
    } else {
        const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
        result.innerHTML = randomNumber;
        getPost(randomNumber);
    }
});
/*************************Timer***********************/
const timerStartBtn = document.getElementById("timer-start-btn");

const startTimer = () => {
    const input = document.getElementById("minutes");
    const minutes = parseInt(input.value);

    if (isNaN(minutes) || minutes < 1) {
        alert("введите коректное значение");
    } else {
        let timeLeft = minutes * 60;
        const timeId = setInterval(() => {
            timeLeft--;
            updateTimer(timeLeft);
            if (timeLeft === 0) {
                clearInterval(timeId);
                alert("0:00");
            }
        }, 1000);
    }
};

const updateTimer = (timeLeft) => {
    const timer = document.getElementById("timer");
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timer.innerHTML = `${minutes}:${seconds}`;
};

timerStartBtn.addEventListener("click", startTimer);
