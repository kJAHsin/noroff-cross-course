// importing loader
import { loaderHide } from "./loader.js";
loaderHide();

// setting api URL for fetch
const productID = window.location.href.slice(-2);
const productObj = {}

const apiURL = `https://wordpress.skinnyk.no/wp-json/wc/store/products/${productID}`;

function fetchProduct_Individ() {
	fetch(apiURL)
		.then((data) => {
			if (data.ok) {
				return data.json();
			} else {
				alert(`man.. you  gotta quit this stuff: ${data.status}`);
			}
		})
		.then((data) => {
            productObj.title = data.name;
            productObj.description = data.short_description;
            productObj.price = `$${data.prices.regular_price / 100}`;
            productObj.img = data.images[0].src;
            productObj.alt = data.images[0].alt
        })
        .then((data) => fillCard())
        .catch((err) => alert(`whoa homey...: ${err}`));
}

fetchProduct_Individ();

function fillCard() {
	const productContainer = document.querySelector(".container");
	productContainer.innerHTML = `<div class="product-info [ column ]">
                                        <h2>${productObj.title}</h2>
                                        <p>${productObj.description.replace("<p>", "").replace("</p>", "")}</p>
                                        <h2>${productObj.price}</h2>
                                        <button class="cta">buy now</button>
                                    </div>
                                    <div class="product-image_card">
                                            <img src="${productObj.img}" alt="${productObj.alt}">
                                    </div>`;
}