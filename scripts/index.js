function showMobileDropdown() {
  console.log('something')
  const element = document.querySelector('#mobile-menu');
  if (element.style.display === "flex") {
    element.style.display = "none";
  } else {
    element.style.display = "flex";
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

setStatistics()