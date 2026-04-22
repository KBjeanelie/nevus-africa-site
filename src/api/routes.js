const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const db = require('../db/supabase');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const isAuthenticated = (req, res, next) => {
  if (req.session.userId) next();
  else res.status(401).json({ error: 'Non autorisé' });
};

// AUTH
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await db.getUser(username);
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
  res.json({ authenticated: !!req.session.userId, username: req.session.username });
});

// SETTINGS
router.get('/settings', async (req, res) => {
  try {
    const settings = await db.getSettings();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/settings/:key', isAuthenticated, async (req, res) => {
  try {
    await db.updateSetting(req.params.key, req.body.value);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// SECTIONS
router.get('/sections', async (req, res) => {
  try {
    const sections = await db.getSections();
    res.json(sections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/sections/:id', isAuthenticated, async (req, res) => {
  try {
    await db.updateSection(req.params.id, req.body);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// MESSAGES
router.post('/messages', async (req, res) => {
  try {
    await db.saveMessage(req.body);
    
    // Email alert
    const mailOptions = {
      from: req.body.email,
      to: 'gloirebeniche11@gmail.com',
      subject: `Nouveau message: ${req.body.subject}`,
      text: `Nom: ${req.body.name}\nEmail: ${req.body.email}\n\nMessage:\n${req.body.content}`
    };

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      transporter.sendMail(mailOptions).catch(e => console.error('Email error:', e));
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/messages', isAuthenticated, async (req, res) => {
  try {
    const messages = await db.getMessages();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/messages/:id', isAuthenticated, async (req, res) => {
  try {
    await db.deleteMessage(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CONTACTS
router.get('/contacts', async (req, res) => {
  try {
    const contacts = await db.getContacts();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/contacts/:type', isAuthenticated, async (req, res) => {
  try {
    await db.updateContact(req.params.type, req.body.value);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// RESET
router.post('/reset', isAuthenticated, async (req, res) => {
  try {
    await db.reset();
    res.json({ success: true, message: 'Reset trigger (requires manual Supabase cleanup for full reset)' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
