// importing loader
import { loaderHide } from "./loader.js";
loaderHide();


// defining variabels
const productGrid = document.querySelector(".product-grid");
const productArr = [];

// setting api URL for fetch
const apiURL = "https://wordpress.skinnyk.no/wp-json/wc/store/products";

// fetching products
function fetchProducts() {
	fetch(apiURL)
		.then((data) => {
			if (data.ok) {
				return data.json();
			} else {
				alert(`oh no! this happened: ${data.status}`);
			}
		})
		.then((data) =>
			data.forEach((product) => {
				const productImg = document.querySelector(
					".featured > .product-image > img"
				);
				const productInfo = document.querySelectorAll(".featured > h2");

				if (product.categories[0].name === "featured") {
					productImg.src = product.images[0].src;
					productImg.alt = product.images[0].alt;
					productInfo[0].innerText = product.name;
					productInfo[1].innerText = `$${
						product.prices.regular_price / 100
					}`;
				}

				const productObj = {
					id: product.id,
					image: product.images[0].src,
					alt: product.images[0].alt,
					title: product.name,
					description: product.short_description
						.replace("<p>", "")
						.replace("</p>", ""),
					regular_price: `$${product.prices.regular_price / 100}`,
					sale_price: `$${product.prices.sale_price / 100}`,
					featured: (product.categories[0].name === "featured"),
				};
				
				productArr.push(productObj);
			})
		)
		.then((data) => buildCards())
		.catch((err) => alert(`whoa homey...: ${err}`));
}
fetchProducts();

function buildCards() {
	productArr.forEach(product => {
		const productCard = document.createElement("div");
		productCard.classList.add("products");
		productCard.innerHTML = `<div class="products" data-id="${product.id}">
		<div class="product-image">
		<img src="${product.image}" alt="${product.alt}" />
		</div>
		<h2>${product.title}</h2>
		<h2>${product.regular_price}</h2>
		</div>`;
		productGrid.appendChild(productCard);
	});
}