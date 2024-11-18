import { PostMockup } from "../../models/postMockup.js";
export class PostComponent extends HTMLElement{
    constructor(){
        super();
        this.shadow = this.attachShadow({mode: 'open'});
    }

    connectedCallback(){
        const id = this.getAttribute('id');
        const image = this.getAttribute('image');

        const post = new PostMockup(id,image);
        this.#addStyles(this.shadow);
        this.#render(this.shadow,post);
    }

    #render(shadow, post)
    {
        shadow.innerHTML += `
        <div class="card">
			<img src="${post.image}" alt="hola">
		</div>
        `;
    }
    
    #addStyles(shadow) {
		let link = document.createElement("link");
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("href", "./src/components/post/post.component.css");
		shadow.appendChild(link);
	}
}