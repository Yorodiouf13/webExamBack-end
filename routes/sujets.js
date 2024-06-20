const express = require('express');
const router = express.Router();
const Sujet = require('../models/Sujet');

// Créer un nouveau sujet
router.post('/', async (req, res) => {
    try {
        const sujet = new Sujet(req.body);
        await sujet.save();
        res.status(201).send(sujet);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Obtenir tous les sujets
router.get('/', async (req, res) => {
    try {
        const sujets = await Sujet.find().populate('idMatiere');
        res.status(200).send(sujets);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Obtenir un sujet par ID
router.get('/:id', async (req, res) => {
    try {
        const sujet = await Sujet.findById(req.params.id).populate('idMatiere');
        if (!sujet) {
            return res.status(404).send();
        }
        res.status(200).send(sujet);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Mettre à jour un sujet par ID
router.put('/:id', async (req, res) => {
    try {
        const sujet = await Sujet.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('idMatiere');
        if (!sujet) {
            return res.status(404).send();
        }
        res.status(200).send(sujet);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Supprimer un sujet par ID
router.delete('/:id', async (req, res) => {
    try {
        const sujet = await Sujet.findByIdAndDelete(req.params.id).populate('idMatiere');
        if (!sujet) {
            return res.status(404).send();
        }
        res.status(200).send(sujet);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
