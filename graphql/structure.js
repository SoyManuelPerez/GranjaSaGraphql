const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Cliente {
    id: ID!
    cedula: Int,
    nombre: String,
    dir: String,
    tel: Int
  }
  type Alimento{
    id: ID!
    codigo: Int,
    Nombre: String,
    Dosis: String,
  }
  type Porcino{
    id: ID!
    id_por: Int,
    raza_por: String,
    edad_por: Int,
    peso_por: Int,
    alim_por: Int,
    cli_por: Int,
    cliente: Cliente,  
    alimento: Alimento,
  }

  type Query {
    Clientes: [Cliente]
    Alimentos: [Alimento]
    Porcinos:[Porcino]
  }
  type Mutation {
    createCliente(cedula: Int!, nombre: String!, dir: String!, tel: Int!): Cliente
    deleteClienteByCedula(cedula: Int!): Cliente
    updateClienteByCedula(cedula: Int!, nombre: String!, dir: String!, tel: Int!): Cliente
    createAlimento(codigo: Int!, Nombre: String!, Dosis: String!): Alimento
    deleteAlimentoByCodigo(codigo: Int!): Alimento
    updateAlimentoByCodigo(codigo: Int!, Nombre: String!, Dosis: String!): Alimento
    createPorcino(id_por: Int!, raza_por: String!, edad_por: Int!, peso_por: Int!, alim_por: Int!, cli_por: Int!): Porcino
    deletePorcinoById(id_por: Int!): Porcino
    updatePorcinoById(id_por: Int!, raza_por: String!, edad_por: Int!, peso_por: Int!, alim_por: Int!, cli_por: Int!): Porcino
  }
`;

module.exports = typeDefs;