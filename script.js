// RAZORPAY KEY - GET YOUR OWN FROM RAZORPAY DASHBOARD
// Replace with your actual Razorpay Key ID
const RAZORPAY_KEY_ID = "YOUR_RAZORPAY_KEY_ID"; // Get from: https://dashboard.razorpay.com/

// Product Database
const products = [
    {
        id: 1,
        name: 'NIGHT JASMINE',
        price: 2499,
        category: 'floral',
        description: 'A captivating blend of night-blooming jasmine with subtle notes of sandalwood and musk. Perfect for evening elegance.',
        emoji: '🌸',
        inStock: true
    },
    {
        id: 2,
        name: 'CEDAR ESSENCE',
        price: 2799,
        category: 'woody',
        description: 'Rich cedarwood infused with hints of bergamot and vanilla. A timeless woody fragrance for the refined soul.',
        emoji: '🌲',
        inStock: true
    },
    {
        id: 3,
        name: 'MANGO DREAM',
        price: 2299,
        category: 'fruity',
        description: 'Tropical mango with notes of passion fruit and white tea. Refreshing and vibrant all day.',
        emoji: '🥭',
        inStock: true
    },
    {
        id: 4,
        name: 'AMBER ROSE',
        price: 2599,
        category: 'oriental',
        description: 'Luxurious rose petals meet warm amber and exotic spices. A sensual, long-lasting fragrance.',
        emoji: '🌹',
        inStock: true
    },
    {
        id: 5,
        name: 'OCEAN BREEZE',
        price: 2199,
        category: 'fruity',
        description: 'Salt, water lily, and citrus notes create a fresh, seaside escape. Unisex and versatile.',
        emoji: '🌊',
        inStock: true
    },
    {
        id: 6,
        name: 'GARDENIA SILK',
        price: 2699,
        category: 'floral',
        description: 'Delicate gardenia blended with silk musks and creamy vanilla. Softly elegant.',
        emoji: '🏵️',
        inStock: true
    },
    {
        id: 7,
        name: 'SPICE MYSTERY',
        price: 2899,
        category: 'oriental',
        description: 'Intriguing blend of cardamom, cinnamon, and clove with oud. Mysterious and bold.',
        emoji: '🌶️',
        inStock: false
    },
    {
        id: 8,
        name: 'LAVENDER DREAMS',
        price: 1999,
        category: 'floral',
        description: 'Pure lavender with hints of chamomile and green tea. Calming and soothing.',
        emoji: '💜',
        inStock: true
    }
];

let cart = [];
let currentFilter = 'all';
let selectedProduct = null;
let selectedQuantity = 1;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    displayProducts(products);
});

// Page Navigation
function navigateTo(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    window.scrollTo(0, 0);
}

// Display Products
function displayProducts(productsToDisplay) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';

    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        if (!product.inStock) productCard.classList.add('sold-out');

        productCard.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-name">${product.name}</div>
            <div class="product-price">₹${product.price.toLocaleString('en-IN')}</div>
            ${product.inStock ? 
                `<button class="add-to-cart-btn" onclick="openProductModal(${product.id})">VIEW DETAILS</button>` 
                : 
                `<div class="sold-out-text">SOLD OUT</div>`
            }
        `;

        grid.appendChild(productCard);
    });
}

// Filter Products
function filterProducts(category) {
    currentFilter = category;
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    const filtered = category === 'all' 
        ? products 
        : products.filter(p => p.category === category);
    
    displayProducts(filtered);
}

// Modal Functions
function openProductModal(productId) {
    selectedProduct = products.find(p => p.id === productId);
    selectedQuantity = 1;
    document.getElementById('quantityDisplay').textContent = '1';
    
    document.getElementById('modalImage').textContent = selectedProduct.emoji;
    document.getElementById('modalProductName').textContent = selectedProduct.name;
    document.getElementById('modalProductDescription').textContent = selectedProduct.description;
    document.getElementById('modalProductPrice').textContent = `₹${selectedProduct.price.toLocaleString('en-IN')}`;
    
    document.getElementById('productModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('productModal').style.display = 'none';
}

function increaseQuantity() {
    selectedQuantity++;
    document.getElementById('quantityDisplay').textContent = selectedQuantity;
}

function decreaseQuantity() {
    if (selectedQuantity > 1) {
        selectedQuantity--;
        document.getElementById('quantityDisplay').textContent = selectedQuantity;
    }
}

// Cart Functions
function addToCartFromModal() {
    addToCart(selectedProduct.id, selectedQuantity);
    closeModal();
}

function addToCart(productId, quantity) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }

    updateCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateCart() {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = cartCount;

    const cartItemsContainer = document.getElementById('cartItems');
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')} × ${item.quantity}</div>
                </div>
                <div class="cart-item-remove" onclick="removeFromCart(${item.id})">Remove</div>
            </div>
        `).join('');
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cartTotal').textContent = `₹${total.toLocaleString('en-IN')}`;
}

function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('active');
}

// RAZORPAY PAYMENT FUNCTION
function proceedToPayment() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Generate order ID (in real world, this comes from your server)
    const orderId = 'ORD_' + Date.now();
    
    const options = {
        key: RAZORPAY_KEY_ID, // Your Razorpay Key ID
        amount: total * 100, // Amount in paise (multiply by 100)
        currency: 'INR',
        name: 'Sungandh',
        description: 'Premium Perfumes Purchase',
        order_id: orderId,
        
        prefill: {
            name: 'Customer Name',
            email: 'customer@example.com',
            contact: '9876543210'
        },
        
        theme: {
            color: '#2d2d2d'
        },
        
        handler: function(response) {
            // Payment successful
            alert('Payment Successful!\n\nPayment ID: ' + response.razorpay_payment_id + '\n\nThank you for your order!');
            console.log('Payment Response:', response);
            
            // Clear cart after successful payment
            cart = [];
            updateCart();
            toggleCart();
            
            // You can send this data to your server to store the order
            saveOrder(response, orderId, total);
        },
        
        modal: {
            ondismiss: function() {
                alert('Payment cancelled. Please try again.');
            }
        }
    };
    
    // Create Razorpay instance and open checkout
    const rzp = new Razorpay(options);
    rzp.open();
}

// Function to save order (send to server)
function saveOrder(paymentResponse, orderId, amount) {
    const orderData = {
        orderId: orderId,
        paymentId: paymentResponse.razorpay_payment_id,
        signature: paymentResponse.razorpay_signature,
        amount: amount,
        items: cart,
        timestamp: new Date().toISOString()
    };
    
    console.log('Order saved:', orderData);
    // In real implementation, send this to your server:
    // fetch('/api/save-order', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(orderData)
    // })
}

function handleSubmit(e) {
    e.preventDefault();
    alert('Thank you for reaching out! We will get back to you soon.');
    e.target.reset();
}

window.onclick = function(event) {
    const modal = document.getElementById('productModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}
