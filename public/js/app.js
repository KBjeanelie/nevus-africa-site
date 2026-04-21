// Charger les paramètres du site et rendre les couleurs
async function loadSiteSettings() {
  try {
    const settings = await fetch('/api/settings').then(r => r.json());

    // Appliquer les couleurs CSS
    document.documentElement.style.setProperty('--primary-color', settings.primary_color);
    document.documentElement.style.setProperty('--secondary-color', settings.secondary_color);
    document.documentElement.style.setProperty('--accent-color', settings.accent_color);
    document.documentElement.style.setProperty('--text-color', settings.text_color);
  } catch (error) {
    console.error('Erreur lors du chargement des paramètres:', error);
  }
}

// Charger et afficher les sections
async function loadSections() {
  try {
    const sections = await fetch('/api/sections').then(r => r.json());

    sections.forEach(section => {
      const sectionElement = document.getElementById(`${section.name}-section`);
      if (sectionElement) {
        if (section.name === 'hero') {
          sectionElement.innerHTML = `
            <div class="container">
              <h1>${section.title}</h1>
              <p>${section.content}</p>
              <div style="animation: fadeInUp 1s ease 0.4s both;">
                <a href="#contact-section" class="btn" style="background: var(--accent-color); color: white; padding: 1rem 2.5rem; border-radius: 50px; text-decoration: none; font-weight: 700; transition: all 0.3s;">Nous Soutenir</a>
              </div>
            </div>
          `;
        } else if (section.name === 'about') {
          sectionElement.innerHTML = `
            <div class="container">
              <div class="about-grid">
                <div class="about-content">
                  <h2 style="text-align: left; margin-bottom: 2rem; font-size: 3rem; line-height: 1.2;">
                    ${section.title.replace(' ', '<br>')}
                  </h2>
                  <p style="font-size: 1.2rem; margin-bottom: 3rem; color: var(--text-light); max-width: 500px;">
                    ${section.content}
                  </p>
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; border-top: 1px solid rgba(0,0,0,0.05); pt: 2rem;">
                    <div>
                      <h4 style="color: var(--accent-color); font-size: 2rem; margin-bottom: 0.5rem;">100+</h4>
                      <p style="font-weight: 600; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 1px;">Familles aidées</p>
                    </div>
                    <div>
                      <h4 style="color: var(--accent-color); font-size: 2rem; margin-bottom: 0.5rem;">10+</h4>
                      <p style="font-weight: 600; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 1px;">Experts partenaires</p>
                    </div>
                  </div>
                </div>
                <div class="about-image-wrapper" style="position: relative;">
                  <div class="about-image"></div>
                </div>
              </div>
            </div>
          `;
        } else if (section.name === 'missions') {
          renderMissions(section);
        } else if (section.name === 'programs') {
          renderPrograms(section);
        }
      }
    });
  } catch (error) {
    console.error('Erreur lors du chargement des sections:', error);
  }
}

// Afficher les missions
function renderMissions(section) {
  const missionsData = [
    { title: "Amélioration de Vie", desc: "Améliorer le quotidien des porteurs de NCG et de mélanocytose neurocutanée." },
    { title: "Visibilité & Sensibilisation", desc: "Renforcer la visibilité de cette pathologie rare auprès du public et des institutions." },
    { title: "Accès à l'Information", desc: "Faciliter l'accès à une information médicale fiable et accessible." },
    { title: "Solidarité Active", desc: "Organiser des espaces d'échange pour briser l'isolement des familles." },
    { title: "Recherche Médicale", desc: "Encourager la recherche scientifique autour du naevus congénital." },
    { title: "Inclusion Sociale", desc: "Lutter contre la stigmatisation et favoriser l'autonomie des patients." }
  ];

  const missionsSection = document.getElementById('missions-section');
  missionsSection.innerHTML = `
    <div class="container">
      <h2>${section.title}</h2>
      <div class="missions-grid">
        ${missionsData.map((mission, index) => `
          <div class="mission-card" style="animation: fadeInUp 0.8s ease ${index * 0.1}s both;">
            <div style="background: rgba(211, 84, 0, 0.1); width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; border-radius: 12px; margin-bottom: 1.5rem; color: var(--accent-color); font-weight: 700;">${index + 1}</div>
            <h3>${mission.title}</h3>
            <p>${mission.desc}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// Afficher les programmes
function renderPrograms(section) {
  const programsData = [
    {
      title: "Sensibilisation & Éducation",
      items: ["Campagnes écoles & médias", "Supports pédagogiques", "Conférences"],
      icon: "📢"
    },
    {
      title: "Soutien Psychosocial",
      items: ["Groupes de parole", "Accompagnement individuel", "Rencontres annuelles"],
      icon: "🤝"
    },
    {
      title: "Recherche & Innovation",
      items: ["Partenariats centres de recherche", "Comité médico-scientifique"],
      icon: "🔬"
    },
    {
      title: "Plaidoyer & Inclusion",
      items: ["Actions institutionnelles", "Soutien à l'insertion pro"],
      icon: "⚖️"
    }
  ];

  const programsSection = document.getElementById('programs-section');
  programsSection.innerHTML = `
    <div class="container">
      <div style="text-align: center; margin-bottom: 4rem;">
        <h2>${section.title}</h2>
        <p style="max-width: 600px; margin: 0 auto;">Des programmes structurés pour un impact durable sur la vie des patients.</p>
      </div>
      <div class="programs-grid">
        ${programsData.map(program => `
          <div class="program-card">
            <div class="program-info">
              <div style="font-size: 2rem; margin-bottom: 1rem;">${program.icon}</div>
              <h3>${program.title}</h3>
              <ul style="list-style: none; padding: 0;">
                ${program.items.map(item => `
                  <li style="margin-bottom: 0.8rem; display: flex; align-items: center;">
                    <span style="color: var(--accent-color); margin-right: 0.8rem;">✓</span>
                    ${item}
                  </li>
                `).join('')}
              </ul>
            </div>
          </div>
        `).join('')}
      </div>
      <div style="margin-top: 5rem; width: 100%; height: 350px; background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/images/programs_img.png') center/cover; border-radius: 30px; display: flex; align-items: center; justify-content: center; color: white; text-align: center; padding: 2rem;">
        <div>
          <h3 style="color: white; font-size: 2rem; margin-bottom: 1rem;">Un engagement communautaire fort</h3>
          <p style="max-width: 600px; margin: 0 auto;">Nous croyons en la force du collectif pour changer les regards et les vies.</p>
        </div>
      </div>
    </div>
  `;
}

// Charger et afficher les informations de contact
async function loadContactInfo() {
  try {
    const contacts = await fetch('/api/contacts').then(r => r.json());

    const contactSection = document.getElementById('contact-section');
    contactSection.innerHTML = `
      <div class="container">
        <h2>Nous Contacter</h2>
        <div class="contact-grid">
          <div class="contact-info">
            <div class="contact-item">
              <h4>📧 Email</h4>
              <p><a href="mailto:${contacts.email}" style="color: inherit; text-decoration: none;">${contacts.email}</a></p>
            </div>
            <div class="contact-item">
              <h4>📞 Téléphone</h4>
              <p><a href="tel:${contacts.phone}" style="color: inherit; text-decoration: none;">${contacts.phone}</a></p>
            </div>
            <div class="contact-item">
              <h4>📍 Adresse</h4>
              <p>${contacts.address}</p>
            </div>
            <div style="margin-top: 3rem;">
              <h4 style="margin-bottom: 1rem;">Suivez-nous</h4>
              <div style="display: flex; gap: 1rem;">
                <div style="width: 40px; height: 40px; background: var(--primary-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; cursor: pointer;">F</div>
                <div style="width: 40px; height: 40px; background: var(--primary-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; cursor: pointer;">L</div>
                <div style="width: 40px; height: 40px; background: var(--primary-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; cursor: pointer;">I</div>
              </div>
            </div>
          </div>
          <div class="contact-form">
            <form id="contact-form">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <input type="text" placeholder="Votre nom" required>
                <input type="email" placeholder="Votre email" required>
              </div>
              <input type="text" placeholder="Sujet" required>
              <textarea placeholder="Votre message" rows="5" required></textarea>
              <button type="submit" class="btn">Envoyer le message</button>
            </form>
          </div>
        </div>
      </div>
    `;

    // Ajout du gestionnaire de formulaire après l'injection
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button');
      btn.textContent = 'Envoi...';
      btn.disabled = true;

      const formData = {
        name: contactForm.querySelector('input[placeholder="Votre nom"]').value,
        email: contactForm.querySelector('input[placeholder="Votre email"]').value,
        subject: contactForm.querySelector('input[placeholder="Sujet"]').value,
        content: contactForm.querySelector('textarea').value
      };

      try {
        const response = await fetch('/api/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          alert('Merci ! Votre message a été envoyé à l\'équipe NEVUS AFRICA.');
          contactForm.reset();
        } else {
          alert('Erreur lors de l\'envoi.');
        }
      } catch (err) {
        alert('Impossible de contacter le serveur.');
      } finally {
        btn.textContent = 'Envoyer le message';
        btn.disabled = false;
      }
    });
  } catch (error) {
    console.error('Erreur lors du chargement des contacts:', error);
  }
}

// Rendre la navbar
async function renderNavbar() {
  const navbar = document.getElementById('navbar');
  navbar.innerHTML = `
    <div class="container">
      <h1 style="color: var(--primary-color); font-weight: 800; font-family: 'Outfit';">NEVUS <span style="color: var(--accent-color);">AFRICA</span></h1>
      <nav>
        <a href="#hero-section">Accueil</a>
        <a href="#about-section">À propos</a>
        <a href="#missions-section">Missions</a>
        <a href="#programs-section">Programmes</a>
        <a href="#contact-section">Contact</a>
      </nav>
    </div>
  `;
}

// Soumettre le formulaire de contact
document.addEventListener('DOMContentLoaded', async () => {
  await loadSiteSettings();
  renderNavbar();
  loadSections();
  loadContactInfo();

  // Sticky navbar effect
  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
      navbar.style.padding = '1rem 0';
      navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
    } else {
      navbar.style.padding = '1.5rem 0';
      navbar.style.boxShadow = 'none';
    }
  });
});
