// ======================================================
// TASTY BITES RESTAURANT
// COMPLETE JAVASCRIPT
// ======================================================

document.addEventListener("DOMContentLoaded", function () {

    // ==================================================
    // 1. AUTOMATIC COPYRIGHT YEAR
    // ==================================================

    const yearElements = document.querySelectorAll("#year");

    yearElements.forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });


    // ==================================================
    // 2. ACTIVE NAVIGATION LINK
    // ==================================================

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    const navigationLinks = document.querySelectorAll("nav a");

    navigationLinks.forEach(function (link) {

        const linkPage = link.getAttribute("href");

        if (
            linkPage === currentPage ||
            (currentPage === "" && linkPage === "index.html")
        ) {
            link.classList.add("active");
        }

    });


    // ==================================================
    // 3. MOBILE NAVIGATION
    // ==================================================

    const nav = document.querySelector("nav");

    if (nav) {

        const menuButton = document.createElement("button");

        menuButton.id = "mobileMenuButton";
        menuButton.innerHTML = "☰";
        menuButton.setAttribute("aria-label", "Open navigation menu");

        nav.parentNode.insertBefore(menuButton, nav);

        menuButton.addEventListener("click", function () {

            nav.classList.toggle("mobile-open");

            if (nav.classList.contains("mobile-open")) {
                menuButton.innerHTML = "✕";
            } else {
                menuButton.innerHTML = "☰";
            }

        });

        navigationLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                nav.classList.remove("mobile-open");
                menuButton.innerHTML = "☰";

            });

        });

    }


    // ==================================================
    // 4. BACK TO TOP BUTTON
    // ==================================================

    let backToTop = document.querySelector("#backToTop");

    if (!backToTop) {

        backToTop = document.createElement("button");

        backToTop.id = "backToTop";
        backToTop.innerHTML = "⬆️";
        backToTop.title = "Back to top";

        document.body.appendChild(backToTop);

    }

    window.addEventListener("scroll", function () {

        if (window.scrollY > 400) {
            backToTop.style.display = "block";
        } else {
            backToTop.style.display = "none";
        }

    });

    backToTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    // ==================================================
    // 5. DARK MODE
    // ==================================================

    const darkModeButton = document.createElement("button");

    darkModeButton.id = "darkModeButton";
    darkModeButton.innerHTML = "🌙";
    darkModeButton.title = "Toggle dark mode";

    document.body.appendChild(darkModeButton);

    const savedTheme = localStorage.getItem("tastyBitesTheme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        darkModeButton.innerHTML = "☀️";
    }

    darkModeButton.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {

            localStorage.setItem("tastyBitesTheme", "dark");
            darkModeButton.innerHTML = "☀️";

        } else {

            localStorage.setItem("tastyBitesTheme", "light");
            darkModeButton.innerHTML = "🌙";

        }

    });


    // ==================================================
    // 6. NOTIFICATION SYSTEM
    // ==================================================

    function showNotification(message, type = "success") {

        const notification = document.createElement("div");

        notification.className = "notification " + type;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(function () {
            notification.classList.add("show");
        }, 50);

        setTimeout(function () {

            notification.classList.remove("show");

            setTimeout(function () {
                notification.remove();
            }, 400);

        }, 3000);

    }


    // ==================================================
    // 7. FORM VALIDATION
    // ==================================================

    const forms = document.querySelectorAll("form");

    forms.forEach(function (form) {

        form.addEventListener("submit", function (event) {

            let valid = true;

            const requiredFields =
                form.querySelectorAll("[required]");

            requiredFields.forEach(function (field) {

                if (field.value.trim() === "") {

                    valid = false;

                    field.classList.add("input-error");

                } else {

                    field.classList.remove("input-error");

                }

            });


            // Email validation

            const email =
                form.querySelector('input[type="email"]');

            if (email && email.value.trim() !== "") {

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!emailPattern.test(email.value)) {

                    valid = false;

                    email.classList.add("input-error");

                    showNotification(
                        "Please enter a valid email address.",
                        "error"
                    );

                }

            }


            if (!valid) {

                event.preventDefault();

                showNotification(
                    "Please complete all required fields.",
                    "error"
                );

            }

        });

    });


    // ==================================================
    // 8. RESERVATION DATE VALIDATION
    // ==================================================

    const dateInputs =
        document.querySelectorAll('input[type="date"]');

    dateInputs.forEach(function (input) {

        const today = new Date();

        const year = today.getFullYear();
        const month =
            String(today.getMonth() + 1).padStart(2, "0");
        const day =
            String(today.getDate()).padStart(2, "0");

        input.min = `${year}-${month}-${day}`;

    });


    // ==================================================
    // 9. MENU SEARCH
    // ==================================================

    const searchInput =
        document.querySelector("#menuSearch");

    const menuItems =
        document.querySelectorAll(".menu-item");

    if (searchInput && menuItems.length > 0) {

        searchInput.addEventListener("input", function () {

            const searchTerm =
                searchInput.value.toLowerCase().trim();

            menuItems.forEach(function (item) {

                const text =
                    item.textContent.toLowerCase();

                if (text.includes(searchTerm)) {

                    item.style.display = "";

                } else {

                    item.style.display = "none";

                }

            });

        });

    }


    // ==================================================
    // 10. MENU CATEGORY FILTER
    // ==================================================

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const category =
                button.getAttribute("data-category");

            filterButtons.forEach(function (btn) {
                btn.classList.remove("selected");
            });

            button.classList.add("selected");

            menuItems.forEach(function (item) {

                const itemCategory =
                    item.getAttribute("data-category");

                if (
                    category === "all" ||
                    category === itemCategory
                ) {

                    item.style.display = "";

                } else {

                    item.style.display = "none";

                }

            });

        });

    });


    // ==================================================
    // 11. SHOPPING CART
    // ==================================================

    let cart =
        JSON.parse(localStorage.getItem("tastyBitesCart")) || [];


    function saveCart() {

        localStorage.setItem(
            "tastyBitesCart",
            JSON.stringify(cart)
        );

    }


    function addToCart(name, price) {

        const existingItem =
            cart.find(function (item) {
                return item.name === name;
            });


        if (existingItem) {

            existingItem.quantity++;

        } else {

            cart.push({
                name: name,
                price: Number(price),
                quantity: 1
            });

        }

        saveCart();

        updateCart();

        showNotification(
            `${name} added to your order!`
        );

    }


    function removeFromCart(index) {

        cart.splice(index, 1);

        saveCart();

        updateCart();

    }


    function changeQuantity(index, amount) {

        cart[index].quantity += amount;

        if (cart[index].quantity <= 0) {

            cart.splice(index, 1);

        }

        saveCart();

        updateCart();

    }


    function updateCart() {

        const cartContainer =
            document.querySelector("#cartItems");

        const cartCount =
            document.querySelector("#cartCount");

        const cartTotal =
            document.querySelector("#cartTotal");


        let total = 0;
        let count = 0;


        if (cartContainer) {

            cartContainer.innerHTML = "";

            if (cart.length === 0) {

                cartContainer.innerHTML =
                    "<p>Your cart is empty.</p>";

            }


            cart.forEach(function (item, index) {

                const itemTotal =
                    item.price * item.quantity;

                total += itemTotal;

                count += item.quantity;


                const cartItem =
                    document.createElement("div");

                cartItem.className = "cart-item";


                cartItem.innerHTML = `
                    <h3>${item.name}</h3>

                    <p>
                        \u20A6${item.price.toLocaleString()}
                    </p>

                    <button class="quantity-minus">
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button class="quantity-plus">
                        +
                    </button>

                    <p>
                        Subtotal:
                        \u20A6${itemTotal.toLocaleString()}
                    </p>

                    <button class="remove-item">
                        Remove
                    </button>
                `;


                cartItem
                    .querySelector(".quantity-minus")
                    .addEventListener("click", function () {

                        changeQuantity(index, -1);

                    });


                cartItem
                    .querySelector(".quantity-plus")
                    .addEventListener("click", function () {

                        changeQuantity(index, 1);

                    });


                cartItem
                    .querySelector(".remove-item")
                    .addEventListener("click", function () {

                        removeFromCart(index);

                    });


                cartContainer.appendChild(cartItem);

            });

        }


        if (cartCount) {
            cartCount.textContent = count;
        }


        if (cartTotal) {

            cartTotal.textContent =
                `\u20A6${total.toLocaleString()}`;

        }

    }


    // ==================================================
    // 12. ADD-TO-CART BUTTONS
    // ==================================================

    const addButtons =
        document.querySelectorAll(".add-to-cart");


    addButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const name =
                button.getAttribute("data-name");

            const price =
                button.getAttribute("data-price");


            if (!name || !price) {

                showNotification(
                    "Please add the food name and price.",
                    "error"
                );

                return;

            }


            addToCart(name, price);

        });

    });


    updateCart();


    // ==================================================
    // 13. FAQ ACCORDION
    // ==================================================

    const faqQuestions =
        document.querySelectorAll(".faq-question");


    faqQuestions.forEach(function (question) {

        question.addEventListener("click", function () {

            const answer =
                question.nextElementSibling;

            const isOpen =
                answer.classList.contains("faq-open");


            document
                .querySelectorAll(".faq-answer")
                .forEach(function (item) {

                    item.classList.remove("faq-open");

                });


            document
                .querySelectorAll(".faq-question")
                .forEach(function (item) {

                    item.classList.remove("faq-active");

                });


            if (!isOpen) {

                answer.classList.add("faq-open");

                question.classList.add("faq-active");

            }

        });

    });


    // ==================================================
    // 14. GALLERY LIGHTBOX
    // ==================================================

    const galleryImages =
        document.querySelectorAll(".gallery img");


    if (galleryImages.length > 0) {

        const lightbox =
            document.createElement("div");

        lightbox.id = "lightbox";


        const closeButton =
            document.createElement("button");

        closeButton.id = "lightboxClose";
        closeButton.innerHTML = "✕";


        const lightboxImage =
            document.createElement("img");


        lightbox.appendChild(closeButton);
        lightbox.appendChild(lightboxImage);

        document.body.appendChild(lightbox);


        galleryImages.forEach(function (image) {

            image.addEventListener("click", function () {

                lightboxImage.src = image.src;

                lightboxImage.alt =
                    image.alt || "Tasty Bites food";

                lightbox.classList.add("active");

            });

        });


        closeButton.addEventListener("click", function () {

            lightbox.classList.remove("active");

        });


        lightbox.addEventListener("click", function (event) {

            if (event.target === lightbox) {

                lightbox.classList.remove("active");

            }

        });

    }


    // ==================================================
    // 15. SCROLL ANIMATIONS
    // ==================================================

    const animatedElements =
        document.querySelectorAll(
            ".card, section, h2, .service, .testimonial"
        );


    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "scroll-visible"
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    animatedElements.forEach(function (element) {

        element.classList.add("scroll-hidden");

        observer.observe(element);

    });


    // ==================================================
    // 16. PHONE NUMBER CLICK
    // ==================================================

    const phoneNumbers =
        document.querySelectorAll(".phone-number");


    phoneNumbers.forEach(function (phone) {

        phone.addEventListener("click", function () {

            showNotification(
                "Calling Tasty Bites: 08060707486"
            );

        });

    });


    // ==================================================
    // 17. SMOOTH INTERNAL LINKS
    // ==================================================

    const internalLinks =
        document.querySelectorAll('a[href^="#"]');


    internalLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetID =
                link.getAttribute("href");

            if (targetID === "#") {
                return;
            }


            const target =
                document.querySelector(targetID);


            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });


    // ==================================================
    // 18. PREVENT DOUBLE SUBMISSION
    // ==================================================

    forms.forEach(function (form) {

        form.addEventListener("submit", function () {

            const submitButton =
                form.querySelector(
                    'button[type="submit"], input[type="submit"]'
                );


            if (submitButton) {

                setTimeout(function () {

                    submitButton.disabled = true;

                    submitButton.dataset.originalText =
                        submitButton.textContent;

                    if (submitButton.tagName === "BUTTON") {

                        submitButton.textContent =
                            "Sending...";

                    } else {

                        submitButton.value =
                            "Sending...";

                    }

                }, 50);

            }

        });

    });


    // ==================================================
    // 19. WELCOME MESSAGE
    // ==================================================

    console.log(
        "🍽️ Welcome to Tasty Bites Restaurant!"
    );

    console.log(
        "JavaScript loaded successfully."
    );

});