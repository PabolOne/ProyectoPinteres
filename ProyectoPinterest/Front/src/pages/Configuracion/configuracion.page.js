export class ConfiguracionPage extends HTMLElement {

	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: "open" });
	}

	connectedCallback() {
		this.#agregaEstilo(this.shadow);
		this.#render(this.shadow);
	}

	#render(shadow) {
		shadow.innerHTML += `
		<div class="profile-container">
			<div class="profile-info">
				<label>Usuario</label>
				<input type="text" value="PabloOne" readonly>

				<label>Nombre(s)</label>
				<input type="text" value="Luis Pablo" readonly>

				<label>Apellidos</label>
				<input type="text" value="Ayón Figueroa" readonly>

				<label>Contraseña</label>
				<div class="password-field">
					<input type="password" value="********">
					<button class="toggle-password">
						<span class="eye-icon"><img class="password-img"  src="../Front/src/assets/images/oculto.png"></span>
					</button>
				</div>

				<button class="save-button">Guardar cambios</button>
			</div>

			<div class="profile-picture">
				<img src="../Front/src/assets/images/imagen_salida.jpg" alt="Foto de perfil">
				<p>Foto de perfil</p>
				<button class="change-button">Cambiar</button>
			</div>
		</div>
		`;
	}
	#renderCard()
	{
		return `<a>Hola chavales</a>`;
	}
	#agregaEstilo(shadow) {
		let link = document.createElement("link");
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("href", "../Front/src/pages/configuracion/configuracion.page.css");
		shadow.appendChild(link);
	}
}
