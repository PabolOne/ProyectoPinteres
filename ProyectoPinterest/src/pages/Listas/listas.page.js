import { ListasService } from "../../services/listas.service.js";

export class ListasPage extends HTMLElement {

	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: "open" });
		this.posts = ListasService.getPosts();
	}

	connectedCallback() {
		this.#agregaEstilo(this.shadow);
		this.#render(this.shadow);
	}

	#render(shadow) {
		shadow.innerHTML += `
		<section>
			<a href="/lista">
			<div class="list-container">
				<div class="list-card"">
					<div class="collage">
						${this.#renderCard()}
						
					</div>
					<h3>Caras</h3>
					<p>163 fotos</p>
				</div>
			</a>
		</section>
		`;
	}
	#renderCard()
	{
		const post1 = this.posts[0];
		const post2 = this.posts[0];
		const post3 = this.posts[2];
		return `<post-info class="img-large" id="${post1.id}" image=${post1.image}></post-info>
				<post-info class="img-small" id="${post2.id}" image=${post2.image}></post-info>
				<post-info class="img-small" id="${post3.id}" image=${post3.image}></post-info>
				`;
				
	}
	#agregaEstilo(shadow) {
		let link = document.createElement("link");
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("href", "./src/pages/listas/listas.page.css");
		shadow.appendChild(link);
	}
}
