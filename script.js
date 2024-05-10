const searchBtn = document.querySelector('#search-recommendations');
const clearBtn = document.querySelector('#clear-recommendations');
const searchForm = document.querySelector('#search-recommendations-form');
const searchTerm = searchForm.querySelector("input");
const resultDiv = document.querySelector("#results");

function normalizeKeyword(keyword) {
    return keyword.toLowerCase().trim();
}

function checkKeywordVariations(keyword) {
    const normalizedKeyword = normalizeKeyword(keyword);
    const variations = [
        'beach',
        'beaches',
        'beachy',
        'temple',
        'temples',
        'country',
        'countries'
    ];

    return variations.includes(normalizedKeyword);
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTermValue = searchTerm.value.trim();

    if (!searchTermValue) {
        console.log("Please enter a search term.");
        return;
    }

    if (!checkKeywordVariations(searchTermValue)) {
        console.log("Search term does not match any known variations.");
        return;
    }

    fetch("travel_recommendation_api.json")
        .then(res => res.json())
        .then(data => {
            displayRecommendations(data, searchTermValue);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Failed to fetch data. Please try again.');
        });
});

function displayRecommendations(data, term) {
    const options = term.includes("bea") ? data.beaches :
                    term.includes("countr") ? getCountriesData(data.countries) :
                    data.temples;

    const fragment = document.createDocumentFragment();
    options.forEach(option => {
        const resItem = document.createElement("div");
        const resItemImg = document.createElement("img");
        const resInner = document.createElement("div");
        const resItemName = document.createElement("h3");
        const resItemDesc = document.createElement("p");
        const resItemDate = document.createElement("p");
        const resItemBtn = document.createElement("button");
        
        resItem.classList.add("recommendation-item");
        resItemImg.src = option.imageUrl;
        resItemImg.alt = option.name;
        resItemName.textContent = option.name;
        resItemDesc.textContent = option.description;
        resItemBtn.textContent = "Visit";
        resItemDate.textContent = `Current time: ${getCurrentTime()}`;
        
        resInner.classList.add("recommendation-item-inner");
        resInner.append(resItemDate, resItemName, resItemDesc, resItemBtn);
        resItem.append(resItemImg, resInner);
        fragment.appendChild(resItem);
    });

    resultDiv.innerHTML = ''; 
    resultDiv.appendChild(fragment); 
}

function getCurrentTime() {
    const options = { timeZone: 'America/New_York', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date().toLocaleTimeString('en-US', options);
}

function getCountriesData(countries) {
    return countries.flatMap(country => 
        country.cities.map(city => ({
            name: `${city.name}, ${country.name}`,
            ...city
        }))
    );
}

clearBtn.addEventListener("click", () => {
    resultDiv.innerHTML = '';
    searchTerm.value = "";
});
