const Cliente = require('../model/clientes')
const Alimento = require('../model/alimento')
const Porcino = require('../model/porcino')

const resolvers = {
    Query: {
      Clientes: async () => {
        const users = await Cliente.find();
        console.log(users)
        return users;
      },
      Alimentos: async () => {
        const alimentos = await Alimento.find();
        console.log(alimentos)
        return alimentos;
      },  Porcinos: async () => {
        const porcinos = await Porcino.find();
        console.log(porcinos)
        return porcinos;
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
      }, 
      createAlimento: async (_, { codigo, nombre, dosis }) => {
        const newAlimento = new Alimento({ codigo, nombre, dosis });
        await newAlimento.save();
        return newAlimento;
    },
      deleteAlimentoByCodigo: async (_,{ codigo }) => {
        const deletedAlimento = await Alimento.findOneAndDelete({ codigo });
        console.log("Alimento eliminado",deletedAlimento)
        return deletedAlimento;
    },
      updateAlimentoByCodigo: async (_, { codigo, nombre, dosis }) => {
        const updatedAlimento = await Alimento.findOneAndUpdate({ codigo }, { nombre, dosis }, { new: true });
        console.log("Alimento actualizado:",updatedAlimento)
        return updatedAlimento;
      }, 
      createPorcino: async (_, { id_por, raza_por, edad_por, peso_por, alim_por, cli_por}) => {
        const newPorcino = new Porcino({ id_por, raza_por, edad_por, peso_por, alim_por, cli_por });
        await newPorcino.save();
        return newPorcino;
    },
      deletePorcinoById: async (_,{ id_por }) => {
        const deletedPorcino = await Porcino.findOneAndDelete({ id_por });
        console.log("Porcino eliminado",deletedPorcino)
        return deletedPorcino;
    },
    updatePorcinoById: async (_, { id_por, raza_por, edad_por, peso_por, alim_por, cli_por}) => {
        const updatedPorcino = await Porcino.findOneAndUpdate({ id_por }, {raza_por, edad_por, peso_por, alim_por, cli_por }, { new: true });
        console.log("Porcino actualizado:",updatedPorcino)
        return updatedPorcino;
      },
    
        }
  };

  module.exports = resolvers;