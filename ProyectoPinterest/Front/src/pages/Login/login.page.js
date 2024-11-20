import { LoginService } from "../../services/login.service.js";

export class LoginPage extends HTMLElement {

	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: "open" });
		this.logo = LoginService.getLogo(); 
	}

	connectedCallback() {
		//this.#verificarToken();
		this.#agregaEstilo(this.shadow);
		this.#render(this.shadow);
		this.#addEventListeners();
	}

	#render(shadow) {
		shadow.innerHTML += `
		<section class="login-container">
		
			
			<form id="loginForm">
            <img src="${this.logo}" alt="Logo" class="login-image">
			<h1>Inicio de sesión</h1>
				<div class="input-container">
					<label for="email">Correo Electrónico</label>
					<input type="email" id="email" name="email" placeholder="Ingresa tu correo" required>
				</div>
				<div class="input-container">
					<label for="password">Contraseña</label>
					<input type="password" id="password" name="password" placeholder="Ingresa tu contraseña" required>
				</div>
				<button type="submit">Iniciar sesión</button>
                			
			<p class="forgot-password">
				<a href="/forgot-password">¿Olvidaste tu contraseña?</a>
			</p>
			
			<p class="signup-text">
				¿Aún no tienes una cuenta en Illustrate It? 
                <br>
				<a href="/registrar">Regístrate</a>
			</p>
			</form>
		</section>
		`;
	}

	#agregaEstilo(shadow) {
		let link = document.createElement("link");
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("href", "./src/pages/Login/login.page.css");
		shadow.appendChild(link);
	}

	#addEventListeners() {
		const form = this.shadow.querySelector('#loginForm');
		form.addEventListener('submit', (event) => {
			event.preventDefault();
			const email = this.shadow.querySelector('#email').value;
			const password = this.shadow.querySelector('#password').value;
			this.#handleLogin(email, password);
		});
	}

	#handleLogin(email, password) {
		fetch('http://localhost:3001/api/usuarios/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ correo: email, password: password }),
		})
		.then(response => response.json())
		.then(data => {
			if (data.status === 'success') {
				localStorage.setItem('token', data.token);
				alert('Login exitoso');
				page('/posts')
			} else {

				const errorMessage = this.shadow.querySelector('#error-message');
				if (errorMessage) {
					errorMessage.classList.remove('hidden');
				}
			}
		})
		.catch(error => {
			console.error('Error al realizar el login:', error);
			alert('Hubo un problema al iniciar sesión. Inténtalo nuevamente.');
		});
	}



}

