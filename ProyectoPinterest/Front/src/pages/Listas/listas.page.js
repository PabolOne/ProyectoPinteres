import { ListasService } from "../../services/listas.service.js";
//import jwt_decode from 'jwt-decode';


export class ListasPage extends HTMLElement {

	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: "open" });
		this.posts = ListasService.getPosts();
		this.listas = []; 
	}

	connectedCallback() {
		this.#verificarToken();
		this.#agregaEstilo(this.shadow);
		this.#render(this.shadow);
		this.#setupModal();
		this.#setupFormulario();
		//this.#obtenerListas(); 
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
				<img src="../src/assets/images/Logo.png" alt="Logo" class="logo-pequeno">
			</div>
				<label for="listName">Nombre</label>
				<input type="text" id="listName" placeholder="Nombre de la lista">
				<label for="listDescription">Descripción</label>
				<textarea id="listDescription" placeholder="Descripción"></textarea>
				<button id="crearListaBtn">Crear Lista</button>
            </div>
        </div>
		</section>
		`;

		//this.#renderListas(shadow);
	}

	/*
		// Función para renderizar las listas del usuario
		#renderListas(shadow) {
			const listasContainer = shadow.querySelector('.list-container');
			listasContainer.innerHTML = '';  // Limpiar el contenedor antes de añadir las listas
			this.listas.forEach(lista => {
				listasContainer.innerHTML += `
				<div class="list-card">
					<h3>${lista.nombre}</h3>
					<p>${lista.descripcion}</p>
				</div>
				`;
			});
		}
	*/
		// Método para obtener las listas del usuario
	/*	async #obtenerListas() {
			const token = localStorage.getItem('token');
			if (!token) return; // Si no hay token, no hacemos nada
	
			//const decodedToken = jwt_decode(token);  // Decodificar el token
			//const idUsuario = decodedToken.id;  // Obtener el idUsuario del token
	
			try {
				const response = await fetch(`http://localhost:3001/api/listas/`, {
					headers: {
						"Authorization": `Bearer ${token}`
					}
				});
	
				if (!response.ok) {
					throw new Error("Error al obtener las listas");
				}
	
				const listas = await response.json();
				this.listas = listas;  // Almacenar las listas obtenidas en el arreglo
				this.#renderListas(this.shadow);  // Renderizar las listas en el DOM
			} catch (error) {
				console.error("Error al obtener las listas", error);
				alert("Hubo un error al cargar las listas.");
			}
		}
*/

	#renderCard() {
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
		},0);
	}

	#verificarToken() {
		const token = localStorage.getItem('token');

		if (!token) {
			alert('No estás autenticado. Serás redirigido al inicio de sesión.');
			window.location.href = '/';
			return;
		}

	}

	#setupFormulario() {
		const btnCrearLista = this.shadow.getElementById("crearListaBtn");
		btnCrearLista.addEventListener("click", async (event) => {
			event.preventDefault(); 

			const nombre = this.shadow.getElementById("listName").value.trim();
			const descripcion = this.shadow.getElementById("listDescription").value.trim();

			if (!nombre) {
				alert("El nombre de la lista es obligatorio.");
				return;
			}

			try {
				const lista = await this.#crearLista({ nombre, descripcion });
				alert("Lista creada con éxito.");
				this.shadow.getElementById("myModal").style.display = "none";
			} catch (error) {
				console.error("Error al crear la lista", error);
				alert("Hubo un error al crear la lista.");
			}
		});
	}

	async #crearLista(data) {
		const token = localStorage.getItem("token");
		const response = await fetch("http://localhost:3001/api/listas", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}` 
			},
			body: JSON.stringify(data) 
		});
	
		if (!response.ok) {
			throw new Error("Error al crear la lista");
		}
	
		return response.json();
	}
	


}
