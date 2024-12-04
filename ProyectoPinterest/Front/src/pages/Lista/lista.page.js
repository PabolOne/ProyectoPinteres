import { PostService } from "../../services/post.service.js";
import { ListasService } from "../../services/listas.service.js";

export class ListaPage extends HTMLElement {

	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: "open" });
		this.listId = this.getAttribute('listId'); 
		this.listaData = null;
		this.posts = [];
	}

	async connectedCallback() {
		await this.#cargarPosts();
		this.#agregaEstilo(this.shadow);
		this.#setupModal();

	}

	async #cargarPosts() {
		
			
			console.log('ID DE LA LISTA SELECCIONADA', this.listId)
			this.listaData = await ListasService.getListaById(this.listId);
			console.log('DATA ',this.listaData.posts)
			await this.#render(this.shadow);
			this.#agregaEstilo(this.shadow);
	}

	async #render(shadow) {
		this.#agregaEstilo(this.shadow);
		shadow.innerHTML = `
		<section>
			<div class="tittle">
				<div class="button-container">
					<img class="icon" src="../src/assets/images/delete.png" id="deleteButton">
					<button class="icon-button" id="openModalBtn">
						<img class="icon" src="../src/assets/images/edit.png" alt="Editar">
					</button>
				</div>
			</div>
			<div id="myModal" class="modal">
				<!-- Contenido del Modal -->
				<div class="modal-content">
					<div class="modal-header">
						<span id="closeBtn" class="close">&times;</span>
						<h2>Editar Lista</h2>
						<img src="../src/assets/images/Logo.png" alt="Logo" class="logo-pequeno">
					</div>
					<label for="listName">Nombre</label>
					<input type="text" id="listName" placeholder="Nombre de la lista">
					<label for="listDescription">Descripción</label>
					<textarea id="listDescription" placeholder="Descripción"></textarea>
					<button id="saveButton">Guardar Cambios</button>
				</div>
			</div>
			<div class="card-container">
				${this.listaData.posts.map(post => this.#renderCard(post)).join(``)}
			</div>
		</section>
		`;
	}
	
	 #renderCard(post)
	{
		console.log('POST', post)
		const imageURL = PostService.getImageById(post);
		return `
			<a href="/post/${post}">
				<post-info id="${post}" image="${imageURL}" alt="${post}"></post-info>
			</a>
		`;

	}

	#agregaEstilo(shadow) {
		let link = document.createElement("link");
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("href", "../src/pages/lista/lista.page.css");
		shadow.appendChild(link);
	}

	#setupModal() {
		const modal = this.shadow.getElementById("myModal");
		const btn = this.shadow.getElementById("openModalBtn");
		const span = this.shadow.getElementById("closeBtn");
		const saveButton = this.shadow.getElementById("saveButton"); 
		const deleteButton = this.shadow.getElementById("deleteButton");

		btn.addEventListener("click", (event) => {
			event.preventDefault();
			modal.style.display = "block";
		});

		span.addEventListener("click", () => {
			modal.style.display = "none";
		});

		window.addEventListener("click", (event) => {
			if (event.target === modal) {
				modal.style.display = "none";
			}
		});

		saveButton.addEventListener("click", async (event) => {
			event.preventDefault();
			const listName = this.shadow.getElementById("listName").value;
			const listDescription = this.shadow.getElementById("listDescription").value;
	
			try {
				const updatedList = await ListasService.actualizarLista(this.listId, listName, listDescription);
	
				if (updatedList) {
					console.log("Lista actualizada:", updatedList);
					modal.style.display = "none";  
					page("/listas"); 
				} else {
					console.error("Error al actualizar la lista");
				}
			} catch (error) {
				console.error("Error en la actualización de la lista:", error);
			}
		});

		deleteButton.addEventListener("click", async (event) => {
			event.preventDefault();


			 const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta lista? Esta acción no se puede deshacer.");

			 if (confirmDelete) {
				try {
					const deletedList = await ListasService.eliminarLista(this.listId);
					
					if (deletedList) {
						console.log("Lista eliminada:", deletedList);
			
						page("/listas"); 
					} else {
						console.error("Error al eliminar la lista");
					}
				} catch (error) {
					console.error("Error al eliminar la lista:", error);
				}
			} else {
				console.log("Eliminación cancelada por el usuario.");
			}
		});
	}
}
