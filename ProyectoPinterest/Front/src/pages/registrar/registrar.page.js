import { LoginService } from "../../services/login.service.js";

export class RegistrarPage extends HTMLElement {

	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: "open" });
		this.logo = LoginService.getLogo();
	}

	connectedCallback() {
		this.#agregaEstilo(this.shadow);
		this.#render(this.shadow);
		this.#addEventListeners();
		setTimeout(() => this.#seleccionarImagen(this.shadow), 0);
	}

	#render(shadow) {
		shadow.innerHTML += `
		<section class="register-container">
			<form id="registerForm">
				<img src="${this.logo}" alt="Logo" class="register-image">
				<h1>Registro de usuario</h1>
				<p class="sub-text"><em>Practica y comparte</em></p> 
				<div class="input-container">
					<label for="username">Usuario</label>
					<input type="text" id="username" name="username" placeholder="Ingresa tu usuario" required>
				</div>
				<div class="input-container">
					<label for="firstName">Nombre</label>
					<input type="text" id="firstName" name="firstName" placeholder="Ingresa tu nombre" required>
				</div>
				<div class="input-container">
					<label for="lastName">Apellidos</label>
					<input type="text" id="lastName" name="lastName" placeholder="Ingresa tus apellidos" required>
				</div>
				<div class="input-container">
					<label for="email">Correo Electrónico</label>
					<input type="email" id="email" name="email" placeholder="Ingresa tu correo" required>
				</div>
				<div class="input-container">
					<label for="password">Contraseña</label>
					<input type="password" id="password" name="password" placeholder="Ingresa tu contraseña" required>
				</div>
				<div class="input-container">
				<label for="avatar">Avatar</label>
				<div class="upload-box" id="dropArea">
					<img class="upload-icon" src = "./src/assets/images/Subir.png">
				</div>
				</div>
				<button type="submit">Registrar</button>
				<p class="terms-text"> 
					Al continuar, estás aceptando nuestros <a href="#">términos y condiciones</a>, 
					además de reconocer que has leído nuestra <a href="#">política de privacidad</a>.
				</p>
			</form>
			<p class="login-text">
				¿Ya tienes una cuenta? 
				<a href="/login">Inicia sesión</a>
			</p>
		
		</section>
		`;
	}


	#agregaEstilo(shadow) {
		let link = document.createElement("link");
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("href", "../src/pages/registrar/registrar.page.css");
		shadow.appendChild(link);
	}

	#addEventListeners() {
		const form = this.shadow.querySelector('#registerForm');
		form.addEventListener('submit', async (event) => {
			event.preventDefault();
			const username = this.shadow.querySelector('#username').value;
			const firstName = this.shadow.querySelector('#firstName').value;
			const lastName = this.shadow.querySelector('#lastName').value;
			const email = this.shadow.querySelector('#email').value;
			const password = this.shadow.querySelector('#password').value;

			try {
				const avatar = await this.uploadAvatar();
				await this.#handleRegister(username, firstName, lastName, email, avatar, password);
			} catch (error) {
				console.error('Error al registrar:', error);
				alert(`Error: ${error.message}`);
			}
		});
	}

	#handleRegister(username, firstName, lastName, email, avatar, password) {
		console.log(avatar)
		return fetch('http://localhost:3001/api/usuarios/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username,
				firstName,
				lastName,
				email,
				avatar,
				password,
			}),
		})
			.then(response => response.json())
			.then(data => {
				if (data.status === 'success') {
					localStorage.setItem('token', data.token);
					alert('Registro exitoso');
					page('/posts');
				} else {
					throw new Error(data.message || 'Error en el registro');
				}
			})
			.catch(error => {
				console.error('Error al realizar el registro:', error);
				throw error;
			});
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

				// Guardar la imagen como Base64
				base64Image = event.target.result.split(',')[1];
			};
			reader.readAsDataURL(file);
		}

		this.uploadAvatar = function () {
			if (!base64Image) {
				alert('Por favor, selecciona una imagen.');
				return Promise.reject('No hay imagen seleccionada.');
			}
			return fetch('http://localhost:3001/api/usuarioAvatar', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					avatar: base64Image
				}),
			})
				.then(response => response.json())
				.then(data => {
					return data;
				})
				.catch(error => {
					console.error('Error al subir el avatar:', error.message);
					alert(`Error: ${error.message}`);
					throw error;
				});
		};
	}

}
