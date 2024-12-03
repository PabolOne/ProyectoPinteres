import { PostService } from "../../services/post.service.js";
import { UsuarioService } from "../../services/usuario.service.js";
export class PostPage extends HTMLElement {
	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: "open" });
		this.postId = this.getAttribute('postId'); 
		this.postData = null; 
		this.idUsuario = null;
		this.usuario = null;
	}

	async connectedCallback() {
		await this.#fetchPostData();
		await this.#fetchPostUser();
		this.#render();
		this.#agregaEstilo(this.shadow);
	
		const likeButton = this.shadow.getElementById('like-button');
		likeButton.disabled = false; 
		likeButton.addEventListener('click', this.#incrementarLikes.bind(this));
	}
	
	async #incrementarLikes() {
		const token = localStorage.getItem('token');
		const idUsuario = await UsuarioService.getIdPorToken(token);
	
		try {
			this.postData.likes += await UsuarioService.guardarPostLikeado(idUsuario, this.postData._id);
			const likeCountElement = this.shadow.getElementById('like-count');
			likeCountElement.textContent = this.postData.likes;
	
			console.log("Like agregado con éxito.");
		} catch (error) {
			console.error("Error al actualizar likes:", error);
			alert("No se pudo actualizar los likes. Inténtalo de nuevo.");
		}
	}
	
	async #fetchPostData() {
		if (this.postId) {
			try {
				console.log(this.postId)
				this.postData = await PostService.getPostById(this.postId); 
				 this.idUsuario = this.postData.idUsuario;
				
			} catch (error) {
				console.error("Error al obtener los datos del post:", error);
			}
		}
	}
	async #fetchPostUser() {
		if (this.idUsuario) {
			try {
				console.log(this.idUsuario)
				this.userData = await UsuarioService.getUsuarioPorId(this.idUsuario);
			} catch (error) {
				console.error("Error al obtener los datos del usuario:", error);
			}
		}
	}
	#render() {
		if (!this.postData) {
			this.shadow.innerHTML = `<p>Error: No se encontró información para el post.</p>`;
			return;
		}
		console.log(this.postData);
		const { contenido, fechaHora, likes, descripcion,posts } = this.postData; 
		const imageUrlPost = PostService.getImageById(contenido);
		

		console.log(imageUrlPost);
		this.shadow.innerHTML = `
		<div class="post-container">
			<div class="post-image">
				<img class="post-img" src="${imageUrlPost}" alt="Publicación">
			</div>
			<div class="controls">
				<button class="prev">&lt;</button>
				<button class="play">&#9654;</button>
				<button class="next">&gt;</button>
			</div>
			<div class="post-info">
					<span class="time"><i><img class="post-icons" src="../src/assets/images/time.png"></i> ${fechaHora}</span>
					<span class="likes">
						
						<span id="like-count">${likes}</span>
						<button id="like-button"><i><img class="post-icons" src="../src/assets/images/like.png"></i> </button>
					</span>

					<button class="save-button">Guardar</button>
				</div>
			<div class="post-details">
				${this.#renderUsuario()}
				<p class="post-caption">${descripcion}</p>
				<div class="comments"></div>
				<button class="respond-button">Responder</button>
			</div>
		</div>
		`;

	}

	#renderComment(comment) {

		return `
		<div class="comment">
			<img src="${comment.avatar}" alt="${comment.username}" class="comment-avatar">
			<span>${comment.username}</span>
			${comment.image ? `<img src="${comment.image}" alt="Imagen de comentario" class="comment-image">` : ''}
		</div>
		`;
	}
	#renderUsuario() {
		return `
		<div class="usuario">
			<img src="https://www.tiendalabarata.com.mx/web/image/product.product/17329/image_1024/Coca%20Cola%20Vidrio%20Retornable%201.25%20L?unique=72c830a" alt="${this.userData.username}" class="comment-avatar">
			<span>${this.userData.username}</span>
		</div>
		`;
	}
	#agregaEstilo(shadow) {
		let link = document.createElement("link");
		link.setAttribute("rel", "stylesheet");

		link.setAttribute("href", "/src/pages/post/post.page.css");

		shadow.appendChild(link);
	}
}
