const mongoose = require('mongoose');

const utilisateurSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    identifiant: {
        type: String,
        required: true,
        unique: true
    },
    motDePasse: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["administrateur", "enseignant", "étudiant"],
        required: true
    }
});

module.exports = mongoose.model('Utilisateur', utilisateurSchema);
