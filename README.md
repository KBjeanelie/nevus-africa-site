# 🌍 Site NEVUS AFRICA (Version Cloud)

Un site vitrine premium pour l'ONG NEVUS AFRICA avec un backoffice d'administration complet. Cette version est optimisée pour un hébergement sur **Netlify** avec une base de données **Supabase**.

## ✨ Fonctionnalités

### 🌐 Site Vitrine Premium
- Design haute performance, professionnel et humain.
- Palette de couleurs institutionnelle (Bleu Marine & Orange).
- Responsive design (mobile, tablette, desktop).
- Formulaire de contact intégré avec envoi d'emails.

### 🎛️ Backoffice d'Administration
- **Sécurisé** : Authentification requise pour accéder aux réglages.
- **Gestion des couleurs** : Personnalisez le thème (couleurs CSS variables).
- **Gestion du contenu** : Modifiez les textes des sections en temps réel.
- **Suivi des messages** : Lisez et gérez les demandes de contact reçues.
- **Réinitialisation** : Option pour remettre le site à son état d'origine.

## 🚀 Architecture Technique

- **Frontend** : HTML5, CSS3 (Vanilla), JavaScript (ES6+).
- **Backend** : Node.js (Express) fonctionnant en **Netlify Functions**.
- **Base de données** : **Supabase** (PostgreSQL) pour une persistance cloud fiable.
- **Email** : Nodemailer intégré pour les notifications.

## 📁 Structure du Projet

```
nevus-africa-site/
├── functions/
│   └── api.js              # Point d'entrée Netlify Serverless
├── src/
│   ├── api/
│   │   └── routes.js       # Logique des routes API
│   └── db/
│       └── supabase.js     # Client et couche de données Supabase
├── public/
│   ├── index.html          # Page vitrine
│   ├── admin.html          # Dashboard d'administration
│   ├── login.html          # Page de connexion sécurisée
│   └── css/                # Styles (Premium Design)
├── netlify.toml            # Configuration du déploiement Netlify
├── supabase_schema.sql     # Script d'initialisation de la DB
└── .env                    # Configuration (voir .env.example)
```

## 🔧 Installation & Déploiement

### 1. Configuration de Supabase
1. Créez un projet sur [Supabase](https://supabase.com/).
2. Exécutez le script [supabase_schema.sql](./supabase_schema.sql) dans l'éditeur SQL de votre projet.
3. Notez votre `SUPABASE_URL` et votre `SUPABASE_ANON_KEY`.

### 2. Déploiement sur Netlify
1. Connectez votre dépôt GitHub à Netlify.
2. Netlify détectera automatiquement le fichier `netlify.toml`.
3. Ajoutez les variables d'environnement suivantes dans le dashboard Netlify :
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SESSION_SECRET` (une clé aléatoire)
   - `EMAIL_USER` / `EMAIL_PASS` (pour les notifications)

### 3. Développement Local
```bash
npm install
# Créez votre fichier .env basé sur .env.example
npm start
```

## 🔐 Accès Admin par défaut
- **Utilisateur** : `admin`
- **Mot de passe** : `root@2020`

---
**Développé pour l'ONG NEVUS AFRICA** 🌍❤️
