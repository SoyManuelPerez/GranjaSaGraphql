const mongoose = require('mongoose')
const porcino = new mongoose.Schema ({
    id_por: Number,
    raza_por: String,
    edad_por: Number,
    peso_por: Number,
    alim_por: Number,
    cli_por: Number
})

module.exports = mongoose.model("porcinos", porcino)