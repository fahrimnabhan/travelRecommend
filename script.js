document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');
    const clearBtn = document.querySelector('.clear-btn');
    const resultsContainer = document.querySelector('.results-container'); // Make sure you have a container for the results in your HTML
  
    searchBtn.addEventListener('click', () => {
      const keyword = searchInput.value.trim().toLowerCase();
      fetchTravelData(keyword);
    });
  
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      resultsContainer.innerHTML = ''; // Clear current results
    });
  
    async function fetchTravelData(searchQuery) {
      try {
        const response = await fetch('travel.json');
        const data = await response.json();
        const results = findMatches(searchQuery, data);
        displayResults(results);
      } catch (error) {
        console.error('Error fetching travel data:', error);
      }
    }
  
    function findMatches(keyword, data) {
      const regex = new RegExp(keyword, 'i'); // Case insensitive search
      // Flatten the data structure to search all items
      const allData = [...data.countries.flatMap(c => c.cities), ...data.temples, ...data.beaches];
      return allData.filter(item => regex.test(item.name) || regex.test(item.description));
    }
  
    function displayResults(results) {
      // Clear previous results
      resultsContainer.innerHTML = '';
      // Create new results elements
      results.forEach(result => {
        const resultElem = document.createElement('div');
        resultElem.classList.add('result-item');
        resultElem.innerHTML = `
          <h3>${result.name}</h3>
          <p>${result.description}</p>
          <img src="${result.imageUrl}" alt="${result.name}" />
        `;
        resultsContainer.appendChild(resultElem);
      });
    }
  });
  