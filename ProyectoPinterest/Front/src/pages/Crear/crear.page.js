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
				<img class="upload-icon" src = "./src/assets/images/Subir.png">
			</div>
			<div class="form-container">
				<label for="description">Descripción</label>
				<input type="text" id="description" placeholder="Descripción">
				<label for="tags">Tags</label>
				<input type="text" id="tags" placeholder="Tag-1,Tag-2,...">
				
				<button class="publish-button" id="saveButton">Publicar</button>
			</div>
		</div>
		`;
	}

	#agregaEstilo(shadow) {
		let link = document.createElement("link");
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("href", "./src/pages/crear/crear.page.css");
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
	
		dropArea.addEventListener('dragover', handleDragOver);
		dropArea.addEventListener('drop', handleDrop);
		
	
		saveButton.addEventListener('click', publicar);
	
		function handleDragOver(event) {
			event.preventDefault();
			dropArea.classList.add('drag-over');
		}
	
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
	
				dropArea.innerHTML = ''; 
				dropArea.appendChild(img); 
				currentFile = file;
			};
			reader.readAsDataURL(file);
		}
	
		
		dropArea.addEventListener('dragover', handleDragOver);
		dropArea.addEventListener('drop', handleDrop);
		
		
	
		function publicar() {
			if (!currentFile) {
				alert('No se ha agregado ninguna imagen.');
				return;
			}
		
			const description = String(shadow.getElementById('description').value);
			const tagsInput = shadow.getElementById('tags').value;
		
			const tags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag);
		
			if (tags.length === 0) {
				alert('Por favor, añade al menos un tag.');
				return;
			}
		
			const reader = new FileReader();
			reader.onload = function (event) {
				const base64Content = event.target.result.split(',')[1];
		
				PostService.createPostContenido(base64Content, '6715c4258cb28cfbc577c699', description, tags)
					.then(idContenido => {
						console.log('ID del contenido creado:', idContenido);
						
						limpiarCampos();
					})
					.catch(error => {
						console.error('Error al crear el contenido:', error);
					});
			};
		
			reader.readAsDataURL(currentFile);
		}
		
		function limpiarCampos() {
			
			shadow.getElementById('description').value = '';
			
			shadow.getElementById('tags').value = '';
			
			dropArea.innerHTML = `
				<img class="upload-icon" src = "./src/assets/images/Subir.png">
			`;
			currentFile = null; 
		}
		
		
	}
	
	
}
