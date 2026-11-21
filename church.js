document.querySelectorAll('.b1').forEach(button =>{

  button.addEventListener('click', function() {

    const paymentOptions = document.getElementById('paymentOptions');

    paymentOptions.style.display = paymentOptions.style.display === 'none' ? 'block' : 'none';

  });
});

// Contact form submission
const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

form.addEventListener('submit', e => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (name && email && message) {
    formMessage.style.color = 'green';
    formMessage.textContent = 'Thank you for reaching out! We will get back to you soon.';
    form.reset();
  } else {
    formMessage.style.color = 'red';
    formMessage.textContent = 'Please fill in all fields.';
  }
});

// Dummy products data for shop
const products = [
  {
    id: 1,
    name: "Church T-Shirt",
    price: 15.99,
    image: "images/product1.jpg",
  },
  {
    id: 2,
    name: "Bible Study Guide",
    price: 9.99,
    image: "images/product2.jpg",
  },
  {
    id: 3,
    name: "Prayer Journal",
    price: 12.5,
    image: "images/product3.jpg",
  },
  {
    id: 4,
    name: "Church Mug",
    price: 8.99,
    image: "images/product4.jpg",
  },
];

// Cart state
let cart = [];

// DOM elements for shop/cart
const productsGrid = document.getElementById("productsGrid");
const cartModal = document.getElementById("cartModal");
const checkoutModal = document.getElementById("checkoutModal");
const cartItemsContainer = document.getElementById("cartItems");
const cartTotalDisplay = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
const viewCartBtn = document.getElementById("viewCartBtn");
const closeCartBtn = document.getElementById("closeCart");
const checkoutBtn = document.getElementById("checkoutBtn");
const closeCheckoutBtn = document.getElementById("closeCheckoutBtn");
const closeCheckoutX = document.querySelector("#checkoutModal .close-btn");

// Render products in shop
function renderProducts() {
  productsGrid.innerHTML = "";
  products.forEach(product => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h4>${product.name}</h4>
      <p class="price">$${product.price.toFixed(2)}</p>
      <button data-id="${product.id}">Add to Cart</button>
    `;
    productsGrid.appendChild(productCard);
  });
}

// Update cart count display
function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
}

// Render cart items in modal
function renderCart() {
  cartItemsContainer.innerHTML = "";
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartTotalDisplay.textContent = "";
    checkoutBtn.style.display = "none";
    return;
  }
  checkoutBtn.style.display = "block";

  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <span class="cart-item-name">${product.name}</span>
      <span class="cart-item-qty">Qty: ${item.quantity}</span>
      <span class="cart-item-price">$${(product.price * item.quantity).toFixed(2)}</span>
      <button class="remove-btn" data-id="${item.id}">&times;</button>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  const totalPrice = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + product.price * item.quantity;
  }, 0);

  cartTotalDisplay.textContent = `Total: $${totalPrice.toFixed(2)}`;
}

// Add product to cart
function addToCart(productId) {
  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }
  updateCartCount();
}

// Remove product from cart
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartCount();
  renderCart();
}

// Event listeners for shop/cart
productsGrid.addEventListener("click", e => {
  if (e.target.tagName === "BUTTON") {
    const id = parseInt(e.target.getAttribute("data-id"));
    addToCart(id);
  }
});

viewCartBtn.addEventListener("click", () => {
  renderCart();
  cartModal.classList.remove("hidden");
});

closeCartBtn.addEventListener("click", () => {
  cartModal.classList.add("hidden");
});

cartItemsContainer.addEventListener("click", e => {
  if (e.target.classList.contains("remove-btn")) {
    const id = parseInt(e.target.getAttribute("data-id"));
    removeFromCart(id);
  }
});

checkoutBtn.addEventListener("click", () => {
  cartModal.classList.add("hidden");
  checkoutModal.classList.remove("hidden");
  cart = [];
  updateCartCount();
});

closeCheckoutBtn.addEventListener("click", () => {
  checkoutModal.classList.add("hidden");
});

closeCheckoutX.addEventListener("click", () => {
  checkoutModal.classList.add("hidden");
});

// Initialize shop
renderProducts();
updateCartCount();
