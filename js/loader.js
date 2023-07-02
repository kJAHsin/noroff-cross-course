export function loaderHide() {
	window.addEventListener("load", () => {
		const loader = document.querySelector(".loader");
		loader.classList.toggle("hide");
	});
}