import { ListasService } from "../../services/listas.service.js";

export class ListasPage extends HTMLElement {

	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: "open" });
		this.posts = ListasService.getPosts();
	}

	connectedCallback() {
		this.#verificarToken();
		this.#agregaEstilo(this.shadow);
		this.#render(this.shadow);
		this.#setupModal();
	}

	#render(shadow) {
		shadow.innerHTML += `
		<section>
			<a href="/lista">
			<div class="list-container">
				<div class="list-card"">
					<div class="collage">
						${this.#renderCard()}
						
					</div>
					<h3>Caras</h3>
					<p>163 fotos</p>
				</div>
			</a>
			<button id="openModalBtn" class="create-list-button">Crear Lista</button>
		<div id="myModal" class="modal">
            <!-- Contenido del Modal -->
            <div class="modal-content">
			<div class="modal-header">
				<span id="closeBtn" class="close">&times;</span>
				<h2>Crear Lista</h2>
				<img src="../Front/src/assets/images/Logo.png" alt="Logo" class="logo-pequeno">
			</div>
				<label for="listName">Nombre</label>
				<input type="text" id="listName" placeholder="Nombre de la lista">
				<label for="listDescription">Descripción</label>
				<textarea id="listDescription" placeholder="Descripción"></textarea>
				<button>Crear Lista</button>
            </div>
        </div>
		</section>
		`;
	}
	#renderCard()
	{
		const post1 = this.posts[0];
		const post2 = this.posts[0];
		const post3 = this.posts[2];
		return `<post-info class="img-large" id="${post1.id}" image=${post1.image}></post-info>
				<post-info class="img-small" id="${post2.id}" image=${post2.image}></post-info>
				<post-info class="img-small" id="${post3.id}" image=${post3.image}></post-info>
				`;
				
	}
	#agregaEstilo(shadow) {
		let link = document.createElement("link");
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("href", "../src/pages/listas/listas.page.css");
		shadow.appendChild(link);
	}

	#setupModal() {
		const modal = this.shadow.getElementById("myModal");
		const btn = this.shadow.getElementById("openModalBtn");
		const span = this.shadow.getElementById("closeBtn");
	
		btn.onclick = (event) => {
		  event.preventDefault(); 
		  modal.style.display = "block";
		}
	
		span.onclick = () => {
		  modal.style.display = "none";
		}
	
		window.onclick = (event) => {
		  if (event.target === modal) {
			modal.style.display = "none";
		  }
		}
	}

	#verificarToken() {
		const token = localStorage.getItem('token'); 
	
		if (!token) {
			alert('No estás autenticado. Serás redirigido al inicio de sesión.');
			window.location.href = '/'; 
			return;
		}
	
	}

}
