const mongoose = require('mongoose');

const reponseSchema = new mongoose.Schema({
    idReponse: {
        type: Number,
        required: true,
        unique: true
    },
    contenu: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    idSujet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sujet',
        required: true
    },
    idEtudiant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Etudiant',
        required: true
    },
});

module.exports = mongoose.model('Reponse', reponseSchema);
