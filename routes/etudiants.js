const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Etudiant = require('../models/Etudiant');

// Créer un nouvel étudiant
router.post('/', async (req, res) => {
    try {
        const session = await mongoose.startSession();
        session.startTransaction();

        const etudiant = new Etudiant(req.body);
        await etudiant.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).send(etudiant);
    } catch (error) {
        console.error('Error saving etudiant:', error);
        res.status(400).send(error);
    }
});

// Obtenir tous les étudiants
router.get('/', async (req, res) => {
    try {
        const etudiants = await Etudiant.find().populate('idUtilisateur');
        res.status(200).send(etudiants);
    } catch (error) {
        console.error('Error getting etudiants:', error);
        res.status(500).send(error);
    }
});

// Obtenir un étudiant par ID
router.get('/:id', async (req, res) => {
    try {
        const etudiant = await Etudiant.findById(req.params.id).populate('idUtilisateur');
        if (!etudiant) {
            return res.status(404).send();
        }
        res.status(200).send(etudiant);
    } catch (error) {
        console.error('Error getting etudiant by ID:', error);
        res.status(500).send(error);
    }
});

// Mettre à jour un étudiant par ID
router.put('/:id', async (req, res) => {
    try {
        const etudiant = await Etudiant.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('idUtilisateur');
        if (!etudiant) {
            return res.status(404).send();
        }
        res.status(200).send(etudiant);
    } catch (error) {
        console.error('Error updating etudiant:', error);
        res.status(400).send(error);
    }
});

// Supprimer un étudiant par ID
router.delete('/:id', async (req, res) => {
    try {
        const etudiant = await Etudiant.findByIdAndDelete(req.params.id).populate('idUtilisateur');
        if (!etudiant) {
            return res.status(404).send();
        }
        res.status(200).send(etudiant);
    } catch (error) {
        console.error('Error deleting etudiant:', error);
        res.status(500).send(error);
    }
});

module.exports = router;
