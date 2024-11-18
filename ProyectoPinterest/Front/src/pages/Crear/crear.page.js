import { Post } from "../../models/post.js";
import { PostService } from "../../services/post.service.js";
export class CrearPage extends HTMLElement {

	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: "open" });
	}

	connectedCallback() {
		this.#agregaEstilo(this.shadow);
		this.#render(this.shadow);
		setTimeout(() => this.#seleccionarImagen(this.shadow), 0);
	}	

	#render(shadow) {
		shadow.innerHTML += `
		<div class="create-container" id="dropContainer">
			<div class="upload-box" id="dropArea">
			</div>
			<div class="form-container">
				<label for="description">Descripción</label>
				<input type="text" id="description" placeholder="Descripción">
				<label for="tags">Tags</label>
				<input type="text" id="tags" placeholder="Tags">
				
				<button class="publish-button" id="saveButton">Publicar</button>
			</div>
		</div>
		`;
	}

	#agregaEstilo(shadow) {
		let link = document.createElement("link");
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("href", "../Front/src/pages/Crear/crear.page.css");
		shadow.appendChild(link);
	}
	#seleccionarImagen(shadow) {
		const dropArea = shadow.getElementById('dropArea');
		const saveButton = shadow.getElementById('saveButton');
		let currentFile = null;
		if (!dropArea ) {
			console.error('No se pudieron encontrar uno o más elementos necesarios.');
			return;
		}
	
		const filesArray = [];
	
		// Agrega eventos al área de arrastrar y soltar
		dropArea.addEventListener('dragover', handleDragOver);
		dropArea.addEventListener('drop', handleDrop);
		
	
		saveButton.addEventListener('click', saveFileToLocalStorage);
	
		// Función para manejar el evento de arrastrar sobre el área
		function handleDragOver(event) {
			// para evitar el comportamiento predeterminado de un evento
			event.preventDefault();
			// Agrega una clase para resaltar visualmente el área de soltar
			dropArea.classList.add('drag-over');
		}
	
		// Función para manejar el evento de soltar archivos en el área
		function handleDrop(event) {
			event.preventDefault();
			dropArea.classList.remove('drag-over');
			const files = event.dataTransfer.files;
		
			if (files.length > 0) {
				const file = files[0];
				if (file.type.startsWith('image/')) {
					displayFile(file);
				} else {
					alert('Por favor, arrastra un archivo de imagen.');
				}
			}
		}
		
		function displayFile(file) {
			if (!file.type.startsWith('image/')) {
				alert('Por favor, arrastra un archivo de imagen.');
				return;
			}
	
			const reader = new FileReader();
			reader.onload = function (event) {
				const img = document.createElement('img');
				img.src = event.target.result;
				img.alt = file.name;
				img.style.maxWidth = '100%';
				img.style.maxHeight = '100%';
				img.style.objectFit = 'cover';
	
				dropArea.innerHTML = ''; // Limpia cualquier contenido previo
				dropArea.appendChild(img); // Muestra la nueva imagen
				currentFile = file; // Almacena el archivo seleccionado
			};
			reader.readAsDataURL(file);
		}
	
		
		dropArea.addEventListener('dragover', handleDragOver);
		dropArea.addEventListener('drop', handleDrop);
		
		
	
		// Función para guardar la lista de archivos en localStorage
		function saveFileToLocalStorage() {
			if (!currentFile) {
				alert('No se ha agregado ninguna imagen.');
				return;
			}

			// Convierte el archivo a base64 y lo guarda en localStorage
			const reader = new FileReader();
			reader.onload = function (event) {
				const base64Content = event.target.result.split(',')[1];
				PostService.createPost(new Post('67020ca70f10be185fbdf768',"descripcion",base64Content,"tagstataxzfdas"));
				alert('Imagen guardada en localStorage.');
			};			
			
			

			reader.readAsDataURL(currentFile);
		}
	}
	
	
}
