import { PostService } from "../../services/post.service.js";
export class ListaPage extends HTMLElement {

	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: "open" });
		this.posts = PostService.getPosts();
	}

	connectedCallback() {
		this.#agregaEstilo(this.shadow);
		this.#render(this.shadow);
	}

	#render(shadow) {
		shadow.innerHTML += `
		<section>
			<div class="tittle">
				Hola chavales
				<img class="icon" src="./src/assets/images/delete.png">
				<img class="icon" src="./src/assets/images/edit.png">
				
			</div>
			
			<div class="card-container">
				${this.posts.map(post => this.#renderCard(post)).join(``)}
			</div>
		</section>
		`;
	}
	#renderCard(post)
	{
		return `<post-info id="${post.id}" image=${post.image}></post-info>`;
	}
	#agregaEstilo(shadow) {
		let link = document.createElement("link");
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("href", "./src/pages/lista/lista.page.css");
		shadow.appendChild(link);
	}
}
