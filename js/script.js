const countryContainer = document.querySelector(".country-container");
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

// ui implement
const renderUi = (countries) => {
  countries.forEach((country) => {
    const countryDiv = document.createElement("div");
    countryDiv.classList.add("country-box");
    countryDiv.innerHTML = `
                    <div class="country-image">
                            <img
                                src=${country.flag}
                                alt="flag"
                            />
                    </div>
                    <div class="country-header">
                        <h1 class="country-name">${country.name}</h1>
                        </div>
                    <div class="country-body">
                    <h3 class="country-region">${country.region}</h3>
                            <h3>Population : ${country.population}</h3>
                            <h3 class='capital'>Capital : ${country.capital}</h3>
                    </div>`;
    countryContainer.appendChild(countryDiv);

    // Modal
    countryDiv.addEventListener("click", () => {
      modalImage.src = country.flag;
      const headHtml = `<div class="modal-header">
      <h1>${country.name}</h1>
    </div>
    <div class="modal-body">
      <h3>🗺 Region : ${country.region}</h3>
      <h3>🧑 Population : ${country.population}</h3>
      <h3>🎇 Capital : ${country.capital}</h3>
    <h3>🎯 Borders : ${country.borders}</h3>
    </div>`;
      modalInfo.innerHTML = headHtml;

      modal.style.display = "flex";
      console.log("c");
    });
    modalCloseBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
    window.addEventListener("keydown", (e) => {
      e.keyCode = "27" ? (modal.style.display = "none") : _;
    });
  });
};

const renderErorr = (err) => {};

//fetch api
const showCountries = async (url) => {
  try {
    const res = await fetch("https://restcountries.com/v2/all");
    const countries = await res.json();
    console.log(countries);
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
