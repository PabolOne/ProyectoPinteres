export class HeaderComponent extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		const shadow = this.attachShadow({ mode: "open" });
		this.#addStyles(shadow);
		this.#render(shadow);
	}

	#render(shadow) {
		shadow.innerHTML += `
		<header>
			<nav class="navbar">
				<div class="navbar-buttons">
				
					<a href="/"><button class="nav-button active">Inicio</button></a>
					<a href="/crear"><button class="nav-button">Crear</button></a>
					<a href="/listas"><button class="nav-button">Listas</button></a>
					<a href="/login"><button class="nav-button">Login</button></a>
					<a href="/registrar"><button class="nav-button">Registrar</button></a>
				</div>
				<div class="search-bar">
					<input type="text" placeholder="Buscar...">
				</div>
				<img src="./imagen_salida.jpg" alt="Perfil" class="profile-icon">
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
}