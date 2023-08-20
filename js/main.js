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
					const ctaBtn = document.querySelector(".featured > .cta");
					ctaBtn.addEventListener("click", () => {
						window.open(`/products.html#/${product.id}`, "_self");
					})
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
					featured: product.categories[0].name === "featured",
				};

				productArr.push(productObj);
			})
		)
		.then((data) => buildCards(data))
		.catch((err) => alert(`whoa homey...: ${err}`));
}
fetchProducts();

function buildCards() {
	productArr.forEach((product) => {
		// creating product card
		const productCard = document.createElement("div");
		productCard.classList.add("products");
		productCard.dataset.id = product.id;
		productGrid.appendChild(productCard);
		
		// adding image container
		const productImgCont = document.createElement("div");
		productImgCont.classList.add("product-image");
		productCard.appendChild(productImgCont);
		
		// placing image
		const productImg = document.createElement("img");
		productImg.src = product.image;
		productImg.alt = product.alt;
		productImgCont.appendChild(productImg);

		// adding button
		const ctaBtn = document.createElement("button");
		ctaBtn.classList.add("cta");
		ctaBtn.innerText = "see product";
		productCard.appendChild(ctaBtn);
		
		// adding title and price to card
		const cardTitle = document.createElement("h2");
		cardTitle.innerText = product.title;
		const cardPrice = document.createElement("h2");
		cardPrice.innerText = product.regular_price;
		productCard.append(cardTitle, cardPrice);
		
		ctaBtn.addEventListener("click", () => {
			window.open(`/products.html#/${product.id}`, "_self");
		});

	});
}