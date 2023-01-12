async function getCatFacts() {
  const promiseListOfCatFacts = await fetch('https://catfact.ninja/facts')
  return await promiseListOfCatFacts.json()
}

async function getCatBreeds() {
  const promiseListOfCatBreeds = await fetch('https://catfact.ninja/breeds')
  return await promiseListOfCatBreeds.json()
}

async function getRandomFunFact() {
  const res = await fetch('https://catfact.ninja/fact?max_length=140')
  return await res.json()
}

async function getAllFunFacts() {
  const res = await fetch('https://catfact.ninja/facts')
  return await res.json()
}

export { getCatFacts, getCatBreeds, getRandomFunFact, getAllFunFacts }