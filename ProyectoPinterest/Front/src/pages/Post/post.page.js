import { PostService } from "../../services/post.service.js";
import { UsuarioService } from "../../services/usuario.service.js";
import { ListasService } from "../../services/listas.service.js";
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
		await this.#render();
		this.#agregaEstilo(this.shadow);
	
		const likeButton = this.shadow.getElementById('like-button');
		likeButton.disabled = false; 
		likeButton.addEventListener('click', this.#incrementarLikes.bind(this));
		const saveButton = this.shadow.getElementById('save-button');
		saveButton.addEventListener('click', this.#mostrarOpcionesGuardar.bind(this));

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
				this.postData = await PostService.getPostContenidoById(this.postId); 
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
	async #render() {
		if (!this.postData) {
			this.shadow.innerHTML = `<p>Error: No se encontró información para el post.</p>`;
			return;
		}
	
		const { contenido, fechaHora, likes, descripcion } = this.postData;
		const { posts } = this.postData;
		const imageUrlPost = PostService.getImageById(contenido);
	
		const tiempoDiferencia = this.#calcularDiferenciaTiempo(fechaHora);
	
		const commentsHtml = await Promise.all(posts.map(post => this.#renderComment(post)));
	
		const token = localStorage.getItem('token');
		const currentUserId = await UsuarioService.getIdPorToken(token);
	
		const ownerButtonEditsHtml = currentUserId === this.idUsuario ? `
			
				<a href="/editar/${this.postData._id}"><button  class="save-button" id="edit-button">Editar</button>	</a>		
		` : '';
		const ownerButtonsDeleteHtml = currentUserId === this.idUsuario ? `
							<button class="save-button" id="delete-button">Eliminar</button>
			
		` : '';
		this.shadow.innerHTML = `
			<div class="post-container">
				${this.#renderUsuario()}
				<p class="post-caption">${descripcion}</p>
				
				<div class="post-image">
					<img class="post-img" src="${imageUrlPost}" alt="Publicación">
				</div>
				<div class="post-info">
				
					<span class="time">
						<i><img class="post-icons" src="../src/assets/images/time.png"></i> ${tiempoDiferencia}
					</span>
					<span class="likes">
						<button id="like-button"><i><img class="post-icons" src="../src/assets/images/like.png"></i> </button>
						<span id="like-count">${likes}</span>
					</span>
					${ownerButtonEditsHtml}
					${ownerButtonsDeleteHtml}
					
					<button class="save-button" id="save-button">Guardar</button>
				</div>
				
				<div class="post-details">
					<div class="comments">
						${commentsHtml.join('')}
					</div>
					<a href="/crear/${this.postData._id}"><button class="respond-button">Responder</button></a>
				</div>
			</div>
		`;
	
		if (currentUserId === this.idUsuario) {
			const deleteButton = this.shadow.getElementById('delete-button');
	
			deleteButton.addEventListener('click', this.#eliminarPost.bind(this));
		}
	}
	
	
	async #eliminarPost() {
		console.log("ESTO QUIERO ELIMINAR",this.postData._id);
		if (confirm('¿Estás seguro de que quieres eliminar esta publicación?')) {
			try {
				
				await PostService.deletePostById(this.postData._id);
				await PostService.deletePostContenidoById(this.postId);
				alert('Publicación eliminada con éxito.');
				window.location.href = '/'; // Refrescar la página o redirigir
			} catch (error) {
				console.error('Error al eliminar la publicación:', error);
				alert('No se pudo eliminar la publicación. Intenta nuevamente.');
			}
		}
	}
	
	
	#calcularDiferenciaTiempo(fechaHora) {
		const fechaPublicacion = new Date(fechaHora);
		const ahora = new Date();
		const diferenciaSegundos = Math.floor((ahora - fechaPublicacion) / 1000);
	
		if (diferenciaSegundos < 60) {
			return `${diferenciaSegundos} segundos atrás`;
		} else if (diferenciaSegundos < 3600) {
			const minutos = Math.floor(diferenciaSegundos / 60);
			return `${minutos} minutos atrás`;
		} else if (diferenciaSegundos < 86400) {
			const horas = Math.floor(diferenciaSegundos / 3600);
			return `${horas} horas atrás`;
		} else {
			const dias = Math.floor(diferenciaSegundos / 86400);
			return `${dias} días atrás`;
		}
	}
	

	async #renderComment(comment) {
		const post = await PostService.getPostContenidoById(comment);
		const usuarioPost = await UsuarioService.getUsuarioPorId(post.idUsuario);
		console.log(post);
		return `
		<div class="comment">
			<a ><img src="${await UsuarioService.getImageById(usuarioPost.avatar)}" alt="${usuarioPost.username}" class="comment-avatar"><span> ${usuarioPost.username}</span></a>
			
			
			<span>${post.descripcion}</span>
			<a href="/post/${post.contenido}">${post.contenido ? `<img src="${await PostService.getImageById(post.contenido)}" alt="Imagen de comentario" class="comment-image">` : ''}</a>
		</div>
		`;
	}
	#renderUsuario() {
		console.log(UsuarioService.getImageById(this.userData.avatar));
		return `
		<div class="usuario">
			<img src="${UsuarioService.getImageById(this.userData.avatar)}" alt="${this.userData.username}" class="comment-avatar">
			<span>${this.userData.username}</span>
		</div>
		`;
	}
	#agregaEstilo(shadow) {
		let style = document.createElement("style");
		style.textContent = `
			#like-button {
				background: none;
				border: none;
				padding: 0;
				cursor: pointer;
				display: inline-flex;
				align-items: center;
				justify-content: center;
			}
			
			#like-button:focus {
				outline: none;
			}
			
			#like-button img {
				width: 24px;
				height: 24px;
			}
			
			#like-button:hover img {
				transform: scale(1.1);
				transition: transform 0.2s ease-in-out;
			}
		`;
		style.textContent += `
			.modal {
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background: rgba(0, 0, 0, 0.5);
				display: flex;
				justify-content: center;
				align-items: center;
				z-index: 1000;
			}

			.modal-content {
				background: white;
				padding: 20px;
				border-radius: 8px;
				box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
				text-align: center;
			}

			.modal-content h3 {
				margin-bottom: 15px;
			}

			.modal-content select {
				margin-bottom: 15px;
				width: 100%;
				padding: 8px;
			}

			.modal-content button {
				margin: 5px;
				padding: 10px 20px;
				cursor: pointer;
			}
		`;

		shadow.appendChild(style);
	
		let link = document.createElement("link");
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("href", "/src/pages/post/post.page.css");
	
		shadow.appendChild(link);
	}
	async #mostrarOpcionesGuardar() {
		const modal = document.createElement('div');
		modal.classList.add('modal');
	
		const listas = await UsuarioService.getListasUsuario(this.idUsuario);
	
		modal.innerHTML = `
			<div class="modal-content">
				<h3>Guardar en lista</h3>
				<select id="listas-combobox">
					${listas.map(lista => `<option value="${lista.id}">${lista.nombre}</option>`).join('')}
				</select>
				<button id="guardar-en-lista">Guardar</button>
				<button id="cerrar-modal">Cancelar</button>
			</div>
		`;
	
		this.shadow.appendChild(modal);
	
		const cerrarModal = () => modal.remove();
		modal.querySelector('#cerrar-modal').addEventListener('click', cerrarModal);
	
		modal.querySelector('#guardar-en-lista').addEventListener('click', async () => {
			const listaSeleccionada = this.shadow.getElementById('listas-combobox').value;
			try {
				await ListasService.guardarPostEnLista(this.postId, listaSeleccionada);
				alert('Post guardado con éxito');
			} catch (error) {
				console.error('Error al guardar el post en la lista:', error);
				alert('No se pudo guardar el post. Intenta nuevamente.');
			}
			cerrarModal();
		});
	}
	
	
}
