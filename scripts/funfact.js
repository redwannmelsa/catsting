import { getRandomFunFact, getAllFunFacts } from './apiQueries.js'

async function showFunFact() {
  const funFact = await getRandomFunFact()
  document.querySelector('.fun-data').innerHTML = funFact.fact
}

async function showManyFunFacts() {
  const res = await getAllFunFacts()
  const funFacts = res.data

  funFacts.forEach(fact => {
    document.querySelector('.many-fun-facts-container').innerHTML += `
    <div class="fun-fact-card">
        <div class="title">Anecdote</div>
        <div class="fun-data">${fact.fact}</div>
      </div>
    `
  })
}

function changeDisplay(type) {
  const newWidth = displayTypeChecker(type)

  document.querySelectorAll('.fun-fact-card').forEach(element => {
    element.style.width = newWidth
  })
}

function displayTypeChecker(type) {
  if (type === 'square') {
    return '386px'
  } else if (type = 'fullWidth') {
    return '100%'
  } else {
    throw new Error('unknown argument')
  }
}

window.showFunFact = showFunFact
window.showManyFunFacts = showManyFunFacts
window.displayBars = displayBars
window.displaySquares = displaySquares
window.changeDisplay = changeDisplay