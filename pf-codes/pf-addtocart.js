const quickAddButtons = document.querySelectorAll('.ProductItem__QuickAddButton');

quickAddButtons.forEach((quickAddButton) => {
    const sizes = document.querySelectorAll('[data-size]');
    sizes.forEach((size) => size.addEventListener('click', (event) => handleSizeSelection(event, sizes)));
})

function handleSizeSelection(event, sizes) {
    const selectedSize = event.target.getAttribute('data-size');

    if (selectedSize) {
        sizes.forEach((size) => size.classList.remove('active'));
        event.target.classList.add('active');

        // Add the selected product to the cart (replace with your cart handling logic)
        addToCart(selectedSize);
    }
}




document.addEventListener('click', function closeSelectSizeBlock(event) {
    if (!event.target.closest('.tooltip')) {
        selectSizeBlock.style.display = 'none';
    }
});

function addToCart(selectedSize) {
    // Replace this function with your cart handling logic
    console.log(`Added size ${selectedSize} to the cart.`);
    // You can use an API call or update your cart state here.
}

document.addEventListener("DOMContentLoaded", function () {
    var stickyCart = document.querySelector(".custom-sticky-cart");
    var footer = document.getElementById("shopify-section-sections--21344853295386__footer"); // Using the footer's ID
    var scrollThreshold = 200;
    var isVisible = false;

    function updateStickyCartVisibility() {
        var footerTop = footer.getBoundingClientRect().top;

        if (window.scrollY > scrollThreshold && footerTop > window.innerHeight && !isVisible) {
            stickyCart.classList.add("visible");
            isVisible = true;
        } else if (window.scrollY <= scrollThreshold || footerTop <= window.innerHeight) {
            stickyCart.classList.remove("visible");
            isVisible = false;
        }
    }

    window.addEventListener("scroll", updateStickyCartVisibility);
    updateStickyCartVisibility();
});