// Toggles Mobile Menu
const hamburger = document.querySelector('#hamburger');
const crossBtn = document.querySelector('#crossbtn');
const mobileNav = document.querySelector('#mobile-nav');

function toggleHamburger () {
	this.style.display = 'none';
	mobileNav.style.transform = 'translateX(0px)';
	mobileNav.style.zIndex = '100';
	mobileNav.style.display = 'block';
}

function toggleCrossBtn () {
	hamburger.style.display = 'block';
	mobileNav.style.transform = 'translateX(-450px)';
	mobileNav.style.zIndex = '100';
}

hamburger.addEventListener('click' , toggleHamburger);
crossBtn.addEventListener('click' , toggleCrossBtn);

// Cart Div toggle
const cart = document.querySelector('#cart');
const cartLogo = document.querySelector('nav .cart-logo img');
const cartCrossBtn = cart.querySelector('.heading .img img');

cartLogo.addEventListener('click' , function() {
	cart.classList.add('showCart');
	cart.style.display = 'block';
})

cartCrossBtn.addEventListener('click' , function() {
	cart.classList.remove('showCart');
})

// array of products
let productsArray = [
	{	
		image : '../images/home-carousel-watches/blancpain.jpg',
		name : 'Rolex Blancpain',
		info : 'Super Robust Digital Watch 2.0 with diamonds and shit',
		price : '100',
	},

	{	
		image : '../images/home-carousel-watches/chopard.jpg',
		name : 'Chopard',
		info : 'Super Robust Digital Watch 2.0 with diamonds and shit',
		price : '120',
	},

	{	
		image : '../images/home-carousel-watches/jaeger-lecoultre.jpg',
		name : 'jaeger-lecoultre',
		info : 'Super Robust Digital Watch 2.0 with diamonds and shit',
		price : '50',
	},

	{	
		image : '../images/home-carousel-watches/panerai.jpg',
		name : 'Panerai',
		info : 'Super Robust Digital Watch 2.0 with diamonds and shit',
		price : '150',
	},
]

// populate
let product;
const productsDiv = document.querySelector('#products');

productsArray.forEach(function(product) {
    product = `
	<div class='products'>
		<div class="img"><img src="${product.image}"></div>
		<div class="product-info">
			<p><span class="item-name">${product.name}</span> - ${product.info}.
			<p>Price :<span class="product-price" style="font-weight: 100">${product.price}</span>$</p>
		</div>
	</div>
	`
	productsDiv.innerHTML += product;
})

// Search bar
const searchDiv = document.getElementById('searchbar')
const searchbar = searchDiv.querySelector('input[type="search"]');
const searchbarBtn = searchDiv.querySelector('button');
let allProductsNames = document.querySelectorAll('#products .item-name');
const products = productsDiv.querySelectorAll('.products');

const minPriceInput = searchDiv.querySelector('input[name="min"]');
const maxPriceInput = searchDiv.querySelector('input[name="max"]');

searchbarBtn.addEventListener('click' , function() {
	products.forEach(product => product.style.display = 'none');
	let searchbarValue = searchbar.value;
	const regex = new RegExp(searchbarValue , 'gi');

	// loop through products
	allProductsNames.forEach(name => {
		if (name.innerHTML.match(regex)) {
			let parentElement = name.parentElement.parentElement.parentElement;
			let price = parentElement.querySelector('.product-price');

			// if no price range is included
			if (maxPriceInput.value == '' || minPriceInput.value == '') {
				parentElement.style.display = 'block';
				return;
			}

			// price statement
			if (parseInt(price.innerHTML) >= parseInt(minPriceInput.value) && parseInt(price.innerHTML) <= parseInt(maxPriceInput.value)) {
				parentElement.style.display = 'block';
			}
			return
		}
		return;
	})
})

// Cart
const blurDiv = document.getElementById('blur');
const cartModal = document.getElementById('cart-modal');
const cartModalBtn = cartModal.querySelector('button');
const cartModalCross = cartModal.querySelector('h6');

function showAddToCart() {
	blurDiv.classList.add('blur');
	cartModal.style.display = 'block';
	this.classList.add('add');
	console.log(this);
}

let cartBuyDiv = document.querySelector('#cart .buy');	
function addItem() {
	blurDiv.classList.remove('blur');
	cartModal.style.display = 'none';
	// get that product with class 'add'
	products.forEach(product => {
		if (product.classList.contains('add')) {
			// cache the product clicked elements
			let productImg = product.querySelector('img').src;
			let productName = product.querySelector('.product-info .item-name').innerHTML;
			let productPrice = product.querySelector('.product-info .product-price').innerHTML;

			// insert
			cartBuyDiv.insertAdjacentHTML("beforebegin" ,
			`
				<div class="items addevents">
					<div class="image">
						<img src="${productImg}">
					</div>
					<div class="info">
						<span class="item-name"><p>${productName}</p></span>
						<span class="price">Price : <span  class='defaultprice'>${productPrice}</span>$</span><br>
						<span style="color:grey" class="remove">remove</span>
					</div>
					<div class="quantity">
						<img class="up-arrow" src="../images/up-arrow.png">
						<p class="number">1</p>
						<img class="down-arrow" src="../images/down-arrow.png">
					</div>
				</div> 
			`
			 ) 
		}
	})


	products.forEach(product => product.classList.remove('add'));
}

function hideModal() {
	cartModal.style.display = 'none';
	blurDiv.classList.remove('blur');
	products.forEach(product => product.classList.remove('add'));
}

products.forEach((product) => {product.addEventListener('click' , showAddToCart)});
cartModalBtn.addEventListener('click' , changeCart);
cartModalBtn.addEventListener('click' , addItem);
cartModalBtn.addEventListener('click' , addPrice);
cartModalCross.addEventListener('click' , hideModal);

// add event listeners for quantity and removing elements.
let defaultPrice;
function changeCart () {
	setTimeout(() => {
		attachEventListeners();
	} , 100)
}
function attachEventListeners() {
	let targetItem = cart.querySelector('.addevents');
	let upArrow = targetItem.querySelector('.up-arrow');
	let downArrow = targetItem.querySelector('.down-arrow');
	let removeBtn = targetItem.querySelector('.remove');

	// raise or decrease quantity
	upArrow.addEventListener('click' , increaseQuantity);
	downArrow.addEventListener('click' , decreaseQuantity);

	function increaseQuantity() {
		if (this.nextElementSibling.innerHTML == 10) return;
		this.nextElementSibling.innerHTML = parseInt(this.nextElementSibling.innerHTML) + 1;

		let thisItem = this.parentElement.parentElement;
		let thisItemPriceSpan = thisItem.querySelector('.info .price span')
		if (thisItemPriceSpan.classList == 'defaultprice') {
			defaultPrice = parseInt(thisItemPriceSpan.innerHTML); 
			thisItemPriceSpan.classList.remove('defaultprice');
		} 

		thisItemPriceSpan.innerHTML = parseInt(thisItemPriceSpan.innerHTML) + parseInt(defaultPrice);
		addPrice();
		
	}

	function decreaseQuantity() {
		if (this.previousElementSibling.innerHTML == 1) return;
		this.previousElementSibling.innerHTML = parseInt(this.previousElementSibling.innerHTML) - 1;
		
		let thisItem = this.parentElement.parentElement;
		let thisItemPriceSpan = thisItem.querySelector('.info .price span')
		if (thisItemPriceSpan.classList == 'defaultprice') {
			defaultPrice = parseInt(thisItemPriceSpan.innerHTML); 
			thisItemPriceSpan.classList.remove('defaultprice');
		} 

		thisItemPriceSpan.innerHTML = parseInt(thisItemPriceSpan.innerHTML) - parseInt(defaultPrice);
		addPrice();
	}

	// remove
	removeBtn.addEventListener('click' , function() {

		// removing from localStorage
		let thisProduct = this.parentElement.parentElement;

		this.parentElement.parentElement.remove();
		addPrice();
		console.table(localStorage)
	})

	targetItem.classList.remove('addevents')
}

// add price
let totalPriceSpan = cart.querySelector('.buy .total-price');
function addPrice() {
	let allPricesSpans = document.querySelectorAll('.items .info .price span');
    allPricesSpans = Array.from(allPricesSpans);

    let allPrices = [];
    allPricesSpans.forEach(price => allPrices.push(parseInt(price.innerHTML)));	

    let totalPrice = allPrices.reduce((acc , current) => {
    	return acc + current;
    } , 0);

    totalPriceSpan.innerHTML = totalPrice;
}
