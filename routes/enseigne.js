const express = require('express');
const router = express.Router();
const Enseigne = require('../models/Enseigne');

// Créer une nouvelle relation "enseigne"
router.post('/', async (req, res) => {
    try {
        const enseigne = new Enseigne(req.body);
        await enseigne.save();
        res.status(201).send(enseigne);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Obtenir toutes les relations "enseigne"
router.get('/', async (req, res) => {
    try {
        const enseignes = await Enseigne.find().populate('idEnseignant').populate('idMatiere');
        res.status(200).send(enseignes);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Obtenir une relation "enseigne" par ID
router.get('/:id', async (req, res) => {
    try {
        const enseigne = await Enseigne.findById(req.params.id).populate('idEnseignant').populate('idMatiere');
        if (!enseigne) {
            return res.status(404).send();
        }
        res.status(200).send(enseigne);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Mettre à jour une relation "enseigne" par ID
router.put('/:id', async (req, res) => {
    try {
        const enseigne = await Enseigne.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('idEnseignant').populate('idMatiere');
        if (!enseigne) {
            return res.status(404).send();
        }
        res.status(200).send(enseigne);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Supprimer une relation "enseigne" par ID
router.delete('/:id', async (req, res) => {
    try {
        const enseigne = await Enseigne.findByIdAndDelete(req.params.id).populate('idEnseignant').populate('idMatiere');
        if (!enseigne) {
            return res.status(404).send();
        }
        res.status(200).send(enseigne);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
