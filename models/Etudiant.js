const mongoose = require('mongoose');

const etudiantSchema = new mongoose.Schema({
    idEtudiant: {
        type: Number,
        required: true,
        unique: true
    },
    idUtilisateur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utilisateur',
        required: true
    },
    niveau: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Etudiant', etudiantSchema);
