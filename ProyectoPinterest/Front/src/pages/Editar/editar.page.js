import { PostService } from "../../services/post.service.js";
import { UsuarioService } from "../../services/usuario.service.js";


export class EditarPage extends HTMLElement {
	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: "open" });
		this.idPostOriginal = this.getAttribute('id'); // Obtener ID del post
	}

	connectedCallback() {
		this.#verificarToken();
		this.#agregaEstilo(this.shadow);
		this.#render(this.shadow);
		setTimeout(() => {
			this.#seleccionarImagen(this.shadow);
			if (this.idPostOriginal) {
				this.#cargarDatosDelPost(); // Precargar datos del post
			}
		}, 0);
	}

	#render(shadow) {
		shadow.innerHTML += `
		<div class="create-container" id="dropContainer">
			<div class="upload-box" id="dropArea">
				<img class="upload-icon" src = "../src/assets/images/Subir.png">
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
		link.setAttribute("href", "../src/pages/Editar/editar.page.css");
		shadow.appendChild(link);
	}

	async #cargarDatosDelPost() {
		try {
			console.log("ID DEL POST SEGUN ESTO",this.idPostOriginal);

			const post = await PostService.getPostById(this.idPostOriginal);
			if (post) {
				// Rellenar los campos del formulario
				const descriptionInput = this.shadow.getElementById('description');
				const tagsInput = this.shadow.getElementById('tags');
				const dropArea = this.shadow.getElementById('dropArea');

				descriptionInput.value = post.descripcion || '';
				tagsInput.value = (post.tags || []).join(', ');

				// Precargar la imagen si existe
				if (post.image) {
					const img = document.createElement('img');
					img.src = post.image;
					img.alt = "Imagen actual";
					img.style.maxWidth = '100%';
					img.style.maxHeight = '100%';
					img.style.objectFit = 'cover';
					dropArea.innerHTML = ''; // Limpiar el área de subida
					dropArea.appendChild(img);
				}
			}
		} catch (error) {
			console.error('Error al cargar los datos del post:', error);
			alert('No se pudieron cargar los datos del post.');
		}
	}

	#seleccionarImagen(shadow) {
		const dropArea = shadow.getElementById('dropArea');
		const saveButton = shadow.getElementById('saveButton');
		let currentFile = null;
	
		if (!dropArea) {
			console.error('No se pudieron encontrar uno o más elementos necesarios.');
			return;
		}
	
		// Usar funciones flecha para mantener el contexto
		const handleDragOver = (event) => {
			event.preventDefault();
			dropArea.classList.add('drag-over');
		};
	
		const handleDrop = (event) => {
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
		};
	
		const displayFile = (file) => {
			if (!file.type.startsWith('image/')) {
				alert('Por favor, arrastra un archivo de imagen.');
				return;
			}
	
			const reader = new FileReader();
			reader.onload = (event) => {
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
		};
	
		const publicar = () => {
			if (!currentFile) {
				alert('No se ha agregado ninguna imagen.');
				return;
			}
	
			const description = String(shadow.getElementById('description').value);
			const tagsInput = shadow.getElementById('tags').value;
	
			const tags = tagsInput.split(',').map((tag) => tag.trim()).filter((tag) => tag);
	
			if (tags.length === 0) {
				alert('Por favor, añade al menos un tag.');
				return;
			}
	
			console.log("Esto es el post original", this.idPostOriginal);
	
			const reader = new FileReader();
			reader.onload = (event) => {
				const base64Content = event.target.result.split(',')[1];
				if (!this.idUsuario) {
					alert('No se pudo identificar al usuario. Intenta iniciar sesión nuevamente.');
					return;
				}
				 PostService.getPostById(this.idPostOriginal).then((postData ) => {
					this.postData = postData;
					console.log(this.postData);
					console.log(this.postData.contenido);
					PostService.updatePostContenido(base64Content, this.idUsuario, description, tags,this.postData._id,this.postData.contenido)
					.then((idContenido) => {
						
						
						limpiarCampos();
					})
					.catch((error) => {
						console.error('Error al crear el contenido:', error);
					});
				});
				
			};
	
			reader.readAsDataURL(currentFile);
		};
	
		const limpiarCampos = () => {
			shadow.getElementById('description').value = '';
			shadow.getElementById('tags').value = '';
			dropArea.innerHTML = `
				<img class="upload-icon" src="../src/assets/images/Subir.png">
			`;
			currentFile = null;
		};
	
		dropArea.addEventListener('dragover', handleDragOver);
		dropArea.addEventListener('drop', handleDrop);
		saveButton.addEventListener('click', publicar);
	}

	async #verificarToken() {
		const token = localStorage.getItem('token');
		if (!token) {
			alert('No estás autenticado. Serás redirigido al inicio de sesión.');
			window.location.href = '/';
			return;
		}
	
		const Usuario = await UsuarioService.getIdPorToken(token);
	
		this.idUsuario = Usuario; 
		console.log('ID del Usuario:', this.idUsuario);
	}
}
