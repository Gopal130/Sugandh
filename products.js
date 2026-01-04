/* =====================================================
   SUGANDH PERFUME - PRODUCTS & DATA (products.js)
   ===================================================== */

/* ==================== PRODUCT DATA ==================== */
/* This is the main products array. Modify this to add, remove, or edit products */
/* Each product object contains: id, name, description, price, emoji (or image path) */

const products = [
    {
        id: 1,
        name: "Oud Elegance",
        description: "Rich woody notes with premium oud essence",
        price: 3299,
        emoji: "💎"                    /* Replace emoji with image path like 'images/oud.jpg' */
    },
    {
        id: 2,
        name: "Rose Delicate",
        description: "Soft floral blend with long-lasting fragrance",
        price: 2899,
        emoji: "🌹"                    /* Customize product images here */
    },
    {
        id: 3,
        name: "Jasmine Nights",
        description: "Exotic jasmine with subtle musk undertones",
        price: 3099,
        emoji: "✨"
    },
    {
        id: 4,
        name: "Citrus Breeze",
        description: "Fresh citrus notes for everyday elegance",
        price: 2699,
        emoji: "🍊"
    },
    {
        id: 5,
        name: "Sandalwood Bliss",
        description: "Warm sandalwood with vanilla accents",
        price: 3199,
        emoji: "🌿"
    },
    {
        id: 6,
        name: "Amber Luxe",
        description: "Deep amber with precious spice notes",
        price: 3599,
        emoji: "🏛️"
    }
];

/* ==================== GLOBAL STATE ==================== */
/* These variables store the current state of the application */

let cart = [];                         /* Array to store items added to cart */
let selectedPayment = 'card';         /* Currently selected payment method */

/* ==================== PRODUCT RENDERING ==================== */
/* Renders all products to the products grid */

function renderProducts() {
    const grid = document.getElementById('productsGrid');
    
    // Map through products array and create HTML for each product
    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <!-- Product Image/Emoji -->
            <div class="product-image">${product.emoji}</div>
            
            <!-- Product Information -->
            <div class="product-info">
                <!-- Product Name -->
                <div class="product-name">${product.name}</div>
                
                <!-- Product Description -->
                <div class="product-description">${product.description}</div>
                
                <!-- Product Price (in Indian Rupees) -->
                <div class="product-price">₹${product.price}</div>
                
                <!-- Add to Cart Button -->
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

/* ==================== INITIALIZATION ==================== */
/* Initialize the application when page loads */

function init() {
    renderProducts();                 /* Render all products on page load */
    updateCart();                     /* Update cart display */
    setupEventListeners();            /* Attach event listeners */
}

/* ==================== EVENT LISTENERS ==================== */
/* Attach event listeners to forms and buttons */

function setupEventListeners() {
    // Hamburger menu toggle for mobile navigation
    document.getElementById('menuToggle').addEventListener('click', toggleMenu);
    
    // Contact form submission
    document.getElementById('contactForm').addEventListener('submit', handleContact);
    
    // Checkout form submission
    document.getElementById('checkoutForm').addEventListener('submit', handleCheckout);
}

/* ==================== START APPLICATION ==================== */
/* Initialize app when DOM is fully loaded */

init();