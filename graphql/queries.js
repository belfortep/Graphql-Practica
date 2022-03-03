const { GraphQLList, GraphQLID } = require('graphql');
const { UserType, PostType } = require('./types');
const { User, Post } = require('../models')
const users = {
    type: new GraphQLList(UserType),  //devolveme una lista de Usuarios
    async resolve() {

        return await User.find()

    }
}

const user = {
    type: UserType,
    description: 'Get user by ID',
    args: {
        id: { type: GraphQLID }
    },
    async resolve(_, args) {

        return await User.findById(args.id)

    }
};

const posts = {
    type: new GraphQLList(PostType),
    description: "Get all posts",
    async resolve() {
        return await Post.find()
    }
}

const post = {
    type: PostType,
    description: "Get a post",
    args: {
        id: { type: GraphQLID }
    },
    async resolve(_, args) {
        return await Post.findById(args.id)
    }
}



module.exports = { users, user, posts, post }