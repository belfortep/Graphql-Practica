const express = require('express');
const { graphqlHTTP } = require('express-graphql')  //GRAPHQL, simplemente una API con menos rutas xd
const schema = require('./graphql/schema')
const { connectDB } = require('./db/index');
const authenticate = require('./middlewares/auth');


connectDB()
const app = express()

app.use(authenticate)

app.get('/', (req, res) => {
    res.send('graphql api');
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(3000)
console.log('server on port 3000')