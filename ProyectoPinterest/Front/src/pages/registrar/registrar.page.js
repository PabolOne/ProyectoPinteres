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
		form.addEventListener('submit', (event) => {
			event.preventDefault();
			const username = this.shadow.querySelector('#username').value;
			const firstName = this.shadow.querySelector('#firstName').value;
			const lastName = this.shadow.querySelector('#lastName').value;
			const email = this.shadow.querySelector('#email').value;
			const password = this.shadow.querySelector('#password').value;
	
			this.#handleRegister(username, firstName, lastName, email, password);
		});
	}
	
	#handleRegister(username, firstName, lastName, email, password) {
		fetch('http://localhost:3001/api/usuarios/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ 
				username, 
				firstName, 
				lastName, 
				email, 
				password 
			}),
		})
		.then(response => response.json())
		.then(data => {
			if (data.status === 'success') {
				localStorage.setItem('token', data.token);
				alert('Registro exitoso');
				page('/posts'); 
			} else {
				const errorMessage = this.shadow.querySelector('#error-message');
				if (errorMessage) {
					errorMessage.textContent = data.message || 'Error en el registro';
					errorMessage.classList.remove('hidden');
				}
			}
		})
		.catch(error => {
			console.error('Error al realizar el registro:', error);
			alert('Hubo un problema al registrarse. Inténtalo nuevamente.');
		});
	}
	
}

