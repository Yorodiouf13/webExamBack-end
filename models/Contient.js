const mongoose = require('mongoose');

const contientSchema = new mongoose.Schema({
    idSujet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sujet',
        required: true
    },
    idMatiere: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Matiere',
        required: true
    }
});

module.exports = mongoose.model('Contient', contientSchema);
