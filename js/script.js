const countryContainer = document.querySelector(".country-container");
const countryBox = document.querySelector(".country-box");
const search = document.querySelector(".search");
const btn = document.querySelector(".search-btn");

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
                            <h3>Population : ${country.population}</h3>
                            <h3 class="country-region">${country.region}</h3>
                            <h3 class='capital'>Capital : ${country.capital}</h3>
                    </div>`;
    // countryContainer.insertAdjacentHTML("afterbegin", html);
    countryContainer.appendChild(countryDiv);
  });
};

//fetch api
const showCountries = async (url) => {
  const res = await fetch("https://restcountries.com/v2/all");
  const countries = await res.json();
  renderUi(countries);
};
showCountries();

// Search Filteration
search.addEventListener("keyup", (e) => {
  const searchInput = e.target.value.toLowerCase();
  console.log(searchInput);
  const countryName = document.querySelectorAll(".country-name");
  countryName.forEach((name) => {
    if (name.innerText.toLowerCase().includes(searchInput)) {
      name.parentElement.parentElement.style.display = "";
    } else {
      name.parentElement.parentElement.style.display = "none";
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
    if (region.innerHTML.includes(regionSelected)) {
      region.parentElement.parentElement.style.display = " ";
      console.log(region.innerHTML);
    } else {
      region.parentElement.parentElement.style.display = "none";
    }
  });
});
