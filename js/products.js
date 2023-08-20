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
        // adding product card
        const productInfo = document.createElement("div");
        productInfo.classList.add("product-info", "column");

        // adding title, description and price
        const productTitle = document.createElement("h2");
        productTitle.innerText = productObj.title;
        const productDescr = document.createElement("p");
        productDescr.innerText = productObj.description.replace("<p>", "").replace("</p>", "");
        const productPrice = document.createElement("h2");
        productPrice.innerText = productObj.price;

        // creating cta button
        const ctaBtn = document.createElement("button");
        ctaBtn.classList.add("cta")
        ctaBtn.innerText = "buy now";

        // creating product image card
        const productImgCont = document.createElement("div");
        productImgCont.classList.add("product-image_card");

        // adding image
        const productImg = document.createElement("img");
        productImg.src = productObj.img;
        productImg.alt = productObj.alt;
        productImgCont.appendChild(productImg);

        // adding elements to dom
        productContainer.append(productInfo, productImgCont);
        productInfo.append(productTitle, productDescr, productPrice, ctaBtn);
}