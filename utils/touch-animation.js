//Set gobile constant below:
let isDragging = false,
  startPosition = 0,
  currentTranslate = 0,
  prevTranslate = 0,
  animatedId = 0,
  maxIndex = 1,
  currentIndex = 0;

export const touchStart = (event, index) => {
  currentIndex = index;
  startPosition = getPositionX(event);
  isDragging = true;

  animatedId = requestAnimationFrame(animation);

  document.querySelector(".slider-container").classList.add("grabbing");
}

export const touchEnd = (event) => {
  isDragging = false;
  cancelAnimationFrame(animatedId);

  const movedBy = currentTranslate - prevTranslate;
  if (movedBy < -100 && currentIndex < maxIndex) currentIndex += 1;
  if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;
  setPositionByIndex();

  document.querySelector(".slider-container").classList.remove("grabbing");
}

export const touchMove = (event) => {
  if (isDragging) {
    const currentPosition = getPositionX(event);
    // if (Math.abs(currentPosition - startPosition) > 50) {
    //   animatedId = requestAnimationFrame(animation);
    // };
    currentTranslate = prevTranslate + currentPosition - startPosition;
  }
}

const animation = () => {
  //Apply the sliding effect on the page.
  document.querySelector(".slider-container").style.transform = `translateX(${currentTranslate}px)`;
  //Apply the sliding effect on the navbar indicator.
  document.querySelector(".nav-indicator").style.transform = `translateX(${currentIndex * 100}%)`;
  //Continuous moving when mouse click.
  if (isDragging) requestAnimationFrame(animation);
}

//Get the X position.
const getPositionX = (event) => event.type.includes("mouse") ? event.pageX : event.touches[0].clientX;

//Get the Y position.
// const getPositionY = (event) => event.type.includes("mouse") ? event.pageY : event.touches[0].clientY;

//Set the end position.
const setPositionByIndex = () => {
  currentTranslate = currentIndex * -window.innerWidth;
  prevTranslate = currentTranslate;
  document.querySelector(".slider-container").style.transform = `translateX(${currentTranslate}px)`;
}