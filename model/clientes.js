const mongoose = require('mongoose')
const cliente = new mongoose.Schema ({
    cedula: Number,
    nombre: String,
    dir: String,
    tel: Number
})
module.exports = mongoose.model("clientes", cliente)