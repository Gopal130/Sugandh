/* =====================================================
   SUGANDH PERFUME - USER INTERFACE (ui.js)
   ===================================================== */

/* ==================== MOBILE MENU TOGGLE ==================== */
/* Shows/hides the navigation menu on mobile devices */
function toggleMenu() {
    // Get the navigation links container
    const navLinks = document.getElementById('navLinks');
    
    // Toggle the 'active' class to show/hide menu
    navLinks.classList.toggle('active');
}

/* ==================== SMOOTH SCROLL TO SECTION ==================== */
/* Scrolls smoothly to different sections of the page and closes mobile menu */

function scrollToSection(sectionId) {
    // Hide mobile menu if open
    document.getElementById('navLinks').classList.remove('active');
    
    // Get the target section element
    const section = document.getElementById(sectionId);
    
    // Scroll to the section smoothly (CSS scroll-behavior: smooth handles this)
    section.scrollIntoView({ behavior: 'smooth' });
}

/* ==================== KEYBOARD SHORTCUTS ==================== */
/* 
   Optional: Add keyboard shortcuts for better UX
   
   Uncomment this code to enable keyboard shortcuts:
   - 'C' key: Toggle cart
   - 'Escape' key: Close modals
*/

/*
document.addEventListener('keydown', function(event) {
    // Press 'C' to toggle cart
    if (event.key.toLowerCase() === 'c') {
        toggleCart();
    }
    
    // Press 'Escape' to close modals
    if (event.key === 'Escape') {
        closeCheckout();
        toggleCart();
    }
});
*/

/* ==================== SMOOTH SCROLL ENHANCEMENT ==================== */
/* 
   This enhances the smooth scroll behavior when clicking navigation links
   Already handled in CSS (scroll-behavior: smooth), but can be enhanced here
*/

document.addEventListener('click', function(event) {
    // Check if clicked element is a navigation link
    const link = event.target.closest('a[onclick]');
    
    if (link) {
        // The onclick handlers in HTML will be triggered
        // This is just for additional tracking/analytics if needed
        
        // Example: Log which section was clicked
        // console.log('User navigated to:', link.getAttribute('onclick'));
    }
});

/* ==================== CART ANIMATION ==================== */
/* 
   Optional: Add animation when items are added to cart
   Uncomment and modify for visual feedback
*/

/*
function addToCartWithAnimation(productId) {
    // Find the product card
    const productCard = document.querySelector(`[data-product-id="${productId}"]`);
    const cartIcon = document.querySelector('.cart-icon');
    
    // Create a temporary element for animation
    const tempElement = productCard.cloneNode(true);
    tempElement.style.position = 'fixed';
    tempElement.style.pointerEvents = 'none';
    
    // Get positions for animation
    const productRect = productCard.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();
    
    tempElement.style.left = productRect.left + 'px';
    tempElement.style.top = productRect.top + 'px';
    tempElement.style.width = productRect.width + 'px';
    tempElement.style.height = productRect.height + 'px';
    
    document.body.appendChild(tempElement);
    
    // Animate to cart
    setTimeout(() => {
        tempElement.style.transition = 'all 0.6s ease-in-out';
        tempElement.style.left = cartRect.left + 'px';
        tempElement.style.top = cartRect.top + 'px';
        tempElement.style.width = '30px';
        tempElement.style.height = '30px';
        tempElement.style.opacity = '0';
    }, 10);
    
    // Remove temporary element
    setTimeout(() => {
        tempElement.remove();
        addToCart(productId);
    }, 600);
}
*/

/* ==================== RESPONSIVE IMAGE LOADING ==================== */
/* 
   Optional: Implement lazy loading for product images
   Improves page performance by loading images only when needed
*/

/*
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    // Observe all product images
    document.querySelectorAll('.product-image').forEach(img => imageObserver.observe(img));
}
*/

/* ==================== FORM INPUT FOCUS EFFECTS ==================== */
/* 
   Enhances form inputs with visual feedback on focus
   Already handled in CSS, but can add JavaScript effects if needed
*/

const inputs = document.querySelectorAll('input, textarea, select');

inputs.forEach(input => {
    // Add focus class to parent
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    // Remove focus class from parent
    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
    });
});

/* ==================== PREVENT DOUBLE SUBMISSION ==================== */
/* 
   Prevents form from being submitted multiple times
   Useful for payment forms to avoid duplicate charges
*/

document.getElementById('checkoutForm').addEventListener('submit', function(e) {
    // Disable submit button after first click
    const submitButton = this.querySelector('button[type="submit"]');
    
    // Store original text
    const originalText = submitButton.textContent;
    
    // Disable button
    submitButton.disabled = true;
    submitButton.textContent = 'Processing...';
    
    // Re-enable after 3 seconds (in case of error)
    setTimeout(() => {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    }, 3000);
});

/* ==================== CART PERSISTENCE (Optional) ==================== */
/*
   Save cart to browser's local storage so it persists across page refreshes
   Uncomment to enable this feature
*/

/*
// Save cart to localStorage whenever it changes
function saveCartToLocalStorage() {
    localStorage.setItem('sugandh_cart', JSON.stringify(cart));
}

// Load cart from localStorage on page load
function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('sugandh_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

// Hook into updateCart to save whenever it changes
const originalUpdateCart = updateCart;
updateCart = function() {
    originalUpdateCart();
    saveCartToLocalStorage();
};

// Load cart on page load
loadCartFromLocalStorage();
*/

/* ==================== CURRENCY FORMATTING ==================== */
/* 
   Helper function to format currency values
   Useful if you want to add more currency support later
*/

function formatCurrency(amount, currency = 'INR') {
    const formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: currency,
    });
    return formatter.format(amount);
}

// Example usage: formatCurrency(3299) // Returns "₹3,299.00"

/* ==================== SEARCH/FILTER PRODUCTS (Optional) ==================== */
/*
   Add search functionality to filter products
   Uncomment and add a search input to HTML to enable
*/

/*
function filterProducts(searchTerm) {
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Re-render with filtered products
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-price">₹${product.price}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}
*/

/* ==================== ANALYTICS TRACKING ==================== */
/*
   Track user interactions for analytics
   Example: Google Analytics, Mixpanel, etc.
*/

/*
function trackEvent(eventName, eventData) {
    // Example: Google Analytics
    if (window.gtag) {
        gtag('event', eventName, eventData);
    }
    
    // Example: Custom tracking
    console.log(`Event: ${eventName}`, eventData);
}

// Track product views
function trackProductView(productId) {
    trackEvent('view_product', { product_id: productId });
}

// Track add to cart
function trackAddToCart(productId, price) {
    trackEvent('add_to_cart', { 
        product_id: productId,
        price: price 
    });
}

// Track checkout
function trackCheckout(total) {
    trackEvent('checkout', { total: total });
}
*/

/* ==================== NOTIFICATIONS (Optional) ==================== */
/*
   Show toast notifications for user actions
   Better UX than alerts
*/

/*
function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 20px;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        border-radius: 4px;
        z-index: 9999;
        animation: slideIn 0.3s ease-in-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in-out';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// Usage:
// showNotification('Item added to cart!', 'success');
// showNotification('Please fill all fields', 'error');
*/

/* ==================== ACCESSIBILITY IMPROVEMENTS ==================== */
/*
   Improve keyboard navigation and screen reader support
*/

// Add role and aria-labels to interactive elements
document.querySelectorAll('button[onclick="toggleCart()"]').forEach(btn => {
    btn.setAttribute('aria-label', 'Toggle shopping cart');
    btn.setAttribute('role', 'button');
});

document.querySelectorAll('a[onclick]').forEach(link => {
    link.setAttribute('role', 'button');
});