const Post = require('../models/post');

class PostDAO{
    constructor(){}

    async crearPost(post){
        try{
            const nuevoPost = new Post(post);
            return await nuevoPost.save();
        } catch(error){
            throw error;
        }
    }

    async agregarPostsAPost(id, posts){
        try{
            const postBase = Post.findById(id);
            if(!postBase){
                throw new Error('No se encontró el post.')
            }

            postBase.posts.push(...posts.map(post =>({
                idPostOriginal: post.idPostOriginal,
                idUsuario: post.idUsuario,
                posts: post.posts,
                contenido: post.contenido,
                tags: post.tags,
                fechaHora: post.fechaHora,
                likes: post.likes
            })));

            return await postBase.save();
        } catch (error){
            throw error;
        }
    }

/*    async agregarTagsAPost(id, tags){
        try{
            const post = Post.findById(id);
            if(!post){
                throw new Error('No se encontró el post.')
            }
            post.tags.push(...tags.map(tag=>({
                
            })));
        }
    }
*/



    async obtenerPostPorId(id){
        try{
            return await Post.findById(id);
        } catch(error){
            throw error;
        }
    }

    async obtenerPosts(limit = 10){
        try {
            return await Post.find().limit(limit);
        } catch(error){
            throw error;
        }
    }

    async actualizarPostPorId(id, postData){
        try{
            return await Post.findByIdAndUpdate(id, postData, {new:true});
        } catch (error){
            throw error;
        }
    }

    async eliminarPostPorId(id){
        try{
            return await Post.findByIdAndDelete(id);
        } catch (error){
            throw error;
        }
    }
}

module.exports = new PostDAO();