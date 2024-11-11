export class CrearPage extends HTMLElement {

	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: "open" });
	}

	connectedCallback() {
		this.#agregaEstilo(this.shadow);
		this.#render(this.shadow);
	}

	#render(shadow) {
		shadow.innerHTML += `
		<div class="create-container">
			<div class="upload-box">
				<div class="upload-icon">⬆</div>
			</div>
			<div class="form-container">
				<label for="description">Descripción</label>
				<input type="text" id="description" placeholder="Descripción">
				
				<label for="tags">Tags</label>
				<input type="text" id="tags" placeholder="Tags">
				
				<button class="publish-button">Publicar</button>
			</div>
		</div>
		`;
	}
	#renderCard()
	{
		return `<a>Hola chavales</a>`;
	}
	#agregaEstilo(shadow) {
		let link = document.createElement("link");
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("href", "./src/pages/crear/crear.page.css");
		shadow.appendChild(link);
	}
}
