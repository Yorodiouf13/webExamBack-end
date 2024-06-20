const mongoose = require('mongoose');

const matiereSchema = new mongoose.Schema({
    idMatiere: {
        type: Number,
        required: true,
        unique: true
    },
    nom: {
        type: String,
        required: true
    },
    idEnseignant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enseignant',
        required: true
    }
});

module.exports = mongoose.model('Matiere', matiereSchema);
