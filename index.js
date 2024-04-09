const typeDefs = require('./graphql/structure')
const resolvers = require('./graphql/resolvers')
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb://localhost/granjaSA' , { useNewUrlParser: true, useUnifiedTopology: true })
.then(db => console.log('Conectado a la BD '))
.catch( err => console.log(err));

// Crea una instancia de ApolloServer y Express
const server = new ApolloServer({ typeDefs, resolvers });
const app = express();

// Inicia el servidor Apollo
server.start().then(() => {
    server.applyMiddleware({ app });
    const PORT = 4000;
    
    // Inicia el servidor Express
    app.listen({ port: PORT }, () =>
      console.log(`Servidor GraphQL listo en http://localhost:${PORT}${server.graphqlPath}`)
    );
  });
