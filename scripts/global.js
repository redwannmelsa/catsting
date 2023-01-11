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

onInit()