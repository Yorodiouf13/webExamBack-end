const express = require('express');
const app = express();
const mongoose = require('mongoose');
const utilisateurRoutes = require('./routes/utilisateurs');
const administrateurRoutes = require('./routes/administrateurs');
const contientRoutes = require('./routes/contient');
const enseignantRoutes = require('./routes/enseignants');
const enseigneRoutes = require('./routes/enseigne'); 
const etudiantRoutes = require('./routes/etudiants');
const examenRoutes = require('./routes/examens');
const matiereRoutes = require('./routes/matieres');
const reponseRoutes = require('./routes/reponses');
const sujetRoutes = require('./routes/sujets');

mongoose.connect('mongodb+srv://idrissaba:babs111213@cluster0.aapqhhz.mongodb.net/', {
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));


app.use(express.json());

app.use('/utilisateurs', utilisateurRoutes);
app.use('/administrateurs', administrateurRoutes);
app.use('/contient', contientRoutes);
app.use('/enseignants', enseignantRoutes);
app.use('/enseigne', enseigneRoutes);
app.use('/etudiants', etudiantRoutes);
app.use('/examens', examenRoutes);
app.use('/matieres', matiereRoutes);
app.use('/reponses', reponseRoutes);
app.use('/sujets', sujetRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
});

module.exports = app;
