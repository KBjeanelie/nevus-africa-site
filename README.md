# 🌍 Site NEVUS AFRICA

Un site vitrine complet pour l'ONG NEVUS AFRICA avec un backoffice d'administration. Entièrement construit en JavaScript (Node.js) avec Express, SQLite et une interface moderne.

## ✨ Fonctionnalités

### 🌐 Site Vitrine
- Page d'accueil professionnelle avec sections animées
- Responsive design (mobile, tablette, desktop)
- Informations sur l'ONG, missions et programmes
- Formulaire de contact
- Thème personnalisable

### 🎛️ Backoffice d'Administration
- **Gestion des couleurs** : Personnalisez le design en temps réel
  - Couleur primaire, secondaire, accent
  - Couleur du texte et des boutons
- **Gestion des sections** : Modifiez le contenu textuel
  - Modifier, ajouter, supprimer des sections
- **Gestion des contacts** : Mettez à jour les informations de contact
  - Email, téléphone, adresse

## 🚀 Démarrage rapide

### Prérequis
- Node.js v14+ 
- npm ou yarn

### Installation

```bash
# Cloner le repo ou accéder au dossier
cd nevus-africa-site

# Installer les dépendances
npm install

# Démarrer le serveur
npm start
```

Le serveur démarre sur `http://localhost:3000`

### Accès
- **Site public** : http://localhost:3000
- **Backoffice** : http://localhost:3000/admin

## 📁 Structure du Projet

```
nevus-africa-site/
├── src/
│   ├── api/
│   │   └── routes.js          # Routes API
│   └── db/
│       └── database.js         # Configuration SQLite
├── public/
│   ├── index.html              # Page vitrine
│   ├── admin.html              # Page backoffice
│   ├── css/
│   │   ├── style.css           # Styles vitrine
│   │   └── admin.css           # Styles backoffice
│   └── js/
│       ├── app.js              # JavaScript vitrine
│       └── admin.js            # JavaScript backoffice
├── data/
│   └── nevus.db                # Base de données SQLite (créée auto)
├── index.js                    # Serveur principal
├── package.json
└── .env                        # Variables d'environnement
```

## 🔧 Configuration

### Variables d'environnement (.env)
```
PORT=3000
NODE_ENV=development
```

## 📚 API Endpoints

### Paramètres du site
- `GET /api/settings` - Obtenir tous les paramètres
- `PUT /api/settings/:key` - Mettre à jour un paramètre

### Sections
- `GET /api/sections` - Obtenir toutes les sections
- `GET /api/sections/:id` - Obtenir une section
- `POST /api/sections` - Créer une section
- `PUT /api/sections/:id` - Mettre à jour une section
- `DELETE /api/sections/:id` - Supprimer une section

### Contacts
- `GET /api/contacts` - Obtenir tous les contacts
- `PUT /api/contacts/:type` - Mettre à jour un contact
- `POST /api/contacts` - Ajouter un contact

## 🎨 Personnalisation

### Modifier les couleurs
1. Accédez au backoffice : http://localhost:3000/admin
2. Cliquez sur "🎨 Paramètres"
3. Changez les couleurs avec les sélecteurs de couleur
4. Cliquez "💾 Enregistrer les couleurs"

### Modifier le contenu
1. Accédez au backoffice
2. Cliquez sur "📝 Sections"
3. Modifiez le texte directement dans les textarea
4. Cliquez "💾 Enregistrer"

### Mettre à jour les contacts
1. Accédez au backoffice
2. Cliquez sur "📧 Contacts"
3. Modifiez email, téléphone et adresse
4. Cliquez "Enregistrer" pour chaque champ

## 🌐 Déploiement

### Sur Render.com (Recommandé)

1. **Créer un compte Render** : https://render.com

2. **Connecter votre repo GitHub**

3. **Créer un nouveau Web Service**
   - Source : GitHub (repo)
   - Runtime : Node
   - Build command : `npm install`
   - Start command : `npm start`

4. **Variables d'environnement**
   ```
   PORT=3000
   NODE_ENV=production
   ```

5. **Déployer**

### Sur Railway.app

1. **Créer un compte Railway** : https://railway.app

2. **Connecter GitHub**

3. **Créer un nouveau projet**

4. **Sélectionner le repo**

5. **Railway détectera automatiquement Node.js**

6. **Ajouter les variables d'environnement**

7. **Déployer**

### Sur Netlify (Serverless Functions)

Netlify est principalement pour du statique. Pour une app Node.js complète, nous recommandons Render.com ou Railway.app qui offrent une meilleure support pour Express + SQLite.

## 📦 Dépendances

- **express** - Framework web
- **sqlite3** - Base de données
- **cors** - Cross-Origin Resource Sharing
- **body-parser** - Parsing des requêtes
- **dotenv** - Gestion des variables d'environnement

## 🔒 Sécurité

- Entrées validées et échappées
- Requêtes paramétrées pour prévenir les injections SQL
- CORS configuré
- Production ready

## 📝 Licence

MIT - Libre d'utilisation

## 👥 Support

Pour toute question ou problème, contactez : contact@nevusafrica.org

---

**Développé pour l'ONG NEVUS AFRICA** 🌍❤️
