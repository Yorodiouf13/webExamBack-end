const express = require('express');
const router = express.Router();
const Reponse = require('../models/Reponse');

// Créer une nouvelle réponse
router.post('/', async (req, res) => {
    try {
        const reponse = new Reponse(req.body);
        await reponse.save();
        res.status(201).send(reponse);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Obtenir toutes les réponses
router.get('/', async (req, res) => {
    try {
        const reponses = await Reponse.find().populate('idSujet').populate('idEtudiant');
        res.status(200).send(reponses);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Obtenir une réponse par ID
router.get('/:id', async (req, res) => {
    try {
        const reponse = await Reponse.findById(req.params.id).populate('idSujet').populate('idEtudiant');
        if (!reponse) {
            return res.status(404).send();
        }
        res.status(200).send(reponse);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Mettre à jour une réponse par ID
router.put('/:id', async (req, res) => {
    try {
        const reponse = await Reponse.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('idSujet').populate('idEtudiant');
        if (!reponse) {
            return res.status(404).send();
        }
        res.status(200).send(reponse);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Supprimer une réponse par ID
router.delete('/:id', async (req, res) => {
    try {
        const reponse = await Reponse.findByIdAndDelete(req.params.id).populate('idSujet').populate('idEtudiant');
        if (!reponse) {
            return res.status(404).send();
        }
        res.status(200).send(reponse);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
