import { PostMockup } from "../models/postMockup.js";

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
}