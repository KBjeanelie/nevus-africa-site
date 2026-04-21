const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, '../../data/nevus.db');

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
  } else {
    console.log('Connecté à SQLite');
    initializeDatabase();
  }
});

function initializeDatabase() {
  // Table pour les paramètres du site (couleurs, etc.)
  db.run(`
    CREATE TABLE IF NOT EXISTS site_settings (
      id INTEGER PRIMARY KEY,
      key TEXT UNIQUE,
      value TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) console.error('Erreur création site_settings:', err);
  });

  // Table pour les sections de contenu
  db.run(`
    CREATE TABLE IF NOT EXISTS sections (
      id INTEGER PRIMARY KEY,
      name TEXT UNIQUE,
      title TEXT,
      content TEXT,
      order_index INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) console.error('Erreur création sections:', err);
  });

  // Table pour les messages de contact
  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      subject TEXT,
      content TEXT,
      is_read INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) console.error('Erreur création messages:', err);
  });

  // Table pour les utilisateurs admin
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) console.error('Erreur création users:', err);
    else {
      // Initialiser les paramètres par défaut après création des tables
      initializeDefaultData();
    }
  });
}

function initializeDefaultData() {
  const defaultSettings = {
    'primary_color': '#1a1a2e',
    'secondary_color': '#16213e',
    'accent_color': '#0f3460',
    'text_color': '#ffffff',
    'button_color': '#e94560',
    'button_hover_color': '#d63447'
  };

  const defaultSections = [
    { name: 'hero', title: 'ONG NEVUS AFRICA', content: 'Inclusion sociale, médicale et humaine des personnes vivant avec des naevus congénitaux géants', order_index: 1 },
    { name: 'about', title: 'À propos de nous', content: 'NEVUS AFRICA a été fondée pour promouvoir une approche unifiée de la recherche et des soins...', order_index: 2 },
    { name: 'missions', title: 'Nos Missions', content: 'Améliorer la qualité de vie, renforcer la visibilité...', order_index: 3 },
    { name: 'programs', title: 'Nos Programmes', content: 'Sensibilisation & Éducation, Accompagnement & Soutien...', order_index: 4 }
  ];

  const defaultContacts = [
    { type: 'email', value: 'contact@nevusafrica.org' },
    { type: 'phone', value: '+243 123 456 789' },
    { type: 'address', value: 'République du Congo' }
  ];

  // Ajouter les paramètres par défaut
  Object.entries(defaultSettings).forEach(([key, value]) => {
    db.run(`INSERT OR IGNORE INTO site_settings (key, value) VALUES (?, ?)`, [key, value], (err) => {
      if (err) console.error(`Erreur insertion ${key}:`, err);
    });
  });

  // Ajouter les sections par défaut
  defaultSections.forEach(section => {
    db.run(`INSERT OR IGNORE INTO sections (name, title, content, order_index) VALUES (?, ?, ?, ?)`,
      [section.name, section.title, section.content, section.order_index],
      (err) => {
        if (err) console.error(`Erreur insertion section ${section.name}:`, err);
      }
    );
  });

  // Ajouter les informations de contact par défaut
  defaultContacts.forEach(contact => {
    db.run(`INSERT OR IGNORE INTO contact_info (type, value) VALUES (?, ?)`,
      [contact.type, contact.value],
      (err) => {
        if (err) console.error(`Erreur insertion contact ${contact.type}:`, err);
      }
    );
  });

  // Ajouter l'utilisateur admin par défaut
  const bcrypt = require('bcrypt');
  const adminPassword = 'root@2020';
  bcrypt.hash(adminPassword, 10, (err, hash) => {
    if (!err) {
      db.run(`INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)`, ['admin', hash]);
    }
  });
}

function resetDatabase() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run('DELETE FROM site_settings');
      db.run('DELETE FROM sections');
      db.run('DELETE FROM contact_info');
      db.run('DELETE FROM messages');
      // On ne supprime pas l'utilisateur admin pour éviter de se bloquer
      initializeDefaultData();
      resolve();
    });
  });
}

// Promisify database methods for easier use
function dbRun(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}

function dbGet(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

function dbAll(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

module.exports = {
  db,
  dbRun,
  dbGet,
  dbAll,
  resetDatabase
};
