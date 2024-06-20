const express = require('express');
const router = express.Router();
const Matiere = require('../models/Matiere');

// Créer une nouvelle matière
router.post('/', async (req, res) => {
    try {
        const matiere = new Matiere(req.body);
        await matiere.save();
        res.status(201).send(matiere);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Obtenir toutes les matières
router.get('/', async (req, res) => {
    try {
        const matieres = await Matiere.find().populate('idEnseignant');
        res.status(200).send(matieres);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Obtenir une matière par ID
router.get('/:id', async (req, res) => {
    try {
        const matiere = await Matiere.findById(req.params.id).populate('idEnseignant');
        if (!matiere) {
            return res.status(404).send();
        }
        res.status(200).send(matiere);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Mettre à jour une matière par ID
router.put('/:id', async (req, res) => {
    try {
        const matiere = await Matiere.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('idEnseignant');
        if (!matiere) {
            return res.status(404).send();
        }
        res.status(200).send(matiere);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Supprimer une matière par ID
router.delete('/:id', async (req, res) => {
    try {
        const matiere = await Matiere.findByIdAndDelete(req.params.id).populate('idEnseignant');
        if (!matiere) {
            return res.status(404).send();
        }
        res.status(200).send(matiere);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Mettre à jour une matière par ID
router.put('/:id', async (req, res) => {
    try {
        const matiere = await Matiere.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('idEnseignant');
        if (!matiere) {
            return res.status(404).send();
        }
        res.status(200).send(matiere);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
