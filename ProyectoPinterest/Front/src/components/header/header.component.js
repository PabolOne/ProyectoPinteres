import { UsuarioService } from "../../services/usuario.service.js";

export class HeaderComponent extends HTMLElement {
	constructor() {
		super();
		this.idUsuario = null;
		this.userData = null;
	}

	async connectedCallback() {
		const shadow = this.attachShadow({ mode: "open" });
		this.#addStyles(shadow);
		await this.#cargarAvatar();
		this.#render(shadow);
		this.#addSearchListener(shadow);
	}

	async #render(shadow) {
		if (!this.userData || !this.userData.avatar) {
			console.error("Datos de usuario no disponibles o incompletos.");
			return;
		}

		shadow.innerHTML += `
		<header>
			<nav class="navbar">
				<div class="navbar-buttons">
					<a href="/posts"><button class="nav-button active">Inicio</button></a>
					<a href="/crear"><button class="nav-button">Crear</button></a>
					<a href="/listas"><button class="nav-button">Listas</button></a>
				</div>
				<div class="search-bar">
					<input type="text" placeholder="Buscar..." id="search-input">
				</div>
				<a href="/perfil"><img src="${UsuarioService.getImageById(this.userData.avatar)}" alt="Perfil" class="profile-icon"></a>
			</nav>
		</header>
	  `;
	}

	#addStyles(shadow) {
		let link = document.createElement("link");
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("href", "./src/components/header/header.component.css");
		shadow.appendChild(link);
	}

	async #cargarAvatar() {
		const token = localStorage.getItem("token");
		if (!token) {
			console.error("No se encontró un token en localStorage.");
			return;
		}

		try {
			this.idUsuario = await UsuarioService.getIdPorToken(token);
			this.userData = await UsuarioService.getUsuarioPorId(this.idUsuario);
		} catch (error) {
			console.error("Error al obtener los datos del usuario:", error);
		}
	}

	#addSearchListener(shadow) {
		const searchInput = shadow.querySelector("#search-input");
		if (!searchInput) {
			console.error("No se encontró el campo de búsqueda.");
			return;
		}

		searchInput.addEventListener("input", (event) => {
			const query = event.target.value.trim();
			const searchEvent = new CustomEvent("search", {
				detail: { query }, // Enviamos la búsqueda como detalle del evento
				bubbles: true, // Permite que el evento se propague hacia elementos padres
				composed: true, // Permite que atraviese shadow DOM
			});
			this.dispatchEvent(searchEvent);
		});
	}
}
