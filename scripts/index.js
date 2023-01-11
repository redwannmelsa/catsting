function showMobileDropdown() {
  const element = document.querySelector('#mobile-dropdown');
  if (element.style.display === "flex") {
    element.style.display = "none";
  } else {
    element.style.display = "flex";
  }
}

function toggleDarkMode() {
  console.log(document.cookie)
  console.log(document.cookie === 'darkmode=on')
  if (document.cookie === 'darkmode=on') {
    document.cookie = 'darkmode=off; path=/'
    document.querySelector('body').classList.remove('dark-mode')
  } else {
    document.cookie = 'darkmode=on; path=/'
    document.querySelector('body').classList.add('dark-mode')
  }


}

function onInit() {
  if (document.cookie === 'darkmode=on') {
    document.querySelector('body').classList.add('dark-mode')
  }
}

async function requestCatFacts() {
  const promiseListOfCatFacts = await fetch('https://catfact.ninja/facts')
  return await promiseListOfCatFacts.json()
}

async function requestCatBreeds() {
  const promiseListOfCatBreeds = await fetch('https://catfact.ninja/breeds')
  return await promiseListOfCatBreeds.json()
}

function getNumberOfCatBreeds(breedsList) {
  return breedsList.data.length
}

function getNumberOfCatFacts(catFacts) {
  return catFacts.data.length
}

function formCoatArray(breedsList) {
  let coatArray = []
  breedsList.forEach(breed => {
    coatArray.push(breed.coat)
  });
  return coatArray
}

function findHighestOccurenceIn(array) {
  return array.sort((a, b) =>
    array.filter(v => v === a).length
    - array.filter(v => v === b).length
  ).pop();
}

async function setMostCommonCoat() {
  const breedsList = await requestCatBreeds()
  const coatArray = formCoatArray(breedsList.data)
  const mostCommonCoat = findHighestOccurenceIn(coatArray)
  console.log(mostCommonCoat)

  document.querySelector('.most-common-coat').innerHTML = mostCommonCoat
}

async function setNumberOfCatFacts() {
  const catFacts = await requestCatFacts()
  const numberOfCatFacts = getNumberOfCatFacts(catFacts)

  document.querySelector('.total-cat-facts').innerHTML = numberOfCatFacts
}

async function setNumberOfCatBreeds() {
  const breedsList = await requestCatBreeds()
  const numberOfCatBreeds = getNumberOfCatBreeds(breedsList)

  document.querySelector('.total-cat-breeds').innerHTML = numberOfCatBreeds
}

function setStatistics() {
  setNumberOfCatFacts()
  setNumberOfCatBreeds()
  setMostCommonCoat()
}

onInit()

let catBreeds

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

async function initRacePage() {
  catBreeds = await requestCatBreeds()
  generateCatBreedListHtml()
  generateCountryList()
  generateCoatList()
}

async function getRandomFunFact() {
  const res = await fetch('https://catfact.ninja/fact?max_length=140')
  return await res.json()
}

async function showFunFact() {
  const funFact = await getRandomFunFact()
  document.querySelector('.fun-data').innerHTML = funFact.fact
}