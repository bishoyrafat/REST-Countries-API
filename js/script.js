const countryContainer = document.querySelector(".country-container");
const countryBox = document.querySelector(".country-box");
const country = document.querySelector(".country");
const search = document.querySelector(".search");
const btn = document.querySelector(".search-btn");
const darkMode = document.querySelector(".dark-mode");
const title = document.querySelector("header.title");
const darkLightMode = document.querySelector(".dark-light-mode");
const modal = document.querySelector(".modal");
const modalInfo = document.querySelector(".modal-info");
const modalImage = document.querySelector(".modal-image img");
const modalCloseBtn = document.querySelector('[name="close-outline"]');
const sun = document.querySelector(".sun");
const moon = document.querySelector(".moon");
const scrollToTop = document.querySelector(".scrollToTop");
const favIcon = document.querySelector(".favourite span");
const listBox = document.querySelector(".list-box");
// const listImg = document.querySelector(".list-image");

let favCounter = 0;

// ui implement
console.log(countryBox);
const renderUi = (countries) => {
  countries.forEach((country) => {
    const countryDiv = document.createElement("div");
    countryDiv.className = "country-box";
    countryDiv.innerHTML = `
                              <div class="country-image">
                                      <img src=${country.flag}  alt="flag"/>                               
                              </div>
                              <div class="country-header">
                                  <h1 class="country-name">${country.name}</h1>
                              </div>
                              <div class="country-body">
                                      <h3 class="country-region">${country.region}</h3>
                                      <h3>Population : ${country.population}</h3>
                                      <h3 class='capital'>Capital : ${country.capital}</h3>
                              </div>
                              <input type="button" class="favBtn" value="Add To Favourite">
                              `;

    countryContainer.appendChild(countryDiv);

    // Modal
    countryDiv.firstElementChild.firstElementChild.addEventListener(
      "click",
      () => {
        console.log(countryDiv.firstElementChild.firstElementChild);
        modalImage.src = country.flag;
        const headHtml = `<div class="modal-header">
                            <h1>${country.name}</h1>
                        </div>
                        <div class="modal-body">
                            <h3>🗺 Region : ${country.region}</h3>
                            <h3>🧑 Population : ${country.population}</h3>
                            <h3>🎇 Capital : ${country.capital}</h3>
                            <h3>🎯 Borders : ${
                              typeof country.borders === "undefined"
                                ? "No Borders"
                                : country.borders.join(" ")
                            }</h3>
                        </div>`;
        modalInfo.innerHTML = headHtml;
        modal.style.display = "flex";
        console.log("c");
      }
    );
    modalCloseBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
    window.addEventListener("keydown", (e) => {
      e.keyCode = "27" ? (modal.style.display = "none") : _;
    });

    // Favourite Country
    favIcon.innerHTML = favCounter;
    countryDiv.lastElementChild.addEventListener("click", (e) => {
      // favIcon.innerHTML = favCounter++;
      console.log(`${country.name}`);
      console.log(`${country.flag}`);

      listBox.innerHTML += `<aside class='country'>
                              <div class="list-image">
                                  <img src="${country.flag}" alt="" />
                              </div>
                              <h4 class="list-name">${country.name}</h4>
                              <div class="list-number">${favCounter}</div>
                              <input type='button' value='X' class='close-btn'>
                            </aside>
                          `;

      const favCloseBtn = document.querySelector(".close-btn");
      console.log(favCloseBtn);
      country.addEventListener("click", (e) => {});
      console.log(country);
    });

    // Favourite Country List
  });
};

const renderErorr = (err) => {};

//fetch api
const showCountries = async (url) => {
  try {
    const res = await fetch("https://restcountries.com/v2/all");
    const countries = await res.json();
    renderUi(countries);
  } catch (err) {
    console.log(err.message);
  }
};
showCountries();

// Search Filteration
search.addEventListener("input", (e) => {
  const searchInput = e.target.value.toLowerCase();
  console.log(searchInput);
  const countryName = document.querySelectorAll(".country-name");
  countryName.forEach((name) => {
    if (name.innerText.toLowerCase().includes(searchInput)) {
      name.parentElement.parentElement.style.display = "";
      document.querySelector(".country-alert").style.display = "none";
    } else {
      name.parentElement.parentElement.style.display = "none";
      document.querySelector(".country-alert").style.display = "block";
    }
  });
});

// Filteration By Region
const selectConntry = document.querySelector("select");
selectConntry.addEventListener("input", (e) => {
  const regionSelected = e.target.value;
  console.log(e.target.value);
  const countryRegion = document.querySelectorAll(".country-region");
  countryRegion.forEach((region) => {
    if (region.innerHTML === regionSelected) {
      region.parentElement.parentElement.style.display = "";
      console.log(region.innerHTML);
    } else {
      region.parentElement.parentElement.style.display = "none";
    }
  });
});

// Dark Mode
darkMode.addEventListener("click", () => {
  console.log("c");
  window.document.body.classList.toggle("dark-theme");
  if (darkLightMode.innerHTML === "Dark Mode") {
    darkLightMode.innerHTML = "Light Mode";
    sun.style.display = " block";
    moon.style.display = " none";
  } else {
    darkLightMode.innerHTML = "Dark Mode";
    moon.style.display = " block";
    sun.style.display = " none";
  }
});

//scroll to top
window.addEventListener("scroll", () => {
  window.scrollY >= 700
    ? (scrollToTop.style.display = "flex")
    : (scrollToTop.style.display = "none");
});
scrollToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
