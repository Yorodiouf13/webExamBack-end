const express = require('express');
const router = express.Router();
const Examen = require('../models/Examen');

// Créer un nouvel examen
router.post('/', async (req, res) => {
    try {
        const examen = new Examen(req.body);
        await examen.save();
        res.status(201).send(examen);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Obtenir tous les examens
router.get('/', async (req, res) => {
    try {
        const examens = await Examen.find().populate('idMatiere');
        res.status(200).send(examens);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Obtenir un examen par ID
router.get('/:id', async (req, res) => {
    try {
        const examen = await Examen.findById(req.params.id).populate('idMatiere');
        if (!examen) {
            return res.status(404).send();
        }
        res.status(200).send(examen);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Mettre à jour un examen par ID
router.put('/:id', async (req, res) => {
    try {
        const examen = await Examen.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('idMatiere');
        if (!examen) {
            return res.status(404).send();
        }
        res.status(200).send(examen);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Supprimer un examen par ID
router.delete('/:id', async (req, res) => {
    try {
        const examen = await Examen.findByIdAndDelete(req.params.id).populate('idMatiere');
        if (!examen) {
            return res.status(404).send();
        }
        res.status(200).send(examen);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
