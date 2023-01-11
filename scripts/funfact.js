import { getRandomFunFact } from './apiQueries.js'

async function showFunFact() {
  const funFact = await getRandomFunFact()
  document.querySelector('.fun-data').innerHTML = funFact.fact
}

window.showFunFact = showFunFact