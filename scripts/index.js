function showMobileDropdown() {
  console.log('something')
  const element = document.querySelector('#mobile-menu');
  if (element.style.display === "flex") {
    element.style.display = "none";
  } else {
    element.style.display = "flex";
  }
}
