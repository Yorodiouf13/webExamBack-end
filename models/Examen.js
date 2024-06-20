const { text } = require('body-parser');    
const mongoose = require('mongoose');

const examenSchema = new mongoose.Schema({
    idExamen: {
        type: Number,
        required: true,
        unique: true
    },
    dateDebut: {
        type: Date,
        default: Date.now
    },
    dateFin: {
        type: Date,
        default: Date.now
    },
    titre: {
        type: String,
        required: true
    },
    idMatiere: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Matiere',
        required: true
    }
});

module.exports = mongoose.model('Examen', examenSchema);