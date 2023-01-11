import { getCatBreeds, getCatFacts } from './apiQueries.js'

setStatistics()

function setStatistics() {
  setNumberOfCatFacts()
  setNumberOfCatBreeds()
  setMostCommonCoat()
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
  const breedsList = await getCatBreeds()
  const coatArray = formCoatArray(breedsList.data)
  const mostCommonCoat = findHighestOccurenceIn(coatArray)
  console.log(mostCommonCoat)

  document.querySelector('.most-common-coat').innerHTML = mostCommonCoat
}

async function setNumberOfCatFacts() {
  const catFacts = await getCatFacts()
  const numberOfCatFacts = getNumberOfCatFacts(catFacts)

  document.querySelector('.total-cat-facts').innerHTML = numberOfCatFacts
}

async function setNumberOfCatBreeds() {
  const breedsList = await getCatBreeds()
  const numberOfCatBreeds = getNumberOfCatBreeds(breedsList)

  document.querySelector('.total-cat-breeds').innerHTML = numberOfCatBreeds
}
