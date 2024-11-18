import { PostService } from "../../services/post.service.js";
export class PostsPage extends HTMLElement {

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
			<section class="card-container">
				${this.posts.map(post => this.#renderCard(post)).join(``)}
			</section>
		</section>
		`;
	}
	#renderCard(post)
	{
		return `<a href="/post"><post-info id="${post.id}" image=${post.image}></post-info></a>`;
	}
	#agregaEstilo(shadow) {
		let link = document.createElement("link");
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("href", "./src/pages/posts/posts.page.css");
		shadow.appendChild(link);
	}
}
