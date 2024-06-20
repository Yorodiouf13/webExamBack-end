const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); // Import mongoose
const Administrateur = require('../models/Administrateur');

// Créer un nouvel administrateur
router.post('/', async (req, res) => {
    console.log('Received POST request:', req.body);
    try {
        const session = await mongoose.startSession(); // Start a session
        session.startTransaction();

        const administrateur = new Administrateur(req.body);
        await administrateur.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).send(administrateur);
    } catch (error) {
        console.error('Error saving administrateur:', error);
        res.status(400).send(error);
    }
});

// Obtenir tous les administrateurs
router.get('/', async (req, res) => {
    console.log('Received GET request for all administrateurs');
    try {
        const administrateurs = await Administrateur.find().populate('idUtilisateur');
        res.status(200).send(administrateurs);
    } catch (error) {
        console.error('Error getting administrateurs:', error);
        res.status(500).send(error);
    }
});

// Obtenir un administrateur par ID
router.get('/:id', async (req, res) => {
    console.log('Received GET request for administrateur with ID:', req.params.id);
    try {
        const administrateur = await Administrateur.findById(req.params.id).populate('idUtilisateur');
        if (!administrateur) {
            return res.status(404).send();
        }
        res.status(200).send(administrateur);
    } catch (error) {
        console.error('Error getting administrateur by ID:', error);
        res.status(500).send(error);
    }
});

// Mettre à jour un administrateur par ID
router.put('/:id', async (req, res) => {
    console.log('Received PUT request for administrateur with ID:', req.params.id);
    try {
        const administrateur = await Administrateur.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('idUtilisateur');
        if (!administrateur) {
            return res.status(404).send();
        }
        res.status(200).send(administrateur);
    } catch (error) {
        console.error('Error updating administrateur:', error);
        res.status(400).send(error);
    }
});

// Supprimer un administrateur par ID
router.delete('/:id', async (req, res) => {
    console.log('Received DELETE request for administrateur with ID:', req.params.id);
    try {
        const administrateur = await Administrateur.findByIdAndDelete(req.params.id).populate('idUtilisateur');
        if (!administrateur) {
            return res.status(404).send();
        }
        res.status(200).send(administrateur);
    } catch (error) {
        console.error('Error deleting administrateur:', error);
        res.status(500).send(error);
    }
});

module.exports = router;
