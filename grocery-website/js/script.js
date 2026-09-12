// =========================
// FRESHMART CART
// STEP 4.1C
// =========================


// Cart array
let cart = 
JSON.parse(localStorage.getItem("freshMartCart"))||[];


// =========================
// ELEMENTS
// =========================

const cartButtons =
    document.querySelectorAll(".cart-button");

const cartCount =
    document.getElementById("cartCount");

const cartItems =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");


// =========================
// ADD TO CART
// =========================

cartButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        // Find product card
        const card =
            button.closest(".product-card");


        // Product information
        const productName =
            card.dataset.name;

        const productPrice =
            Number(card.dataset.price);

        const productImage =
            card.dataset.image;


        // Check if product already exists
        const existingProduct =
            cart.find(function(product) {

                return product.name === productName;

            });


        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({

                name: productName,

                price: productPrice,

                image: productImage,

                quantity: 1

            });

        }


        // Update cart
        updateCart();


        // Confirmation
        alert(productName + " added to cart!");

    });

});


// =========================
// UPDATE CART
// =========================

function updateCart() {

    // Update count
    let totalQuantity = 0;
    cart.forEach(function(product) {
        totalQuantity += product.quantity;
    });
    cartCount.textContent = totalQuantity;

    localStorage.setItem(
        "freshMartCart",
        JSON.stringify(cart)
    );
    // Display cart
    displayCart();

}


// =========================
// DISPLAY CART
// =========================

function displayCart() {

    cartItems.innerHTML = "";


    // Empty cart
    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="text-muted text-center">
                Your cart is empty.
            </p>
        `;

        cartTotal.textContent = "0";

        return;

    }


    // Display products
    cart.forEach(function(product, index) {

        const itemTotal =
            product.price * product.quantity;


        const cartItem = document.createElement("div");

        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-image">

                <img
                    src="${product.image}"
                    alt="${product.name}">

            </div>


            <div class="cart-item-info">

                <h6>
                    ${product.name}
                </h6>

                <p>
                    ₹${product.price}
                </p>


                <div class="cart-quantity">

                    <button
                        class="btn btn-sm btn-outline-secondary decrease-btn"
                        data-index="${index}">

                        −

                    </button>


                    <span>
                        ${product.quantity}
                    </span>


                    <button
                        class="btn btn-sm btn-outline-secondary increase-btn"
                        data-index="${index}">

                        +

                    </button>

                </div>

            </div>


            <div class="cart-item-right">

                <strong>
                    ₹${itemTotal}
                </strong>


                <button
                    class="btn btn-sm btn-outline-danger remove-btn"
                    data-index="${index}">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>

        `;


        cartItems.appendChild(cartItem);

    });


    // Calculate total
    calculateTotal();


    // Add quantity events
    addCartEvents();

}


// =========================
// CALCULATE TOTAL
// =========================

function calculateTotal() {

    let total = 0;


    cart.forEach(function(product) {

        total +=
            product.price * product.quantity;

    });


    cartTotal.textContent = total;

}


// =========================
// CART BUTTON EVENTS
// =========================

function addCartEvents() {


    // Increase quantity
    document
        .querySelectorAll(".increase-btn")
        .forEach(function(button) {

            button.addEventListener(
                "click",
                function() {

                    const index =
                        Number(button.dataset.index);

                    cart[index].quantity++;

                    updateCart();

                }
            );

        });


    // Decrease quantity
    document
        .querySelectorAll(".decrease-btn")
        .forEach(function(button) {

            button.addEventListener(
                "click",
                function() {

                    const index =
                        Number(button.dataset.index);


                    if (cart[index].quantity > 1) {

                        cart[index].quantity--;

                    } else {

                        cart.splice(index, 1);

                    }


                    updateCart();

                }
            );

        });


    // Remove product
    document
        .querySelectorAll(".remove-btn")
        .forEach(function(button) {

            button.addEventListener(
                "click",
                function() {

                    const index =
                        Number(button.dataset.index);

                    cart.splice(index, 1);

                    updateCart();

                }
            );

        });

}

// =========================
// CART OPEN / CLOSE
// =========================

const cartButton = document.getElementById("cartButton");
const cartSection = document.getElementById("cartSection");
const closeCart = document.getElementById("closeCart");
const cartOverlay = document.getElementById("cart-overlay");



// Open cart

cartButton.addEventListener("click", function () {

    cartSection.classList.add("show");
    cartOverlay.classList.add("show");

});


// Close cart

closeCart.addEventListener("click", function () {

    cartSection.classList.remove("show");
    cartOverlay.classList.remove("show");

});
// CLOSE CART BY CLICKING OVERLAY // 
cartOverlay.addEventListener("click", function () {

    cartSection.classList.remove("show");
    cartOverlay.classList.remove("show");
});

//PRODUCT SEARCH //

const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const productCards = document.querySelectorAll(".product-card");

function filterProducts() {

    const searchText = searchInput.value.toLowerCase().trim();

    productCards.forEach(function(card) {

        const productName =
            card.dataset.name.toLowerCase();

        if (productName.includes(searchText)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }

    });
    const productsSection = document.getElementById("products");

if (productsSection) {
    productsSection.scrollIntoView({
        behavior: "smooth"
    });
}
}
// Search while typing
searchInput.addEventListener("input", filterProducts);


// Search button
searchForm.addEventListener("submit", function(event) {

    event.preventDefault();

    filterProducts();

});
// PRODUCT QUANTITY SELECTOR //

const quantityButtons =
    document.querySelectorAll(".quantity-btn");
quantityButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const selector =
            button.closest(".quantity-selector");
        const quantityValue =
            selector.querySelector(".quantity-value");
        let quantity =
            Number(quantityValue.textContent);
        // Minus button
        if (button.textContent.trim() === "−") {
            if (quantity > 1) {
                quantity--;
            }
        }
        // Plus button
        if (button.textContent.trim() === "+") {
            if(quality < 10){
                 quantity++;
            }
        }
        quantityValue.textContent = quantity;
    });
});
updateCart();
// AUTO OPEN CART // 
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("openCart") === "true") {
    cartSection.classList.add("show");
    cartOverlay.classList.add("show");
}
// DISPLAY WISHLIST PRODUCT // 
function displayWishlist() {
    const wishlistItems =
        document.getElementById("wishlistItems");
    if (!wishlistItems) {
        return;
    }
    const wishlist =
        JSON.parse(
            localStorage.getItem("freshMartWishlist")
        ) || [];
    wishlistItems.innerHTML = "";
    // Empty wishlist
    if (wishlist.length === 0) {
        wishlistItems.innerHTML = `
            <div class="col-12 text-center">
                <p class="text-muted">
                    Your wishlist is empty.
                </p>
            </div>
        `;
        return;
    }
    // Display products //

    wishlist.forEach(function(productName) {
        const productCard =
            Array.from(productCards).find(function(card) {
                return card.dataset.name === productName;
            });
        if (!productCard) {
            return;
        }
        const price =
            productCard.dataset.price;
        const image =
            productCard.dataset.image;
        wishlistItems.innerHTML += `
            <div class="col-md-6 col-lg-3">
                <div class="card h-100 shadow-sm">
                    <img
                        src="${image}"
                        class="card-img-top"
                        alt="${productName}"
                        style="height:220px; object-fit:contain;">
                    <div class="card-body text-center">
                        <h5 class="card-title">
                            ${productName}
                        </h5>
                        <h6 class="text-success">
                            ₹${price}
                        </h6>
                       <div class="d-flex justify-content-center gap-2 mt-3 flex-wrap">
    <button
        class="btn btn-success wishlist-cart-btn"
        data-name="${productName}"
        data-price="${price}"
        data-image="${image}">
        <i class="fa-solid fa-cart-shopping"></i>
        Add to Cart
    </button>
    <button
        class="btn btn-primary wishlist-buy-btn"
        data-name="${productName}"
        data-price="${price}"
        data-image="${image}">
        <i class="fa-solid fa-bolt"></i>
        Buy Now
    </button>
    <button
        class="btn btn-outline-danger wishlist-remove-btn"
        data-name="${productName}">
        <i class="fa-solid fa-trash"></i>
        Remove
    </button>
</div>
                    </div>
                </div>
            </div>
        `;
    });
    // ADD TO CART //
    document
        .querySelectorAll(".wishlist-cart-btn")
        .forEach(function(button) {
            button.addEventListener("click", function() {
                const productName =
                    button.dataset.name;
                const productPrice =
                    Number(button.dataset.price);
                const productImage =
                    button.dataset.image;
                const existingProduct =
                    cart.find(function(product) {
                        return product.name === productName;
                    });
                if (existingProduct) {
                    existingProduct.quantity++;
                } else {
                    cart.push({
                        name: productName,
                        price: productPrice,
                        image: productImage,
                        quantity: 1
                    });
                }
                updateCart();
                // open cart
                cartSection.classList.add("show");
                cart-overlay.classList.add("show");
                alert(
                    productName + " added to cart!"
                );
            });
        });
    // REMOVE FROM WISHLIST // 
    document
        .querySelectorAll(".wishlist-remove-btn")
        .forEach(function(button) {
            button.addEventListener("click", function() {
                const productName =
                    button.dataset.name;
                let wishlist =
                    JSON.parse(
                        localStorage.getItem(
                            "freshMartWishlist"
                        )
                    ) || [];
                wishlist =
                    wishlist.filter(function(name) {
                        return name !== productName;
                    });
                localStorage.setItem(
                    "freshMartWishlist",
                    JSON.stringify(wishlist)
                );
                displayWishlist();
            });
        });

// WISHLIST BUY NOW // 
document
    .querySelectorAll(".wishlist-buy-btn")
    .forEach(function(button) {
        button.addEventListener("click", function() {
            const productName =
                button.dataset.name;
            const productPrice =
                Number(button.dataset.price);
            const productImage =
                button.dataset.image;
            const existingProduct =
                cart.find(function(product) {
                    return product.name === productName;
                });
            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cart.push({
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: 1
                });
            }
            updateCart();
            // Open cart
            cartSection.classList.add("show");
            cart-overlay.classList.add("show");
        });
    });
}
// LOAD WISHLIST //
displayWishlist();

// CHECKOUT BUTTON //
const checkoutButton =
    document.getElementById("checkoutButton");
if (checkoutButton) {
    checkoutButton.addEventListener("click", function() {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }
        window.location.href = "checkout.html";
    });
}