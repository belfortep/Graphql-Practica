const { GraphQLObjectType, GraphQLString, GraphQLID } = require("graphql");
const { User } = require("../models");

const UserType = new GraphQLObjectType({ //creando tipo de objeto propio
    name: "UserType",
    description: "tipo de dato de usuario",
    fields: {
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        displayName: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
    }


});

const PostType = new GraphQLObjectType({
    name: "PostType",
    description: "tipo de dato de post",
    fields: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        body: { type: GraphQLString },
        author: {
            type: UserType, resolve(parent, args) {//parent, es el dato que tiene el superior a el, osea en este caso post
                return User.findById(parent.authorId)
            }
        }
    }
})


module.exports = {
    UserType,
    PostType
}
