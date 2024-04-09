const mongoose = require('mongoose')
const aliemnto = new mongoose.Schema ({
    codigo: Number,
    Nombre: String,
    Dosis: String,
})


module.exports = mongoose.model("alimetos", aliemnto)