export function loaderHide() {
	window.addEventListener("load", () => {
		setTimeout(() => {
			const loader = document.querySelector(".loader");
			loader.classList.toggle("hide");
			}, "800")		
	});
}