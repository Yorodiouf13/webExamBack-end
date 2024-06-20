const express = require('express');
const router = express.Router();
const Enseignant = require('../models/Enseignant');
const Utilisateur = require('../models/Utilisateur');
const mongoose = require('mongoose');

// Créer un nouvel enseignant
router.post('/', async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Vérifiez si l'utilisateur existe et est un enseignant
        const utilisateur = await Utilisateur.findById(req.body.idUtilisateur).session(session);
        if (!utilisateur || utilisateur.role !== 'enseignant') {
            throw new Error('Utilisateur invalide ou non enseignant');
        }

        const enseignant = new Enseignant(req.body);
        await enseignant.save({ session });

        await session.commitTransaction();
        res.status(201).send(enseignant);
    } catch (error) {
        await session.abortTransaction();
        res.status(400).send({ error: error.message });
    } finally {
        session.endSession();
    }
});

// Obtenir tous les enseignants
router.get('/', async (req, res) => {
    try {
        const enseignants = await Enseignant.find().populate('idUtilisateur');
        res.status(200).send(enseignants);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Obtenir un enseignant par ID
router.get('/:id', async (req, res) => {
    try {
        const enseignant = await Enseignant.findById(req.params.id).populate('idUtilisateur');
        if (!enseignant) {
            return res.status(404).send({ error: 'Enseignant non trouvé' });
        }
        res.status(200).send(enseignant);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Mettre à jour un enseignant par ID
router.put('/:id', async (req, res) => {
    try {
        const enseignant = await Enseignant.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('idUtilisateur');
        if (!enseignant) {
            return res.status(404).send({ error: 'Enseignant non trouvé' });
        }
        res.status(200).send(enseignant);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Supprimer un enseignant par ID
router.delete('/:id', async (req, res) => {
    try {
        const enseignant = await Enseignant.findByIdAndDelete(req.params.id).populate('idUtilisateur');
        if (!enseignant) {
            return res.status(404).send({ error: 'Enseignant non trouvé' });
        }
        res.status(200).send(enseignant);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
