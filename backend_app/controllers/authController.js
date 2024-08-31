const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { supabase } = require('../config');  // Assurez-vous que 'supabase' est bien exporté depuis config.js

// Configuration des variables d'environnement pour JWT
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

// Fonction pour l'inscription
const register = async (req, res) => {
  const { username, email, password, role } = req.body;

  // Validation des données
  if (!username || !email || !password || !role) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (role !== 'user' && role !== 'host') {
    return res.status(400).json({ error: 'Invalid role' });
  }

  try {
    // Hachage du mot de passe avec Argon2
    const hashedPassword = await argon2.hash(password);

    // Créer l'utilisateur avec Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });

    if (authError) {
      return res.status(400).json({ error: authError.message });
    }

    // Enregistrement de l'utilisateur dans la base de données
    const { data, error } = await supabase
      .from('users')
      .insert([{ username, email, password: hashedPassword, role, supabase_user_id: authData.user.id }]);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({ message: 'User registered successfully', user: data });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Fonction pour la connexion
const login = async (req, res) => {
  const { email, password } = req.body;

  // Vérification des champs requis
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Récupérer l'utilisateur depuis la base de données
    const { data: user, error } = await supabase
      .from('users')
      .select('id, username, password, role')
      .eq('email', email)
      .single();

    if (error || !user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Vérifier le mot de passe avec Argon2
    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Générer un JWT
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.status(200).json({ message: 'User logged in successfully', token, username: user.username }); // Inclure le nom d'utilisateur
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};


module.exports = { register, login };
