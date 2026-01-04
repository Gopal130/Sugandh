/* =====================================================
   SUGANDH PERFUME - SHOPPING CART (cart.js)
   ===================================================== */

/* ==================== ADD TO CART ==================== */
/* Adds a product to the shopping cart */

function addToCart(productId) {
    // Find the product from products array
    const product = products.find(p => p.id === productId);
    
    // Check if product already exists in cart
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        // If product exists, increment its quantity
        existingItem.quantity++;
    } else {
        // If product is new, add it to cart with quantity 1
        cart.push({ ...product, quantity: 1 });
    }
    
    // Update the cart display
    updateCart();
    
    // Open the cart sidebar to show added item
    toggleCart();
}

/* ==================== UPDATE CART DISPLAY ==================== */
/* Updates cart count badge, items list, and total price */

function updateCart() {
    /* Calculate total cart count */
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = cartCount;

    const cartItemsDiv = document.getElementById('cartItems');
    const checkoutBtn = document.getElementById('checkoutBtn');

    // If cart is empty, show empty message
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        checkoutBtn.disabled = true;
    } else {
        // Render all items in the cart
        cartItemsDiv.innerHTML = cart.map(item => `
            <div class="cart-item">
                <!-- Product Image/Emoji -->
                <div class="cart-item-image">${item.emoji}</div>
                
                <!-- Product Details -->
                <div class="cart-item-details">
                    <!-- Product Name -->
                    <div class="cart-item-name">${item.name}</div>
                    
                    <!-- Product Price -->
                    <div class="cart-item-price">₹${item.price}</div>
                    
                    <!-- Quantity Control -->
                    <div class="quantity-control">
                        <!-- Decrease Quantity Button -->
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                        
                        <!-- Current Quantity Display -->
                        <span style="min-width: 30px; text-align: center;">${item.quantity}</span>
                        
                        <!-- Increase Quantity Button -->
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                    
                    <!-- Remove Item Button -->
                    <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `).join('');
        checkoutBtn.disabled = false;
    }

    // Calculate and display total price
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cartTotal').textContent = `₹${total}`;
    
    // Update the order summary section in checkout
    updateOrderSummary();
}

/* ==================== UPDATE PRODUCT QUANTITY ==================== */
/* Increases or decreases the quantity of an item in the cart */

function updateQuantity(productId, change) {
    // Find the item in cart
    const item = cart.find(i => i.id === productId);
    
    if (item) {
        // Update quantity by the change amount (1 or -1)
        item.quantity += change;
        
        // If quantity drops to 0, remove the item from cart
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            // Otherwise, update cart display
            updateCart();
        }
    }
}

/* ==================== REMOVE FROM CART ==================== */
/* Removes an item completely from the shopping cart */

function removeFromCart(productId) {
    // Filter out the item with the specified ID
    cart = cart.filter(item => item.id !== productId);
    
    // Update the cart display
    updateCart();
}

/* ==================== TOGGLE CART MODAL ==================== */
/* Shows or hides the cart sidebar modal */

function toggleCart() {
    // Toggle the 'active' class on the cart modal
    document.getElementById('cartModal').classList.toggle('active');
}

/* ==================== OPEN CHECKOUT ==================== */
/* Opens the checkout modal when user clicks 'Proceed to Checkout' */

function openCheckout() {
    // Only open checkout if cart has items
    if (cart.length > 0) {
        // Close the cart sidebar
        toggleCart();
        
        // Open the checkout modal
        document.getElementById('checkoutModal').classList.add('active');
        
        // Hide any previous success messages
        document.getElementById('successMessage').classList.remove('show');
    }
}

/* ==================== CLOSE CHECKOUT ==================== */
/* Closes the checkout modal */

function closeCheckout() {
    document.getElementById('checkoutModal').classList.remove('active');
}

/* ==================== UPDATE ORDER SUMMARY ==================== */
/* Updates the order summary in the checkout form */
/* Calculates subtotal, shipping, and total */

function updateOrderSummary() {
    // Calculate subtotal (sum of all items with quantities)
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // FREE SHIPPING if order is above ₹5000, otherwise ₹99
    const shipping = subtotal > 5000 ? 0 : 99;
    
    // Calculate final total
    const total = subtotal + shipping;

    // Update the order summary display
    document.getElementById('subtotal').textContent = `₹${subtotal}`;
    document.getElementById('shipping').textContent = `₹${shipping}`;
    document.getElementById('orderTotal').textContent = `₹${total}`;
}