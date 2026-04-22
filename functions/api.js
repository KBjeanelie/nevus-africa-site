const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

const apiRoutes = require('../src/api/routes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'nevus-africa-secret',
  resave: true,
  saveUninitialized: false,
  cookie: { 
    secure: true,
    sameSite: 'none', // Nécessaire pour les domaines Netlify
    maxAge: 24 * 60 * 60 * 1000 // 24 heures
  },
  proxy: true // Nécessaire derrière le reverse proxy de Netlify
}));

// API Routes
app.use('/.netlify/functions/api', apiRoutes);
app.use('/api', apiRoutes);

// Gestion d'erreur globale pour éviter le crash 502
app.use((err, req, res, next) => {
  console.error('🔥 Erreur Backend:', err.stack);
  res.status(500).json({ 
    error: 'Erreur Interne du Serveur',
    message: err.message 
  });
});

// Export handler for Netlify
module.exports.handler = serverless(app);
