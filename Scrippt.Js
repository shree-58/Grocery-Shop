
const products = [
    // Fruits
    {name:"Apple", category:"Fruits", price:120, unit:"kg", emoji:"🍎"},
    {name:"Banana", category:"Fruits", price:50, unit:"dozen", emoji:"🍌"},
    {name:"Mango", category:"Fruits", price:100, unit:"kg", emoji:"🥭"},
    {name:"Orange", category:"Fruits", price:80, unit:"kg", emoji:"🍊"},
    {name:"Grapes", category:"Fruits", price:90, unit:"kg", emoji:"🍇"},

    // Vegetables
    {name:"Potato", category:"Vegetables", price:30, unit:"kg", emoji:"🥔"},
    {name:"Tomato", category:"Vegetables", price:40, unit:"kg", emoji:"🍅"},
    {name:"Onion", category:"Vegetables", price:35, unit:"kg", emoji:"🧅"},
    {name:"Carrot", category:"Vegetables", price:50, unit:"kg", emoji:"🥕"},
    {name:"Cabbage", category:"Vegetables", price:30, unit:"piece", emoji:"🥬"},

    // Dairy
    {name:"Milk", category:"Dairy", price:30, unit:"500 ml", emoji:"🥛"},
    {name:"Butter", category:"Dairy", price:55, unit:"100 g", emoji:"🧈"},
    {name:"Cheese", category:"Dairy", price:100, unit:"200 g", emoji:"🧀"},
    {name:"Curd", category:"Dairy", price:40, unit:"500 g", emoji:"🥣"},

    // Grains
    {name:"Rice", category:"Grains", price:60, unit:"kg", emoji:"🍚"},
    {name:"Wheat Flour", category:"Grains", price:45, unit:"kg", emoji:"🌾"},
    {name:"Dal", category:"Grains", price:110, unit:"kg", emoji:"🫘"},
    {name:"Sugar", category:"Grains", price:45, unit:"kg", emoji:"🍬"},

    // Bakery
    {name:"Bread", category:"Bakery", price:35, unit:"packet", emoji:"🍞"},
    {name:"Cake", category:"Bakery", price:80, unit:"piece", emoji:"🍰"},
    {name:"Biscuits", category:"Bakery", price:20, unit:"packet", emoji:"🍪"},

    // Snacks
    {name:"Chips", category:"Snacks", price:20, unit:"packet", emoji:"🍟"},
    {name:"Chocolate", category:"Snacks", price:40, unit:"piece", emoji:"🍫"},
    {name:"Namkeen", category:"Snacks", price:50, unit:"packet", emoji:"🥨"},

    // Beverages
    {name:"Orange Juice", category:"Beverages", price:60, unit:"1 litre", emoji:"🧃"},
    {name:"Tea", category:"Beverages", price:120, unit:"250 g", emoji:"🍵"},
    {name:"Coffee", category:"Beverages", price:150, unit:"100 g", emoji:"☕"},

    // Household
    {name:"Soap", category:"Household", price:35, unit:"piece", emoji:"🧼"},
    {name:"Detergent", category:"Household", price:80, unit:"kg", emoji:"🫧"},
    {name:"Toothpaste", category:"Household", price:60, unit:"pack", emoji:"🪥"}
];

let cart = {};
let selectedCategory = "All";

// Display products
function displayProducts() {
    const container = document.getElementById("product-container");
    const search = document.getElementById("search").value.toLowerCase();

    container.innerHTML = "";

    const filtered = products.filter(product => {
        const matchCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        const matchSearch =
            product.name.toLowerCase().includes(search);

        return matchCategory && matchSearch;
    });

    if (filtered.length === 0) {
        container.innerHTML = "<p>No products found!</p>";
        return;
    }

    filtered.forEach((product) => {
        const index = products.indexOf(product);

        container.innerHTML += `
            <div class="product-card">
                <div class="product-image">${product.emoji}</div>
                <h3>${product.name}</h3>
                <p>${product.category}</p>
                <p class="price">
                    ₹${product.price} / ${product.unit}
                </p>
                <button class="add-btn"
                    onclick="addToCart(${index})">
                    Add to Cart +
                </button>
            </div>
        `;
    });
}

// Filter category
function filterCategory(category) {
    selectedCategory = category;
    displayProducts();
}

// Add product to cart
function addToCart(index) {
    const product = products[index];

    if (cart[index]) {
        cart[index].quantity++;
    } else {
        cart[index] = {
            ...product,
            quantity: 1
        };
    }

    updateCart();
}

// Change quantity
function changeQuantity(index, amount) {
    if (!cart[index]) return;

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        delete cart[index];
    }

    updateCart();
}

// Update cart
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    Object.keys(cart).forEach(index => {
        const item = cart[index];

        total += item.price * item.quantity;
        count += item.quantity;

        cartItems.innerHTML += `
            <div class="cart-row">
                <div>
                    <strong>${item.emoji} ${item.name}</strong>
                    <p>₹${item.price} × ${item.quantity}</p>
                </div>
                <div>
                    <button onclick="changeQuantity(${index}, -1)">−</button>
                    ${item.quantity}
                    <button onclick="changeQuantity(${index}, 1)">+</button>
                </div>
            </div>
        `;
    });

    cartCount.innerText = count;
    cartTotal.innerText = total;
}

// Open and close cart
function toggleCart() {
    const panel = document.getElementById("cart-panel");

    panel.style.display =
        panel.style.display === "block" ? "none" : "block";
}

// Demo checkout
function checkout() {
    if (Object.keys(cart).length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Thank you for shopping at Fresh Basket! " +
          "Your total is ₹" +
          document.getElementById("cart-total").innerText +
          ". This is a demo order.");

    cart = {};
    updateCart();
    toggleCart();
}

// Initial display
displayProducts();
