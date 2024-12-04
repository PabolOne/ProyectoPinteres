import { HeaderComponent } from "./src/components/header/header.component.js"
import { CrearPage } from "./src/pages/Crear/crear.page.js";
import { FooterComponent } from "./src/components/footer/footer.component.js";
import { PostsPage } from "./src/pages/posts/posts.page.js";
import { PostComponent } from "./src/components/post/post.component.js";
import { ListaPage } from "./src/pages/Lista/lista.page.js";
import { ListasPage } from "./src/pages/Listas/listas.page.js";
import { LoginPage } from "./src/pages/Login/login.page.js";
import { RegistrarPage } from "./src/pages/registrar/registrar.page.js";
import { PerfilPage } from "./src/pages/Perfil/perfil.page.js";
import { ConfiguracionPage } from "../src/pages/Configuracion/configuracion.page.js";
import { PostPage } from "./src/pages/Post/post.page.js";

document.addEventListener('DOMContentLoaded', function () {
    // Configuración de rutas
    page('/', () => showContent('login-page'));
    page('/posts', () => showContent('posts-page'));
    page('/crear', () => showContent('crear-page'));
    page('/listas', () => showContent('listas-page'));
    page('/lista', () => showContent('lista-page'));
    page('/perfil', () => showContent('perfil-page'));
    page('/post/:id', ctx => showPostPage(ctx.params.id)); 
    page('/crear/:id', ctx => showCreatePage(ctx.params.id)); 
    page('/editar/:id', ctx => showEditarPage(ctx.params.id)); 
    page('/configuracion', () => showContent('configuracion-page'));
    page('/login', () => showContent('login-page'));
    page('/registrar', () => showContent('registrar-page'));
    page('*', () => showContent('login-page'));

    // Inicializar el router
    page();
});

function showContent(contentId) {
    const contentContainer = document.getElementById('content');

    if (contentId === 'posts-page') {
        contentContainer.innerHTML = `<${contentId} cantidadProductos=${3}></${contentId}>`;
        return;
    }
    contentContainer.innerHTML = `<${contentId}></${contentId}>`;
}

// Nueva función para manejar rutas dinámicas
function showPostPage(postId) {
    const contentContainer = document.getElementById('content');
    contentContainer.innerHTML = `<post-page postId="${postId}"></post-page>`;
}

function showCreatePage(postId) {
    const contentContainer = document.getElementById('content');
    contentContainer.innerHTML = `<crear-page idPostOriginal="${postId}"></crear-page>`;
}
function showEditarPage(postId) {
    const contentContainer = document.getElementById('content');
    contentContainer.innerHTML = `<editar-page id="${postId}"></editar-page>`;
}


//Components
window.customElements.define('header-info', HeaderComponent);
window.customElements.define('footer-info', FooterComponent);
window.customElements.define('post-info', PostComponent);

//Pages
window.customElements.define('posts-page', PostsPage);
window.customElements.define('post-page', PostPage);
window.customElements.define('crear-page', CrearPage);
window.customElements.define('editar-page', EditarPage);
window.customElements.define('listas-page', ListasPage);
window.customElements.define('lista-page', ListaPage);
window.customElements.define('login-page', LoginPage);
window.customElements.define('registrar-page', RegistrarPage);
window.customElements.define('perfil-page', PerfilPage);
window.customElements.define('configuracion-page', ConfiguracionPage);
