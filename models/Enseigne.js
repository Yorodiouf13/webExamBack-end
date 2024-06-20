const mongoose = require('mongoose');

const enseigneSchema = new mongoose.Schema({
    idEnseignant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enseignant',
        required: true
    },
    idMatiere: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Matiere',
        required: true
    }
});

module.exports = mongoose.model('Enseigne', enseigneSchema);
