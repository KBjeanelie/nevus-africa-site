const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, '../data/nevus.db');
const db = new sqlite3.Database(DB_PATH);

const updates = [
  // Settings
  { table: 'site_settings', key: 'primary_color', value: '#1A2B3C' },
  { table: 'site_settings', key: 'secondary_color', value: '#2C3E50' },
  { table: 'site_settings', key: 'accent_color', value: '#D35400' },
  { table: 'site_settings', key: 'text_color', value: '#2C3E50' },
  { table: 'site_settings', key: 'button_color', value: '#D35400' },
  { table: 'site_settings', key: 'button_hover_color', value: '#A04000' },
  
  // Sections
  { table: 'sections', name: 'hero', title: 'Inclusion & Excellence Médicale', content: 'Inclusion sociale, médicale et humaine des personnes vivant avec des naevus congénitaux géants en Afrique.' },
  { table: 'sections', name: 'about', title: 'Notre Combat', content: 'Fondée par Mardochée NGATSE, porteur de NCG, NEVUS AFRICA œuvre pour briser l\'isolement des familles et promouvoir une approche unifiée de la recherche et des soins.' }
];

db.serialize(() => {
  updates.forEach(u => {
    if (u.table === 'site_settings') {
      db.run('UPDATE site_settings SET value = ? WHERE key = ?', [u.value, u.key]);
    } else if (u.table === 'sections') {
      db.run('UPDATE sections SET title = ?, content = ? WHERE name = ?', [u.title, u.content, u.name]);
    }
  });
  
  // Update contact info with real data from docx if possible
  db.run('UPDATE contact_info SET value = ? WHERE type = ?', ['+242 06 650 52 90', 'phone']);
  db.run('UPDATE contact_info SET value = ? WHERE type = ?', ['Pointe-Noire, République du Congo', 'address']);
});

db.close((err) => {
  if (err) console.error(err);
  else console.log('Database updated successfully');
});
