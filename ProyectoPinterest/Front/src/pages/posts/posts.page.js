import { PostService } from "../../services/post.service.js";

export class PostsPage extends HTMLElement {
	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: "open" });
		this.posts = [];
	}

	connectedCallback() {
		this.#cargarPosts();
	 	this.#render(this.shadow);
		this.#agregaEstilo(this.shadow);
	}

	async #cargarPosts() {
		this.posts = await PostService.getPostsContenido();
		await this.#render(this.shadow);
		this.#agregaEstilo(this.shadow);
	}

	async #render(shadow) {
		this.#agregaEstilo(this.shadow);
		shadow.innerHTML = `
		<section>
			<section class="card-container">
				${this.posts.map(post => this.#renderCard(post)).join(``)}
			</section>
		</section>
		`;
	}

	#renderCard(post) {
		const imageUrl = PostService.getImageById(post._id);
		return `
			<a href="/post/${post._id}">
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

