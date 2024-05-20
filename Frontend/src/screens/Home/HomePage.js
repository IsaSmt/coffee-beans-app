import homePage from './HomePage';

document.addEventListener('DOMContentLoaded', () => {
  const roasteriesContainer = document.querySelector('.roasteries');
  const originCountriesContainer = document.querySelector('.origin-countries');
  const coffeeBeansContainer = document.querySelector('.coffee-beans');
  const coffeesContainer = document.querySelector('.coffees');

  homePage.dummyRoasteries.forEach(roastery => {
    const roasteryCard = document.createElement('div');
    roasteryCard.className = 'card';
    roasteryCard.innerHTML = `
      <img src="${roastery.logoUrl}" class="logo" />
      <div class="roasteryName">${roastery.name}</div>
      <div class="address">${roastery.address}</div>
    `;
    roasteryCard.addEventListener('click', () => homePage.handleClick(roastery));
    roasteriesContainer.appendChild(roasteryCard);
  });

  homePage.dummyOriginCountries.forEach(country => {
    const countryTag = document.createElement('div');
    countryTag.className = 'tag';
    countryTag.innerHTML = `<div class="tagText">${country}</div>`;
    originCountriesContainer.appendChild(countryTag);
  });

  homePage.dummyCoffeeBeans.forEach(beanUrl => {
    const beanCard = document.createElement('div');
    beanCard.className = 'beanCard';
    beanCard.innerHTML = `<img src="${beanUrl}" class="beanImage" />`;
    coffeeBeansContainer.appendChild(beanCard);
  });

  homePage.dummyCoffees.forEach(coffee => {
    const coffeeCard = document.createElement('div');
    coffeeCard.className = 'coffeeCard';
    coffeeCard.innerHTML = `
      <img src="${coffee.imageUrl}" class="coffeeImage" />
      <div class="coffeeName">${coffee.name}</div>
    `;
    coffeesContainer.appendChild(coffeeCard);
  });
});
