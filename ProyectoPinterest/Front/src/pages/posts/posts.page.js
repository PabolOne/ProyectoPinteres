import { PostService } from "../../services/post.service.js";

export class PostsPage extends HTMLElement {
	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: "open" });
		this.posts = [];
	}

	connectedCallback() {
		this.#cargarPosts(); // Cargar todos los posts inicialmente
		this.#render(this.shadow);
		this.#agregaEstilo(this.shadow);

		// Escuchar eventos de búsqueda
		window.addEventListener("search", (event) => {
			this.#cargarPosts(event.detail.query);
		});
	}

	async #cargarPosts(query = "") {
<<<<<<< HEAD
		this.posts = await PostService.getPostsContenido(query);
=======
		this.posts = await PostService.getPostsContenido(query); // Filtrar por query si está disponible
>>>>>>> parent of 6eeb926 (Función de Eliminar y Modificar lista)
		await this.#render(this.shadow);
		this.#agregaEstilo(this.shadow);
	}

	async #render(shadow) {
		this.#agregaEstilo(this.shadow);
		shadow.innerHTML = `
		<section>
			<section class="card-container">
				${this.posts.map(post => this.#renderCard(post)).join("")}
			</section>
		</section>
		`;
	}

	#renderCard(post) {
		const imageUrl = PostService.getImageById(post.contenido);
		return `
			<a href="/post/${post.contenido}">
				<post-info id="${post._id}" image="${imageUrl}" alt="${post._id}"></post-info>
			</a>
		`;
	}
	
	#agregaEstilo(shadow) {
		let link = document.createElement("link");
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("href", "../src/pages/posts/posts.page.css");
		shadow.appendChild(link);
	}
}
