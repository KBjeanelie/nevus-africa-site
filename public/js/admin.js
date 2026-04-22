// Initialisation
document.addEventListener('DOMContentLoaded', () => {
  setupTabs();
  loadAll();
});

// Navigation par onglets
function setupTabs() {
  const btns = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.admin-section');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.section;
      
      btns.forEach(b => b.classList.remove('active'));
      sections.forEach(s => s.classList.remove('active'));

      btn.classList.add('active');
      document.getElementById(target).classList.add('active');
    });
  });
}

// Chargement général
async function loadAll() {
  await loadSettings();
  await loadSections();
  await loadMessages();
  await loadContacts();
}

// ===== PARAMÈTRES =====
async function loadSettings() {
  const settings = await fetch('/api/settings').then(r => r.json());
  const container = document.getElementById('settings-form');
  
  const fields = [
    { key: 'primary_color', label: 'Couleur Primaire' },
    { key: 'secondary_color', label: 'Couleur Secondaire' },
    { key: 'accent_color', label: 'Couleur Accent' },
    { key: 'text_color', label: 'Couleur Texte' }
  ];

  container.innerHTML = fields.map(f => `
    <div class="field">
      <label>${f.label}</label>
      <input type="color" id="${f.key}" value="${settings[f.key]}">
      <code>${settings[f.key]}</code>
    </div>
  `).join('');
}

async function saveSettings() {
  const inputs = document.querySelectorAll('#settings-form input');
  for (let input of inputs) {
    await fetch(`/api/settings/${input.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: input.value })
    });
  }
  showNotification('Paramètres enregistrés !');
}

// ===== SECTIONS =====
async function loadSections() {
  const sections = await fetch('/api/sections').then(r => r.json());
  const container = document.getElementById('sections-list');
  
  container.innerHTML = sections.map(s => `
    <div class="item-card">
      <h3>${s.title} (${s.name})</h3>
      <div class="field" style="margin-bottom: 1rem;">
        <label>Titre</label>
        <input type="text" id="title-${s.id}" value="${s.title}">
      </div>
      <div class="field">
        <label>Contenu</label>
        <textarea id="content-${s.id}" rows="4">${s.content}</textarea>
      </div>
      <button class="btn-primary" style="margin-top: 1rem;" onclick="saveSection(${s.id})">Mettre à jour</button>
    </div>
  `).join('');
}

async function saveSection(id) {
  const title = document.getElementById(`title-${id}`).value;
  const content = document.getElementById(`content-${id}`).value;

  const res = await fetch(`/api/sections/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content, order_index: 1 })
  });

  if (res.ok) showNotification('Section mise à jour !');
}

// ===== MESSAGES =====
async function loadMessages() {
  const messages = await fetch('/api/messages').then(r => r.json());
  const container = document.getElementById('messages-list');
  
  if (messages.length === 0) {
    container.innerHTML = '<p>Aucun message reçu pour le moment.</p>';
    return;
  }

  container.innerHTML = messages.map(m => `
    <div class="item-card">
      <div style="display: flex; justify-content: space-between; align-items: flex-start;">
        <div>
          <h3 style="margin: 0;">${m.name}</h3>
          <p style="margin: 0;">${m.email} • ${new Date(m.created_at).toLocaleDateString()}</p>
        </div>
        <button class="btn-danger" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;" onclick="deleteMessage(${m.id})">Supprimer</button>
      </div>
      <div style="margin-top: 1rem; padding: 1rem; background: #f8f9fa; border-radius: 8px;">
        <strong>Sujet: ${m.subject}</strong>
        <p style="margin-top: 0.5rem; color: var(--text);">${m.content}</p>
      </div>
    </div>
  `).join('');
}

async function deleteMessage(id) {
  if (confirm('Supprimer ce message ?')) {
    await fetch(`/api/messages/${id}`, { method: 'DELETE' });
    loadMessages();
    showNotification('Message supprimé');
  }
}

// ===== CONTACTS =====
async function loadContacts() {
  const contacts = await fetch('/api/contacts').then(r => r.json());
  const container = document.getElementById('contacts-list');
  
  // Si vide, on met des valeurs par défaut pour permettre la création
  const data = (Object.keys(contacts).length > 0) ? contacts : {
    email: '',
    phone: '',
    address: ''
  };

  container.innerHTML = Object.entries(data).map(([type, value]) => `
    <div class="field" style="margin-bottom: 1.5rem;">
      <label style="text-transform: capitalize;">${type}</label>
      <div style="display: flex; gap: 1rem;">
        <input type="text" id="contact-${type}" value="${value}" style="flex-grow: 1;">
        <button class="btn-primary" style="padding: 0.5rem 1rem;" onclick="saveContact('${type}')">Sauver</button>
      </div>
    </div>
  `).join('');
}

async function saveContact(type) {
  const value = document.getElementById(`contact-${type}`).value;
  await fetch(`/api/contacts/${type}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ value })
  });
  showNotification('Contact mis à jour !');
}

// ===== RESET & LOGOUT =====
async function confirmReset() {
  const code = prompt('Veuillez taper "REINITIALISER" pour confirmer la suppression de toutes les données.');
  if (code === 'REINITIALISER') {
    const res = await fetch('/api/reset', { method: 'POST' });
    if (res.ok) {
      showNotification('Site réinitialisé !');
      loadAll();
    }
  }
}

async function logout() {
  await fetch('/api/logout');
  window.location.href = '/login';
}

function showNotification(text, isError = false) {
  const n = document.getElementById('notification');
  n.textContent = text;
  n.style.display = 'block';
  n.className = 'notification' + (isError ? ' error' : '');
  setTimeout(() => n.style.display = 'none', 3000);
}
