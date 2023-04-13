const mongoose = require('mongoose')
const Movies = mongoose.model('Movies', {
    titulo: String,
    sinopse: String,
    duracao: String,
    dataLancamento: String,
    imagem: String,
    Categorias: String,
})
module.exports = Movies