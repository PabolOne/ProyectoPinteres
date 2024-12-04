import { UsuarioService } from "../../services/usuario.service.js";

export class ConfiguracionPage extends HTMLElement {

	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: "open" });
	}

	async connectedCallback() {
		this.#agregaEstilo(this.shadow);
		await this.#fetchDataUser(this.shadow);
		this.#render(this.shadow);
		this.#seleccionarImagen(this.shadow);
		this.#addEventListeners();
	}

	#render(shadow) {
		shadow.innerHTML += `
		<div class="profile-container">
		<form id="actualizarForm">
			<div class="profile-info">
				<label>Usuario</label>
				<input type="text" value="${this.userData.username}" id="username">

				<label>Nombre(s)</label>
				<input type="text" value="${this.userData.nombre}" id="name">

				<label>Contraseña</label>
				<div class="password-field">
					<input type="password" value="${this.userData.password}" id="password">
					<button class="toggle-password">
						<span class="eye-icon"><img class="password-img"  src="../Front/src/assets/images/oculto.png"></span>
					</button>
				</div>

				<button class="save-button">Guardar cambios</button>
			</div>
			</form>
			<div class="profile-picture">
				<div id="dropArea">
					<img src="${UsuarioService.getImageById(this.userData.avatar)}" alt="Foto de perfil">
				</div>
				<p>Foto de perfil</p>
			</div>
		</div>
		`;
	}

	#addEventListeners() {
		const form = this.shadow.querySelector('#actualizarForm');
		const saveButton = this.shadow.querySelector('.save-button');

		saveButton.addEventListener('click', async (event) => {
			event.preventDefault();

			const username = this.shadow.querySelector('#username').value;
			const firstName = this.shadow.querySelector('#name').value;
			const email = this.userData.correo;
			const password = this.shadow.querySelector('#password').value;
			const avatar = this.userData.avatar;

			try {
				console.log('avatar', this.userData.avatar);
				console.log('avatar2', avatar);
				UsuarioService.actualizarUsuario(this.userData._id, username, firstName, email, avatar, password);
				alert('Datos actualizados con éxito');
			} catch (error) {
				console.error('Error al actualizar:', error);
				alert(`Error: ${error.message}`);
			}
		});
	}

	#renderCard() {
		return `<a>Hola chavales</a>`;
	}

	async #fetchDataUser() {
		const token = localStorage.getItem('token');
		const idUsuario = await UsuarioService.getIdPorToken(token);

		if (idUsuario) {
			try {
				console.log('Usuario Encontrado', idUsuario)
				this.userData = await UsuarioService.getUsuarioPorId(idUsuario);
			} catch (error) {
				console.error("Error al obtener los datos del usuario:", error);
			}
		}
	}

	#seleccionarImagen(shadow) {
		const dropArea = shadow.getElementById('dropArea');
		let currentFile = null;
		let base64Image = ''; // Aquí se almacenará la imagen en Base64

		if (!dropArea) {
			console.error('No se pudieron encontrar uno o más elementos necesarios.');
			return;
		}

		dropArea.addEventListener('dragover', handleDragOver);
		dropArea.addEventListener('drop', handleDrop);

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
					currentFile = file;
				} else {
					alert('Por favor, arrastra un archivo de imagen.');
				}
			}
		}

		function displayFile(file) {
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

				base64Image = event.target.result.split(',')[1];
			};
			reader.readAsDataURL(file);
		}

		this.uploadAvatar = function () {
			console.log('base64Image:', base64Image); // Verifica que la imagen esté en Base64
			return UsuarioService.actualizarUsuarioAvatar(this.userData.avatar, base64Image);
		};
	}

	#agregaEstilo(shadow) {
		let link = document.createElement("link");
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("href", "../src/pages/configuracion/configuracion.page.css");
		shadow.appendChild(link);
	}

}