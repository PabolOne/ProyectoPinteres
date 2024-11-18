export class PostPage extends HTMLElement {

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
		<div class="post-container">
			<div class="post-image">
				<img src="./imagen_salida.jpg" alt="Publicación">
				<div class="controls">
					<button class="prev">&lt;</button>
					<button class="play">&#9654;</button>
					<button class="next">&gt;</button>
				</div>
			</div>
			
			<div class="post-details">
				<div class="post-info">
					<span class="time"><i><img class="post-icons" src="./src/assets/images/time.png"></i> 1:32</span>
					<span class="likes"><i><img class="post-icons" src="./src/assets/images/like.png"></i> 123</span>
					<button class="save-button">Guardar</button>
				</div>

				<p class="post-caption">Posando con mis amigos.</p>
				
				<div class="comments">
					<div class="comment">
						<img src="./imagen_salida.jpg" alt="PabloOne" class="comment-avatar">
						<span>PabloOne</span>
					</div>
					<div class="comment">
						<img src="./imagen_salida.jpg" alt="PabloTwo" class="comment-avatar">
						<span>PabloTwo</span>
						<img src="./imagen_salida.jpg" alt="Dibujo" class="comment-image">
					</div>
				</div>
				
				<button class="respond-button">Responder</button>
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
		link.setAttribute("href", "./src/pages/post/post.page.css");
		shadow.appendChild(link);
	}
}
