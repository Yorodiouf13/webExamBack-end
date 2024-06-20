const express = require('express');
const router = express.Router();
const Contient = require('../models/contient');

// Créer une nouvelle relation "contient"
router.post('/', async (req, res) => {
    try {
        const contient = new Contient(req.body);
        await contient.save();
        res.status(201).send(contient);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Obtenir toutes les relations "contient"
router.get('/', async (req, res) => {
    try {
        const contient = await Contient.find().populate('idSujet').populate('idMatiere');
        res.status(200).send(contient);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Obtenir une relation "contient" par ID
router.get('/:id', async (req, res) => {
    try {
        const contient = await Contient.findById(req.params.id).populate('idSujet').populate('idMatiere');
        if (!contient) {
            return res.status(404).send();
        }
        res.status(200).send(contient);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Mettre à jour une relation "contient" par ID
router.put('/:id', async (req, res) => {
    try {
        const contient = await Contient.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('idSujet').populate('idMatiere');
        if (!contient) {
            return res.status(404).send();
        }
        res.status(200).send(contient);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Supprimer une relation "contient" par ID
router.delete('/:id', async (req, res) => {
    try {
        const contient = await Contient.findByIdAndDelete(req.params.id).populate('idSujet').populate('idMatiere');
        if (!contient) {
            return res.status(404).send();
        }
        res.status(200).send(contient);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
