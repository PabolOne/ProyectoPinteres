import { PostService } from "../../services/post.service.js";
export class ListaPage extends HTMLElement {

	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: "open" });
		this.posts = PostService.getPosts();
	}

	connectedCallback() {
		this.#agregaEstilo(this.shadow);
		this.#render(this.shadow);
		this.#setupModal();
	}

	#render(shadow) {
		shadow.innerHTML += `
		<section>
			<div class="tittle">
				Hola chavales
				<img class="icon" src="./src/assets/images/delete.png">
				<button class="icon-button" id="openModalBtn">
					<img class="icon" src="./src/assets/images/edit.png" alt="Editar">
				</button>
			</div>
			<div id="myModal" class="modal">
            <!-- Contenido del Modal -->
            <div class="modal-content">
			<div class="modal-header">
				<span id="closeBtn" class="close">&times;</span>
				<h2>Editar Lista</h2>
				<img src="./src/assets/images/Logo.png" alt="Logo" class="logo-pequeno">
			</div>
				<label for="listName">Nombre</label>
				<input type="text" id="listName" placeholder="Nombre de la lista">
				<label for="listDescription">Descripción</label>
				<textarea id="listDescription" placeholder="Descripción"></textarea>
				<button>Guardar Cambios</button>
            </div>
        	</div>
			<div class="card-container">
				${this.posts.map(post => this.#renderCard(post)).join(``)}
			</div>
		</section>
		`;
	}
	#renderCard(post)
	{
		return `<post-info id="${post.id}" image=${post.image}></post-info>`;
	}

	#agregaEstilo(shadow) {
		let link = document.createElement("link");
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("href", "./src/pages/lista/lista.page.css");
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
}
