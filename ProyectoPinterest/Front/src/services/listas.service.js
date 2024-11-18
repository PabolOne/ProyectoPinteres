import { PostMockup } from "../models/postMockup.js";

export class ListasService{
    static getPosts(){
        const postList = [
            new PostMockup(1, "../Front/src/assets/images/Cigarro.jpg"),
            new PostMockup(1, "../Front/src/assets/images/Robin.jpg"),
            new PostMockup(1, "../Front/src/assets/images/Pose-1.jpg")

        ];
        return postList;
    }
}