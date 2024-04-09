const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');
// Conexión a la base de datos MongoDB
mongoose.connect('mongodb://localhost/granjaSA' , { useNewUrlParser: true, useUnifiedTopology: true })
.then(db => console.log('Conectado a la BD '))
.catch( err => console.log(err));
// Define tu esquema de GraphQL
const typeDefs = gql`
  type Cliente {
    id: ID!
    cedula: Int,
    nombre: String,
    dir: String,
    tel: Int
  }

  type Query {
    Clientes: [Cliente]
  }
  type Mutation {
    createCliente(cedula: Int!, nombre: String!, dir: String!, tel: Int!): Cliente
    deleteClienteByCedula(cedula: Int!): Cliente
    updateClienteByCedula(cedula: Int!, nombre: String, dir: String, tel: Int): Cliente
  }
`;
// Define tus resolvers
const resolvers = {
  Query: {
    Clientes: async () => {
      const users = await Cliente.find();
      console.log(users)
      return users;
    }
  },
  Mutation: {
    createCliente: async (_, { cedula, nombre, dir, tel }) => {
      const newCliente = new Cliente({ cedula, nombre, dir, tel });
      await newCliente.save();
      return newCliente;
    },
    deleteClienteByCedula: async (_,{ cedula }) => {
      const deletedCliente = await Cliente.findOneAndDelete({ cedula });
      console.log("Cliente eliminado",deletedCliente)
      return deletedCliente;
    },
    updateClienteByCedula: async (_, { cedula, nombre, dir, tel }) => {
      const updatedCliente = await Cliente.findOneAndUpdate({ cedula }, { nombre, dir, tel }, { new: true });
      console.log("Cliente actualizado:",updatedCliente)
      return updatedCliente;
    }
  }
};
// Define tu modelo de datos con Mongoose
const Cliente = require('./model/clientes.js')
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
  
