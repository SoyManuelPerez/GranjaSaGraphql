const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');
// Conexión a la base de datos MongoDB
mongoose.connect('mongodb://localhost/granjaSA' , { useNewUrlParser: true, useUnifiedTopology: true })
.then(db => console.log('Conectado a la BD '))
.catch( err => console.log(err));
// Define tu esquema de GraphQL
const typeDefs = gql`
  type User {
    id: ID!
    cedula: Int,
    nombre: String,
    dir: String,
    tel: Int
  }

  type Query {
    users: [User]
  }
  type Mutation {
    createUser(cedula: Int!, nombre: String!, dir: String!, tel: Int!): User
    deleteUserByCedula(cedula: Int!): User
  }
`;
// Define tus resolvers
const resolvers = {
  Query: {
    users: async () => {
      const users = await User.find();
      console.log(users)
      return users;
    }
  },
  Mutation: {
    createUser: async (_, { cedula, nombre, dir, tel }) => {
      const newUser = new User({ cedula, nombre, dir, tel });
      await newUser.save();
      return newUser;
    },
    deleteUserByCedula: async (_,{ cedula }) => {
      const deletedUser = await User.findOneAndDelete({ cedula });
      console.log("Usuario eliminado")
      return deletedUser;
    }
  }
};
// Define tu modelo de datos con Mongoose
const User = mongoose.model("clientes", {
  cedula: Number,
    nombre: String,
    dir: String,
    tel: Number
});
// Crea una instancia de ApolloServer
const server = new ApolloServer({ typeDefs, resolvers });
// Crea una instancia de Express
const app = express();
// Inicia el servidor Apollo
server.start().then(() => {
    // Aplica ApolloServer como middleware en Express
    server.applyMiddleware({ app });
  
    // Configura el puerto en el que se ejecutará el servidor
    const PORT = 4000;
  
    // Inicia el servidor Express
    app.listen({ port: PORT }, () =>
      console.log(`Servidor GraphQL listo en http://localhost:${PORT}${server.graphqlPath}`)
    );
  });
  
