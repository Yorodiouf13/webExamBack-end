const mongoose = require('mongoose');

const sujetSchema = new mongoose.Schema({
    idSujet: {
        type: Number,
        required: true,
        unique: true
    },
    titre: {
        type: String,
        required: true
    },
    typeQuestion: {
        type: String,
        enum: ["à choix multiples", "vrai/faux", "réponse courte"],
        required: true
    },
    point: {
        type: Number,
        required: true
    },
    idMatiere: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Matiere',
        required: true
    },
    idEnseignant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enseignant',
        required: true
    }
});

module.exports = mongoose.model('Sujet', sujetSchema);
