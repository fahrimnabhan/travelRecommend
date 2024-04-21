var xhr = new XMLHttpRequest();
var url = './travel.json';

xhr.open('GET', url, true);
xhr.responseType = 'json';

var beaches = xhr.response.beaches;
var beachesDiv = document.getElementById('beaches');

var countries = xhr.response.countries;
var countriesDiv = document.getElementById('countries');

var temples = xhr.response.temples;
var templesDiv = document.getElementById('temples');

beaches.forEach(function(beach) {
    var beachDiv = document.createElement('div');
    beachDiv.classList.add('beach');

    var name = document.createElement('h2');
    name.textContent = beach.name;

    var description = document.createElement('h3');
    description.textContent = beach.description;

    beachDiv.appendChild(title);
    beachDiv.appendChild(description);

    countriesDiv.appendChild(beachDiv);
});

countries.forEach(function(country) {
    var countryDiv = document.createElement('div');
    countryDiv.classList.add('country');

    var name = document.createElement('h2');
    name.textContent = country.name;

    country.cities.forEach(function(city) {
      var cityDiv = document.createElement('div');
      cityDiv.classList.add('city');

      var cityName = document.createElement('p');
      cityName.textContent = city.name;

      var cityDesc = document.createElement('p');
      cityDesc.textContent = city.description;

      cityDiv.appendChild(cityName);
      cityDiv.appendChild(cityDesc);

      country.cities.appendChild(cityDiv);
    });

    countryDiv.appendChild(name);
    countryDiv.appendChild(cityList);

    countriesDiv.appendChild(countryDiv);
});

xhr.send();