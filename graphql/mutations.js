const { GraphQLString, GraphQLID } = require("graphql");
const { User, Post } = require('../models'); //node en una carpeta importa solo el index sin poner su nombre
const { createJWTToken } = require("../util/auth");
const { PostType } = require("./types");

//recibo datos
const register = {

    type: GraphQLString,
    description: "Registra a un nuevo usuario y devuelve un token",
    args: {//argumentos a pasar

        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        displayName: { type: GraphQLString }

    },
    async resolve(_, args) {    //cuando se llame register, hago lo que tenga la funcion
        console.log(args)//args es como el request.body de las api

        const { username, email, password, displayName } = args

        const user = new User({ username, email, password, displayName })

        await user.save();

        const token = createJWTToken({ _id: user._id, username: user.username, email: user.email })//creando el jwt

        console.log(token)

        return token
    },

};

const login = {
    type: GraphQLString,
    description: 'Login and return token',
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    async resolve(_, args) {

        const user = await User.findOne({ email: args.email }).select('+password')

        if (!user || args.password !== user.password) throw new Error('Invalid credentials');

        const token = createJWTToken({ _id: user._id, username: user.username, email: user.email })//creando el jwt

        return token

    }
};


const createPost = {
    type: PostType,
    description: "Create a new post",
    args: {
        title: { type: GraphQLString },
        body: { type: GraphQLString },
    },
    async resolve(_, args, { verifiedUser }) {

        const post = new Post({
            title: args.title,
            body: args.body,
            authorId: verifiedUser._id
        })

        await post.save()

        return post

    }
}

const updatePost = {
    type: PostType,
    description: "Update a Post",
    args: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        body: { type: GraphQLString }
    },
    async resolve(_, { id, title, body }, { verifiedUser }) {

        if (!verifiedUser) throw new Error('Unauthorized');

        const updatedPost = await Post.findOneAndUpdate(
            { _id: id, authorId: verifiedUser._id },
            {
                title,
                body
            },
            {
                new: true
            }
        );

        return updatePost

    }
}

const deletePost = {
    type: GraphQLString,
    description: "Delete a Post",
    args: {
        postId: { type: GraphQLID },

    },
    async resolve(_, { postId }, { verifiedUser }) {

        if (!verifiedUser) throw new Error('Unauthorized');

        const postDeleted = await Post.findOneAndDelete({
            _id: postId,
            authorId: verifiedUser._id
        })

        if (!postDeleted) throw new Error('Post not found');

        return 'Post deleted';

    }
}

module.exports = { register, login, createPost, updatePost, deletePost }