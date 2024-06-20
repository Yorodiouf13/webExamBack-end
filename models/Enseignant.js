const mongoose = require('mongoose');

const enseignantSchema = new mongoose.Schema({
    idEnseignant: {
        type: Number,
        required: true,
        unique: true
    },
     idUtilisateur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utilisateur',
        required: true
    },
});

module.exports = mongoose.model('Enseignant', enseignantSchema);
