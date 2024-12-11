// Menu Toggle
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// Cart Functionality
let cartIcon = document.querySelector('#cart-icon');
let cartSidebar = document.querySelector('#cart-sidebar');
let closeCartButton = document.querySelector('#close-cart');
let cartItemsList = document.querySelector('#cart-items');
let cartTotalPrice = document.querySelector('#cart-total-price');
let cartCount = document.querySelector('#cart-count'); // Cart count element

// Open Cart
cartIcon.onclick = () => {
    cartSidebar.style.right = '0';
    loadCart();
};

// Close Cart
closeCartButton.onclick = () => {
    cartSidebar.style.right = '-100%';
};

// Add Item to Cart
function addToCart(itemName, itemPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if item already exists in cart
    let existingItem = cart.find(item => item.name === itemName);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: itemName,
            price: itemPrice,
            quantity: 1
        });
    }

    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount(); // Update the cart count
    loadCart();
}

// Load Cart from Local Storage
function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItemsList.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        let cartItem = document.createElement('li');
        cartItem.innerHTML = `${item.name} - $${item.price} x ${item.quantity}
                              <button onclick="removeItem('${item.name}')">Remove</button>`;
        cartItemsList.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    cartTotalPrice.innerText = total.toFixed(2);
}

// Remove Item from Cart
function removeItem(itemName) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.name !== itemName);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount(); // Update the cart count
    loadCart();
}

// Update the Cart Item Count
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.innerText = totalCount;
}

// Initialize Cart Count on Page Load
document.addEventListener('DOMContentLoaded', updateCartCount);
