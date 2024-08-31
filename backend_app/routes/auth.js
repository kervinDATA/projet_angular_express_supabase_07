const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Route pour l'inscription
router.post('/register', register);

// Route pour la connexion
router.post('/login', login);

module.exports = router;
