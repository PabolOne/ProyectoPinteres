import { PostService } from "../../services/post.service.js";
export class PerfilPage extends HTMLElement {

	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: "open" });
		this.posts = [];

	}

	connectedCallback() {
		this.#verificarToken();
		this.#cargarPosts();
		this.#agregaEstilo(this.shadow);
		this.#render(this.shadow);
		this.#setupLogoutButton();
	}

	async #cargarPosts() {
		try {
			this.posts = await PostService.getPosts();
			console.log("Posts cargados:", this.posts);
		} catch (error) {
			console.error("Error al cargar los posts:", error);
			this.posts = [];
		}
	}

	#render(shadow) {
		shadow.innerHTML += `
		<div class="profile-container">
			<div class="profile-header">
				<img src="./imagen_salida.jpg" alt="Foto de perfil" class="profile-pic">
				<h2 class="username">PabloOne</h2>
				<a href="/configuracion"><img class="settings-btn" src="../src/assets/images/Config.png"></a>
				 
			</div>
			<button id="logoutBtn" class="logout-btn">Cerrar Sesión</button>
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
	
}
