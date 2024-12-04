import { PostService } from "../../services/post.service.js";
import { UsuarioService } from "../../services/usuario.service.js";

export class PerfilPage extends HTMLElement {

	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: "open" });
		this.posts = [];

	}

	async connectedCallback() {
		this.#verificarToken();
		await this.#fetchDataUser(); // Asegura que userData esté inicializado
		await this.#cargarPosts(); // Carga los posts después de obtener userData
		this.#agregaEstilo(this.shadow);
		this.#render(this.shadow);
		this.#setupLogoutButton();
	}

	async #cargarPosts() {
		if (!this.userData || !this.userData._id) {
			console.error("Error: userData no está disponible.");
			return;
		}

		try {
			this.posts = await PostService.getPostsByIdUsuario(this.userData._id);
			console.log("Posts cargados para el usuario:", this.posts);
		} catch (error) {
			console.error("Error al cargar los posts:", error);
			this.posts = [];
		}
	}

	#render(shadow) {
		shadow.innerHTML += `
		<div class="profile-container">
			<div class="profile-header">
				<img src="${UsuarioService.getImageById(this.userData.avatar)}" alt="Foto de perfil" class="profile-pic">
				<h2 class="username">${this.userData.username}</h2>
				<a href="/configuracion"><img class="settings-btn" src="../src/assets/images/Config.png"></a>
				 
			</div>
			<div class="card-container">
			${this.posts.map(post => this.#renderCard(post)).join(``)}
			</div>
			<button id="logoutBtn" class="logout-btn">Cerrar Sesión</button>
		</div>
		

		`;
	}
	#renderCard(post) {
		const imageUrl = PostService.getImageById(post.contenido._id);
		return `
			<a href="/post/${post.contenido._id}">
				<post-info id="${post.contenido._id}" image="${imageUrl}" alt="${post.contenido._id}"></post-info>
			</a>
		`;
	}
	#agregaEstilo(shadow) {
		let link = document.createElement("link");
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("href", "../src/pages/perfil/perfil.page.css");
		shadow.appendChild(link);
	}

	#verificarToken() {
		const token = localStorage.getItem('token');

		if (!token) {
			alert('No estás autenticado. Serás redirigido al inicio de sesión.');
			window.location.href = '/';
			return;
		}

		try {
			const payloadBase64 = token.split('.')[1];
			const payload = JSON.parse(atob(payloadBase64));

			console.log('ID del usuario:', payload.id);
		} catch (error) {
			console.error('Error al decodificar el token:', error);
			alert('El token es inválido. Serás redirigido al inicio de sesión.');
			localStorage.removeItem('token');
			window.location.href = '/';
		}
	}

	#setupLogoutButton() {
		const logoutBtn = this.shadow.querySelector('#logoutBtn');
		if (logoutBtn) {
			logoutBtn.addEventListener('click', () => {
				localStorage.removeItem('token');

				alert('Has cerrado sesión.');
				window.location.href = '/';
			});
		}
	}

	async #fetchDataUser() {
		const token = localStorage.getItem('token');
		const idUsuario = await UsuarioService.getIdPorToken(token);

		if (idUsuario) {
			try {
				console.log('Usuario Encontrado', idUsuario)
				this.userData = await UsuarioService.getUsuarioPorId(idUsuario);
			} catch (error) {
				console.error("Error al obtener los datos del usuario:", error);
			}
		}
	}

}
