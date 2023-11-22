function quickAddToCart(variantId, productId) {
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

function getVariantId(productId) {
    const variantSelectContainer = document.querySelector(`div[data-product-id='${productId}']`)
    variantSelectContainer.childNodes[0][5].click()
    variantSelectContainer.childNodes[0][4].value
    variantSelectContainer.childNodes[0][6].click()
    variantSelectContainer.childNodes[0][4].value
}

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

function test_manual(self) {
    const id = `NEWFORYOU-1-COLOR`
    const sizeText = 'US 2'
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
}
