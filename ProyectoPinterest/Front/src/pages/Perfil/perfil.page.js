import { PostService } from "../../services/post.service.js";
export class PerfilPage extends HTMLElement {

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
		<div class="profile-container">
			<div class="profile-header">
				<img src="./imagen_salida.jpg" alt="Foto de perfil" class="profile-pic">
				<h2 class="username">PabloOne</h2>
				<a href="/configuracion"><img class="settings-btn" src="../Front/src/assets/images/Config.png"></a>
			</div>
			
			<div class="card-container">
				${this.posts.map(post => this.#renderCard(post)).join(``)}
			</div>
		</div>

		`;
	}
	#renderCard(post)
	{
		return `<post-info  id="${post.id}" image=${post.image}></post-info>`;
	}
	#agregaEstilo(shadow) {
		let link = document.createElement("link");
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("href", "../Front/src/pages/perfil/perfil.page.css");
		shadow.appendChild(link);
	}
}
