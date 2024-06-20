const mongoose = require('mongoose');

const administrateurSchema = new mongoose.Schema({
    idAdministrateur: {
        type: Number,
        required: true,
        unique: true
    },
     idUtilisateur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utilisateur',
        required: true
    },
})

module.exports = mongoose.model('Administrateur', administrateurSchema);