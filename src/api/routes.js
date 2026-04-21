const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { dbRun, dbGet, dbAll, resetDatabase } = require('../db/database');

// Configuration Nodemailer (À configurer avec de vrais identifiants en prod)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'votre-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'votre-mot-de-passe'
  }
});

// Middleware pour vérifier l'authentification
const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ error: 'Non autorisé' });
  }
};

// ===== AUTHENTIFICATION =====

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await dbGet('SELECT * FROM users WHERE username = ?', [username]);
    if (user && await bcrypt.compare(password, user.password)) {
      req.session.userId = user.id;
      req.session.username = user.username;
      res.json({ success: true, username: user.username });
    } else {
      res.status(401).json({ error: 'Identifiants invalides' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

router.get('/check-auth', (req, res) => {
  if (req.session.userId) {
    res.json({ authenticated: true, username: req.session.username });
  } else {
    res.json({ authenticated: false });
  }
});

// ===== MESSAGES =====

// Envoyer un message (Public)
router.post('/messages', async (req, res) => {
  const { name, email, subject, content } = req.body;
  try {
    await dbRun(
      'INSERT INTO messages (name, email, subject, content) VALUES (?, ?, ?, ?)',
      [name, email, subject, content]
    );

    // Envoi de l'email
    const mailOptions = {
      from: email,
      to: 'gloirebeniche11@gmail.com',
      subject: `Nouveau message de ${name}: ${subject}`,
      text: `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${content}`
    };

    // Note: Cela échouera si les identifiants ne sont pas configurés, 
    // mais on continue pour que le message soit au moins en base.
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.error('Erreur envoi email:', error);
      else console.log('Email envoyé:', info.response);
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lister les messages (Admin)
router.get('/messages', isAuthenticated, async (req, res) => {
  try {
    const messages = await dbAll('SELECT * FROM messages ORDER BY created_at DESC');
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Supprimer un message (Admin)
router.delete('/messages/:id', isAuthenticated, async (req, res) => {
  try {
    await dbRun('DELETE FROM messages WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== SITE SETTINGS =====

router.get('/settings', async (req, res) => {
  try {
    const settings = await dbAll('SELECT key, value FROM site_settings');
    const settingsObj = {};
    settings.forEach(s => {
      settingsObj[s.key] = s.value;
    });
    res.json(settingsObj);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/settings/:key', isAuthenticated, async (req, res) => {
  const { key } = req.params;
  const { value } = req.body;
  try {
    await dbRun(
      'UPDATE site_settings SET value = ?, updated_at = CURRENT_TIMESTAMP WHERE key = ?',
      [value, key]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== SECTIONS =====

router.get('/sections', async (req, res) => {
  try {
    const sections = await dbAll('SELECT * FROM sections ORDER BY order_index');
    res.json(sections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/sections/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const { title, content, order_index } = req.body;
  try {
    await dbRun(
      'UPDATE sections SET title = ?, content = ?, order_index = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [title, content, order_index, id]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== CONTACT INFO =====

router.get('/contacts', async (req, res) => {
  try {
    const contacts = await dbAll('SELECT * FROM contact_info');
    const contactsObj = {};
    contacts.forEach(c => {
      contactsObj[c.type] = c.value;
    });
    res.json(contactsObj);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/contacts/:type', isAuthenticated, async (req, res) => {
  const { type } = req.params;
  const { value } = req.body;
  try {
    await dbRun(
      'UPDATE contact_info SET value = ?, updated_at = CURRENT_TIMESTAMP WHERE type = ?',
      [value, type]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== RESET =====

router.post('/reset', isAuthenticated, async (req, res) => {
  try {
    await resetDatabase();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
