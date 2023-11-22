function test(self) {
    console.log('self :>> ', self);
    const id = `${self.id}-COLOR`
    const sizeText = self.getAttribute("value")
    console.log('sizeText :>> ', sizeText);
    const varsiantSelectContainer = document.getElementById(id)
    console.log('variantSelectContainer :>> ', varsiantSelectContainer);
    const matchedSizes = varsiantSelectContainer.childNodes[2].childNodes[1].childNodes
    let matched;
    for (const item of matchedSizes) {
        console.log('item.innerText :>> ', item.innerText);
        if (item.innerText == sizeText) {
            matched = item;
            break
        }
    }

    console.log('matched :>> ', matched);
    matched.childNodes[0].childNodes[0].click()
    const variantId = varsiantSelectContainer.childNodes[1].value
    console.log('variantId :>> ', variantId);
    quickAddToCart(variantId)
}

const quickAddButton = document.querySelector('.ProductItem__QuickAddButton');
const selectSizeBlock = document.querySelector('.selectasize');
const sizes = document.querySelectorAll('[data-size]');

function toggleSelectSize(event) {
    event.stopPropagation();

    if (selectSizeBlock.style.display === 'block') {
        selectSizeBlock.style.display = 'none';
    } else {
        selectSizeBlock.style.display = 'block';
    }
}

function handleSizeSelection(event) {
    const selectedSize = event.target.getAttribute('data-size');

    if (selectedSize) {
        sizes.forEach((size) => size.classList.remove('active'));
        event.target.classList.add('active');

        // Add the selected product to the cart (replace with your cart handling logic)
        addToCart(selectedSize);
    }
}

sizes.forEach((size) => size.addEventListener('click', handleSizeSelection));

quickAddButton.addEventListener('click', toggleSelectSize);

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

function quickAddToCart(variantId) {
    console.log(variantId);
    let formData = {
        items: [
            {
                id: variantId,
                quantity: 1,
            },
        ],
        sections: [`cart-icon-bubble`, 'cart-drawer'],
    };
    console.log('formData', formData);
    fetch(window.Shopify.routes.root + 'cart/add.js', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        .then(async (response) => {
            const result = await response.json();
            console.log('result', result);
            updateCart(result);
            updateBubble(result.sections['cart-icon-bubble']);
            return result;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function getSectionInnerHTML(html, selector = '.shopify-section') {
    return new DOMParser().parseFromString(html, 'text/html').querySelector(selector).innerHTML;
}

function updateCart(parsedState) {
    const sectionElement = document.getElementById('CartDrawer');
    if (sectionElement && sectionElement.parentElement && sectionElement.parentElement.classList.contains('drawer')) {
        if (parsedState.items.length > 0) {
            sectionElement.parentElement.classList.remove('is-empty');
            sectionElement.parentElement.classList.add('active');
        } else {
            sectionElement.parentElement.classList.add('is-empty');
        }

        setTimeout(() => {
            document
                .querySelector('#CartDrawer-Overlay')
                .addEventListener('click', document.querySelector('cart-drawer').close.bind(this.cart));
        });
    }
    const elementToReplace =
        sectionElement && sectionElement.querySelector('#CartDrawer')
            ? sectionElement.querySelector('#CartDrawer')
            : sectionElement;
    if (elementToReplace) {
        elementToReplace.innerHTML = getSectionInnerHTML(parsedState.sections['cart-drawer'], '#CartDrawer');
    }
}
function updateBubble(par) {
    const bubble = document.getElementById('cart-icon-bubble');
    bubble.innerHTML = par;
}