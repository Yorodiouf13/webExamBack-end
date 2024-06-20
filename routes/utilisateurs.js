const express = require('express');
const router = express.Router();
const Utilisateur = require('../models/Utilisateur');

// Créer un utilisateur
router.post('/', async (req, res) => {
    try {
        const utilisateur = new Utilisateur(req.body);
        await utilisateur.save();
        res.status(201).send(utilisateur);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Obtenir tous les utilisateurs
router.get('/', async (req, res) => {
    try {
        const utilisateurs = await Utilisateur.find();
        res.status(200).send(utilisateurs);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Obtenir un utilisateur par ID
router.get('/:id', async (req, res) => {
    try {
        const utilisateur = await Utilisateur.findById(req.params.id);
        if (!utilisateur) {
            return res.status(404).send();
        }
        res.status(200).send(utilisateur);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Mettre à jour un utilisateur par ID
router.put('/:id', async (req, res) => {
    try {
        const utilisateur = await Utilisateur.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!utilisateur) {
            return res.status(404).send();
        }
        res.status(200).send(utilisateur);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Supprimer un utilisateur par ID
router.delete('/:id', async (req, res) => {
    try {
        const utilisateur = await Utilisateur.findByIdAndDelete(req.params.id);
        if (!utilisateur) {
            return res.status(404).send();
        }
        res.status(200).send(utilisateur);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
