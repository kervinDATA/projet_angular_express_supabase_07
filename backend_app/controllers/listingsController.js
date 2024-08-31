const { supabase } = require('../config');  // Importer la configuration Supabase depuis config.js

// Fonction pour récupérer les listings
exports.getListings = async (req, res) => {
    try {
        const start = parseInt(req.query.start) || 0;
        const end = parseInt(req.query.end) || 99;
        const name = req.query.name || '';
        const neighbourhood = req.query.area || '';
        const roomType = req.query.room_type || '';
        const min_price = req.query.min_price ? parseFloat(req.query.min_price) : null;
        const max_price = req.query.max_price ? parseFloat(req.query.max_price) : null;

        let query = supabase
            .from('listings')
            .select('*')
            .range(start, end);

        if (name) {
            query = query.ilike('host_name', `%${name}%`);
        }

        if (neighbourhood) {
            query = query.eq('area', neighbourhood);
        }

        if (roomType) {
            query = query.eq('room_type', roomType);
        }

        if (min_price !== null) {
            query = query.gte('price', min_price);
        }

        if (max_price !== null) {
            query = query.lte('price', max_price);
        }

        const { data, error } = await query;

        if (error) {
            return res.status(500).json({ message: 'Erreur lors de la récupération des données', error });
        }

        if (data.length === 0) {
            return res.status(404).send('Aucune donnée trouvée.');
        }

        res.json(data);
    } catch (err) {
        res.status(500).json({ message: 'Erreur interne du serveur', error: err });
    }
};

// Fonction pour ajouter un nouveau listing
exports.addListing = async (req, res) => {
    const newListing = req.body;

    try {
        const { data: insertData, error: insertError } = await supabase
            .from('listings')
            .insert([newListing], { returning: 'representation' });

        if (insertError) {
            return res.status(500).json({ message: 'Erreur lors de l\'ajout du listing.', error: insertError });
        }

        if (insertData === null) {
            const { data: selectData, error: selectError } = await supabase
                .from('listings')
                .select('*')
                .eq('listing_id', newListing.listing_id);

            if (selectError) {
                return res.status(500).json({ message: 'Erreur lors de la récupération des données.', error: selectError });
            }

            res.status(201).json({ message: 'Listing ajouté avec succès', data: selectData });
        } else {
            res.status(201).json({ message: 'Listing ajouté avec succès', data: insertData });
        }
    } catch (err) {
        res.status(500).json({ message: 'Erreur interne du serveur', error: err });
    }
};