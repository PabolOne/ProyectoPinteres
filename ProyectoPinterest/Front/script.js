import { HeaderComponent } from "../src/components/header/header.component.js"
import { CrearPage } from "../src/pages/Crear/crear.page.js";
import { FooterComponent } from "../src/components/footer/footer.component.js";
import { PostsPage } from "../src/pages/posts/posts.page.js";
import { PostComponent } from "../src/components/post/post.component.js";
import { ListaPage } from "../src/pages/Lista/lista.page.js";
import { ListasPage } from "../src/pages/Listas/listas.page.js";
import { LoginPage } from "../src/pages/Login/login.page.js";
import { RegistrarPage } from "../src/pages/Registrar/registrar.page.js";

import { PerfilPage } from "../src/pages/perfil/perfil.page.js";
import { ConfiguracionPage } from "../src/pages/Configuracion/configuracion.page.js";
import { PostPage } from "../src/pages/post/post.page.js";
document.addEventListener('DOMContentLoaded',function()
{
    //Configuracion de rutas
    page('/',()=> showContent('posts-page'));
    page('/crear',()=> showContent('crear-page'));
    page('/listas',()=> showContent('listas-page'));
    page('/lista',()=> showContent('lista-page'));
    page('/perfil',()=> showContent('perfil-page'));
    page('/post',()=> showContent('post-page'));
    page('/configuracion',()=> showContent('configuracion-page'));
    page('/login',()=> showContent('login-page'));
    page('/registrar',()=> showContent('registrar-page'));
    
 
    page('*',()=> showContent('posts-page'));
    //Inicializar nuestro router
    page();
});

function showContent(contentId)
{
    const contentContainer = document.getElementById('content');

    if(contentId==='posts-page')
    {
        contentContainer.innerHTML = `<${contentId} cantidadProductos=${3}></${contentId}>`;
        return
    }
    contentContainer.innerHTML = `<${contentId}></${contentId}>`;

}


//Components
window.customElements.define('header-info', HeaderComponent);
window.customElements.define('footer-info', FooterComponent);
window.customElements.define('post-info', PostComponent);

//Pages
window.customElements.define('posts-page', PostsPage);
window.customElements.define('post-page', PostPage);
window.customElements.define('crear-page', CrearPage);
window.customElements.define('listas-page', ListasPage);
window.customElements.define('lista-page', ListaPage);
window.customElements.define('login-page', LoginPage);
window.customElements.define('registrar-page', RegistrarPage);
window.customElements.define('perfil-page', PerfilPage);
window.customElements.define('configuracion-page', ConfiguracionPage);
