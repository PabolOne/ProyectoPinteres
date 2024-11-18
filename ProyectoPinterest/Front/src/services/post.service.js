import { PostMockup } from "../models/postMockup.js";
const API_URL = 'http://localhost:3000/';
const URL_POST = 'api/posts/';
const URL_POST_CONTENIDO = 'api/postContenido/';
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
    static createPost(post){
        return fetch(`${API_URL}${URL_POST}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify({})
        }).then(response => response.json())
          .then(data => data);

    }
}
