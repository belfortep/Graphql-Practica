//schema, que puedo modificar/alterar en la api graphql

const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const { users, user, posts, post, comments, comment } = require('./queries')
const { deleteComment, register, login, createPost, addComment, updatePost, deletePost, updateComment } = require('./mutations')

const QueryType = new GraphQLObjectType({    //objeto de consultas iniciales
    name: 'QueryType',
    description: 'Raiz de mis consultas',
    fields: {  //lo que puedo consultar, las funciones que puedo utilizar

        users: users,
        user: user,
        posts: posts,
        post: post,
        comments: comments,
        comment: comment

    }
});

const MutationType = new GraphQLObjectType({
    name: "MutationType",
    description: 'Raiz de mis mutaciones',
    fields: {
        register: register,
        login: login,
        createPost: createPost,
        updatePost: updatePost,
        deletePost: deletePost,
        addComment: addComment,
        updateComment: updateComment,
        deleteComment: deleteComment
    }
})

//las consultas solo piden datos, las mutaciones cambian

const schema = new GraphQLSchema({

    query: QueryType,
    mutation: MutationType

})

module.exports = schema

