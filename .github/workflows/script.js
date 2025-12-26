// Menu Items Database
const menuItems = [
    // Main Dishes
    {
        id: 1,
        name: 'Grilled Chicken Pasta',
        category: 'dishes',
        description: 'Delicious pasta with grilled chicken and garlic sauce',
        price: 12.99,
        icon: '🍝'
    },
    {
        id: 2,
        name: 'Margherita Pizza',
        category: 'dishes',
        description: 'Classic pizza with tomato, mozzarella, and basil',
        price: 11.99,
        icon: '🍕'
    },
    {
        id: 3,
        name: 'Beef Burger',
        category: 'dishes',
        description: 'Juicy beef burger with cheese and fresh vegetables',
        price: 10.99,
        icon: '🍔'
    },
    {
        id: 4,
        name: 'Salmon Fillet',
        category: 'dishes',
        description: 'Fresh grilled salmon with lemon butter sauce',
        price: 15.99,
        icon: '🐟'
    },
    {
        id: 5,
        name: 'Vegetarian Bowl',
        category: 'dishes',
        description: 'Mixed vegetables with quinoa and tahini dressing',
        price: 9.99,
        icon: '🥗'
    },
    {
        id: 6,
        name: 'Biryani Rice',
        category: 'dishes',
        description: 'Fragrant Indian rice with spiced meat',
        price: 13.99,
        icon: '🍚'
    },
    // Soft Drinks
    {
        id: 7,
        name: 'Orange Juice',
        category: 'drinks',
        description: 'Fresh squeezed orange juice',
        price: 3.99,
        icon: '🧃'
    },
    {
        id: 8,
        name: 'Iced Tea',
        category: 'drinks',
        description: 'Refreshing iced tea with lemon',
        price: 2.99,
        icon: '🧋'
    },
    {
        id: 9,
        name: 'Smoothie Bowl',
        category: 'drinks',
        description: 'Banana and berry smoothie',
        price: 4.99,
        icon: '🥤'
    },
    {
        id: 10,
        name: 'Soft Drink',
        category: 'drinks',
        description: 'Coca Cola, Sprite, or Fanta',
        price: 1.99,
        icon: '🥛'
    },
    // Desserts
    {
        id: 11,
        name: 'Chocolate Cake',
        category: 'desserts',
        description: 'Rich chocolate cake with frosting',
        price: 5.99,
        icon: '🍰'
    },
    {
        id: 12,
        name: 'Ice Cream Sundae',
        category: 'desserts',
        description: 'Vanilla ice cream with chocolate sauce',
        price: 4.99,
        icon: '🍦'
    },
    {
        id: 13,
        name: 'Strawberry Cheesecake',
        category: 'desserts',
        description: 'Creamy cheesecake with fresh strawberries',
        price: 6.99,
        icon: '🎂'
    },
    {
        id: 14,
        name: 'Brownie',
        category: 'desserts',
        description: 'Fudgy chocolate brownie',
        price: 3.99,
        icon: '🍫'
    }
];

// Cart Array
let cart = [];

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    displayMenuItems('all');
    setupEventListeners();
    loadCartFromStorage();
});

// Setup Event Listeners
function setupEventListeners() {
    // Logo Click - Scroll to Hero Section
    const logo = document.getElementById('logo');
    logo.addEventListener('click', () => {
        document.getElementById('hero').scrollIntoView({ behavior: 'smooth' });
    });

    // Hamburger Menu
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });

    // Category Buttons
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            displayMenuItems(e.target.dataset.category);
        });
    });

    // Order Button - Scroll to Menu
    const orderBtn = document.getElementById('order-btn');
    orderBtn.addEventListener('click', () => {
        document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
    });

    // Reservation Modal
    const reservationBtn = document.getElementById('reservation-btn');
    const reservationModal = document.getElementById('reservation-modal');
    const closeReservation = document.getElementById('close-reservation');
    const reservationForm = document.getElementById('reservation-form');

    reservationBtn.addEventListener('click', () => {
        reservationModal.classList.add('show');
    });

    closeReservation.addEventListener('click', () => {
        reservationModal.classList.remove('show');
    });

    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('✅ Table reservation confirmed! We will contact you shortly.');
        reservationForm.reset();
        reservationModal.classList.remove('show');
    });

    // Cart Modal
    const cartIcon = document.querySelector('.cart-icon');
    const cartModal = document.getElementById('cart-modal');
    const closeCart = document.getElementById('close-cart');
    const checkoutBtn = document.getElementById('checkout-btn');

    cartIcon.addEventListener('click', () => {
        updateCartDisplay();
        cartModal.classList.add('show');
    });

    closeCart.addEventListener('click', () => {
        cartModal.classList.remove('show');
    });

    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        cartModal.classList.remove('show');
        showPaymentModal();
    });

    // Payment Modal
    const paymentModal = document.getElementById('payment-modal');
    const closePayment = document.getElementById('close-payment');
    const paymentForm = document.getElementById('payment-form');

    closePayment.addEventListener('click', () => {
        paymentModal.classList.remove('show');
    });

    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        processPayment();
    });

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('✅ Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === reservationModal) {
            reservationModal.classList.remove('show');
        }
        if (e.target === cartModal) {
            cartModal.classList.remove('show');
        }
        if (e.target === paymentModal) {
            paymentModal.classList.remove('show');
        }
    });
}

// Display Menu Items
function displayMenuItems(category) {
    const menuContainer = document.getElementById('menu-items');
    menuContainer.innerHTML = '';

    let itemsToDisplay = menuItems;
    if (category !== 'all') {
        itemsToDisplay = menuItems.filter(item => item.category === category);
    }

    itemsToDisplay.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.innerHTML = `
            <div class="menu-item-image">${item.icon}</div>
            <div class="menu-item-content">
                <div class="menu-item-name">${item.name}</div>
                <div class="menu-item-description">${item.description}</div>
                <div class="menu-item-price">$${item.price.toFixed(2)}</div>
                <div class="menu-item-quantity">
                    <button class="qty-decrease" data-id="${item.id}">−</button>
                    <input type="number" class="qty-input" data-id="${item.id}" value="1" min="1">
                    <button class="qty-increase" data-id="${item.id}">+</button>
                </div>
                <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
            </div>
        `;
        menuContainer.appendChild(menuItem);
    });

    // Add event listeners to quantity and cart buttons
    setupMenuItemListeners();
}

// Setup Menu Item Listeners
function setupMenuItemListeners() {
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    const qtyIncreaseBtn = document.querySelectorAll('.qty-increase');
    const qtyDecreaseBtn = document.querySelectorAll('.qty-decrease');

    qtyIncreaseBtn.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            const input = document.querySelector(`input.qty-input[data-id="${id}"]`);
            input.value = parseInt(input.value) + 1;
        });
    });

    qtyDecreaseBtn.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            const input = document.querySelector(`input.qty-input[data-id="${id}"]`);
            if (parseInt(input.value) > 1) {
                input.value = parseInt(input.value) - 1;
            }
        });
    });

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            const quantity = parseInt(document.querySelector(`input.qty-input[data-id="${id}"]`).value);
            addToCart(id, quantity);
        });
    });
}

// Add to Cart
function addToCart(itemId, quantity) {
    const item = menuItems.find(item => item.id === itemId);
    
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...item,
            quantity: quantity
        });
    }

    saveCartToStorage();
    updateCartCount();
    showNotification(`✅ ${item.name} added to cart!`);
}

// Update Cart Count
function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
}

// Update Cart Display
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; padding: 2rem;">Your cart is empty</p>';
        updateTotals();
        return;
    }

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div style="font-size: 0.9rem; color: #666;">$${item.price.toFixed(2)} each</div>
            </div>
            <div class="cart-item-controls">
                <button class="decrease-item" data-id="${item.id}">−</button>
                <span>${item.quantity}</span>
                <button class="increase-item" data-id="${item.id}">+</button>
                <button class="remove-item" data-id="${item.id}">🗑️</button>
            </div>
            <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    // Add event listeners to cart item controls
    document.querySelectorAll('.decrease-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            const item = cart.find(cartItem => cartItem.id === id);
            if (item.quantity > 1) {
                item.quantity--;
                saveCartToStorage();
                updateCartDisplay();
                updateCartCount();
            }
        });
    });

    document.querySelectorAll('.increase-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            const item = cart.find(cartItem => cartItem.id === id);
            item.quantity++;
            saveCartToStorage();
            updateCartDisplay();
            updateCartCount();
        });
    });

    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            cart = cart.filter(item => item.id !== id);
            saveCartToStorage();
            updateCartDisplay();
            updateCartCount();
        });
    });

    updateTotals();
}

// Update Totals
function updateTotals() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const deliveryFee = document.querySelector('input[name="delivery"]:checked').value === 'delivery' ? 2.50 : 0;
    const total = subtotal + deliveryFee;

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('delivery-fee').textContent = `$${deliveryFee.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// Show Payment Modal
function showPaymentModal() {
    const paymentModal = document.getElementById('payment-modal');
    const total = document.getElementById('total').textContent;
    document.getElementById('payment-total').textContent = total;
    paymentModal.classList.add('show');

    // Setup delivery type change listener
    const deliveryRadios = document.querySelectorAll('input[name="delivery"]');
    deliveryRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            updateTotals();
            document.getElementById('payment-total').textContent = document.getElementById('total').textContent;
        });
    });
}

// Process Payment
function processPayment() {
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    const cardName = document.getElementById('card-name').value;
    const cardNumber = document.getElementById('card-number').value;
    const cardExpiry = document.getElementById('card-expiry').value;
    const cardCvv = document.getElementById('card-cvv').value;

    // Simple validation
    if (paymentMethod === 'card') {
        if (!cardName || !cardNumber || !cardExpiry || !cardCvv) {
            alert('❌ Please fill in all card details');
            return;
        }
        if (cardNumber.length !== 16) {
            alert('❌ Card number must be 16 digits');
            return;
        }
        if (cardCvv.length !== 3) {
            alert('❌ CVV must be 3 digits');
            return;
        }
    }

    // Process order
    const total = document.getElementById('total').textContent;
    const deliveryType = document.querySelector('input[name="delivery"]:checked').value;
    
    alert(`✅ Order Confirmed!\n\nPayment Method: ${paymentMethod}\nDelivery Type: ${deliveryType}\nTotal: ${total}\n\nYour order will be ${deliveryType === 'delivery' ? 'delivered' : 'ready for pickup'} soon!`);

    // Clear cart and close modal
    cart = [];
    saveCartToStorage();
    updateCartCount();
    document.getElementById('payment-modal').classList.remove('show');
    document.getElementById('payment-form').reset();

    // Display menu again
    displayMenuItems('all');
}

// Save Cart to Local Storage
function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load Cart from Local Storage
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background-color: #4caf50;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        z-index: 999;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
