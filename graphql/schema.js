//schema, que puedo modificar/alterar en la api graphql

const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const { users, user, posts, post } = require('./queries')
const { register, login, createPost, updatePost, deletePost } = require('./mutations')

const QueryType = new GraphQLObjectType({    //objeto de consultas iniciales
    name: 'QueryType',
    description: 'Raiz de mis consultas',
    fields: {  //lo que puedo consultar, las funciones que puedo utilizar

        users: users,
        user: user,
        posts: posts,
        post: post

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
        deletePost: deletePost
    }
})

//las consultas solo piden datos, las mutaciones cambian

const schema = new GraphQLSchema({

    query: QueryType,
    mutation: MutationType

})

module.exports = schema

