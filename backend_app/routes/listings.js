const express = require('express');
const router = express.Router();
const listingsController = require('../controllers/listingsController'); // Import du contrôleur

// Route GET /data (pour récupérer les listings)
router.get('/data', listingsController.getListings);

// Route POST /data (pour ajouter un nouveau listing)
router.post('/data', listingsController.addListing);

module.exports = router;