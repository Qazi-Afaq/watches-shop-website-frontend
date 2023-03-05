const desktopNav = document.querySelector('#desktop-nav');
const mobileNav = document.querySelector('#mobile-nav');
const hamburger = document.querySelector('#hamburger');
const crossBtn = document.querySelector('#crossbtn');
const latestBox = document.querySelector('#latest-box');
const latestWatchHeader = document.querySelector('#latest-watch-header');
const checkOutBtn = document.querySelector('#chec-out-button');

// Toggles Mobile Menu
function toggleHamburger () {
	this.style.display = 'none';
	mobileNav.style.transform = 'translateX(0px)';
	mobileNav.style.zIndex = '100';
	mobileNav.style.display = 'block';
}

function toggleCrossBtn () {
	hamburger.style.display = 'block';
	mobileNav.style.transform = 'translateX(450px)';
	mobileNav.style.zIndex = '100';
}

// Media queries
function toggleElements() {
	const navigationMedia = window.matchMedia( "(max-width: 573px)" );
	//  navigation menu media queries
	if (navigationMedia.matches == true) {
		hamburger.style.display = 'block';
		desktopNav.style.display = 'none';

	} else {
		hamburger.style.display = 'none';
		desktopNav.style.display = 'block';
		mobileNav.style.transform = 'translateX(450px)';
	}
}


hamburger.addEventListener('click' , toggleHamburger);
crossBtn.addEventListener('click' , toggleCrossBtn);
window.addEventListener('resize' , toggleElements);
toggleElements(); // should be runned once every reload

// caoursel
const carousel = document.getElementById('carousel');
const leftArrow = carousel.querySelector('.carousel-left-arrow');
const rightArrow = carousel.querySelector('.carousel-right-arrow');
const slides = carousel.querySelector('.slides');
const slideImgs = carousel.querySelectorAll('.slide img');
let marginLeft = 0;
let carouselImageWidth = 300;

function scrollLeft() {
  let parentWidth = carousel.offsetWidth;
  let scrollWidth = parseInt(getComputedStyle(slides).width, 10);
  let currentScroll = Math.abs(
    parseInt(getComputedStyle(slides).marginLeft, 10)
  );
  let remainingSpaceToScroll = currentScroll;

  if (remainingSpaceToScroll <= 0) {
    return;
  } else if (remainingSpaceToScroll >= carouselImageWidth) {
    marginLeft = -(currentScroll - carouselImageWidth);
  } else {
    marginLeft = -(currentScroll - remainingSpaceToScroll);
  }

     console.log(`scrollWidth: ${scrollWidth}`);
  console.log(`parentWidth : ${parentWidth}`);
  console.log(`currentScroll ${currentScroll}`);

  slides.style.marginLeft = marginLeft + "px";
}

function scrollRight() {
  let parentWidth = carousel.offsetWidth; // carousel width
  let scrollWidth = parseInt(getComputedStyle(slides).width, 10); //slides width
  let currentScroll = Math.abs( // how much slide has scrolled
    parseInt(getComputedStyle(slides).marginLeft, 10)
  );
  let remainingSpaceToScroll = scrollWidth - (parentWidth + currentScroll);

  if (remainingSpaceToScroll <= 0) {
    return;
  } else if (remainingSpaceToScroll >= carouselImageWidth) {
    marginLeft = -(currentScroll + carouselImageWidth);
  } else {
    marginLeft = -(currentScroll + remainingSpaceToScroll);
  }

   console.log(`scrollWidth: ${scrollWidth}`);
  console.log(`parentWidth : ${parentWidth}`);
  console.log(`currentScroll ${currentScroll}`);
  console.log(`parentWidth + currentScroll ${parentWidth + currentScroll}`);
  console.log(`scrollWidth - (parentWidth + currentScroll) ${scrollWidth - (parentWidth + currentScroll)}`);

  slides.style.marginLeft = marginLeft + "px";
  // console.log('parentWidth: ' + parentWidth);
  // console.log('scrollWidth: ' + scrollWidth);
  // console.log('currentScroll: ' + currentScroll);
}

rightArrow.addEventListener('click' , scrollRight);
leftArrow.addEventListener('click' , scrollLeft);