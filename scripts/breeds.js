import { getCatBreeds } from './apiQueries.js'

let catBreeds

async function initRacePage() {
  catBreeds = await getCatBreeds()
  generateCatBreedListHtml()
  generateCountryList()
  generateCoatList()
}

initRacePage()

async function generateCatBreedListHtml() {
  catBreeds.data.forEach(cat => {
    document.querySelector('.race-list').innerHTML += `
      <div class="race-item" onclick="displayBreedData('${cat.breed}')">
        <div class="race-content" id="${cat.breed}">${cat.breed}</div>
      </div>`
  })
}


// TODO merge both filter functions into one
function filterByCountry(event) {
  // clear list
  document.querySelector('.race-list').innerHTML = ''

  catBreeds.data.forEach(cat => {
    if (cat.country === event.target.value) {
      document.querySelector('.race-list').innerHTML += `
        <div class="race-item" onclick="displayBreedData('${cat.breed}')">
          <div class="race-content" id="${cat.breed}">${cat.breed}</div>
        </div>`
    }
  })
}

function filterByCoat(event) {
  console.log
  // clear list
  document.querySelector('.race-list').innerHTML = ''

  catBreeds.data.forEach(cat => {
    if (cat.coat === event.target.value) {
      document.querySelector('.race-list').innerHTML += `
        <div class="race-item" onclick="displayBreedData('${cat.breed}')">
          <div class="race-content" id="${cat.breed}">${cat.breed}</div>
        </div>`
    }
  })
}

function getBreedData(selectedBreed) {
  let breedData

  catBreeds.data.forEach(cat => {
    if (cat.breed === selectedBreed) {
      breedData = cat
    }
  })

  return breedData
}

function displayBreedData(selectedBreed) {
  const breedData = getBreedData(selectedBreed)

  document.querySelector('#race-display').innerHTML = JSON.stringify(breedData)
}

function generateCountryList() {
  let countryList = []
  catBreeds.data.forEach(cat => {
    if (!countryList.includes(cat.country)) {
      document.querySelector('#country').innerHTML += `<option value="${cat.country}">${cat.country}</option>`
    }
    countryList.push(cat.country)
  })
}

function generateCoatList() {
  let coatList = []
  catBreeds.data.forEach(cat => {
    if (!coatList.includes(cat.coat)) {
      document.querySelector('#fur').innerHTML += `<option value="${cat.coat}">${cat.coat}</option>`
    }
    coatList.push(cat.coat)
  })
}

window.filterByCountry = filterByCountry
window.filterByCoat = filterByCoat
window.displayBreedData = displayBreedData