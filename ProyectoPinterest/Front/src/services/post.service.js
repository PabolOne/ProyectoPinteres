import { PostMockup } from "../models/postMockup.js";
const API_URL = 'http://localhost:3001/';
const URL_POST = 'api/posts';
const URL_POST_CONTENIDO = 'api/postContenido';
//import { Post } from "../models/post.js";
export class PostService{
    static getPosts(){
        const postList = [
            new PostMockup(1, "./src/assets/images/Cigarro.jpg"),
            new PostMockup(1, "./src/assets/images/Robin.jpg"),
            new PostMockup(1, "./src/assets/images/Pose-1.jpg"),
            new PostMockup(1, "./src/assets/images/Pose-2.jpg"),
            new PostMockup(1, "./src/assets/images/Pose-3.jpg"),
            new PostMockup(1, "./src/assets/images/Pose-4.jpg"),
            new PostMockup(1, "./src/assets/images/Pose-5.jpg"),
            new PostMockup(1, "./src/assets/images/Pose-6.jpg"),
            new PostMockup(1, "./src/assets/images/Pose-7.jpg"),
            new PostMockup(1, "./src/assets/images/Pose-8.jpg")

        ];
        return postList;
    }
    static async createPostContenido(contenido,idUsuario,descripcion,tags){
        fetch(`${API_URL}${URL_POST_CONTENIDO}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({contenido})
        }).then(response => response.json())
        .then(data => {
            console.log(data._id); 
            
            this.createPost(idUsuario,String(data._id),descripcion,tags);
            return data._id; 
        })
          .then(data => data).catch((error)=>{
            console.log(error);
          });

    }
    static async createPost(idUsuario,contenido,descripcion,tags){
        return fetch(`${API_URL}${URL_POST}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({idUsuario,contenido,descripcion,tags})
        }).then(response => response.json())
          .then(data => data).catch((error)=>{
            console.log(error);
          });

    }
}
