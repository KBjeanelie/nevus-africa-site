# 📖 Guide d'Utilisation - NEVUS AFRICA Site

## 🎯 Pour commencer

### Étape 1 : Lancer le serveur

```bash
cd nevus-africa-site
npm start
```

Vous verrez :
```
✅ Serveur NEVUS AFRICA lancé sur http://localhost:3000
📊 Backoffice: http://localhost:3000/admin
```

### Étape 2 : Accéder au site

- **Site public** : Ouvrez http://localhost:3000 dans votre navigateur
- **Backoffice admin** : Ouvrez http://localhost:3000/admin

---

## 🎨 Personnaliser l'apparence

### Changer les couleurs

1. Allez à http://localhost:3000/admin
2. Cliquez sur le bouton "🎨 Paramètres" dans la barre latérale gauche
3. Vous verrez 6 sélecteurs de couleur :
   - **Couleur Primaire** : Fond principal du site
   - **Couleur Secondaire** : Fond secondaire
   - **Couleur d'Accent** : Accent et bordures
   - **Couleur du Texte** : Couleur du texte
   - **Couleur des Boutons** : Couleur des boutons
   - **Couleur Boutons (Hover)** : Couleur au survol

4. Cliquez sur chaque carré de couleur pour ouvrir le sélecteur
5. Choisissez votre couleur
6. Cliquez "💾 Enregistrer les couleurs" en bas

✅ Les changements s'appliqueront immédiatement sur le site public!

---

## 📝 Modifier le contenu des sections

### Éditer une section existante

1. Allez à http://localhost:3000/admin
2. Cliquez sur "📝 Sections" dans la barre latérale
3. Vous verrez toutes les sections du site
4. Pour chaque section, vous pouvez modifier le contenu dans le textarea
5. Cliquez "💾 Enregistrer" pour sauvegarder les modifications

### Ajouter une nouvelle section

1. Cliquez sur "+ Ajouter une section"
2. Remplissez le formulaire :
   - **Nom** : Identifiant unique (ex: "services")
   - **Titre** : Le titre affiché (ex: "Nos Services")
   - **Contenu** : Le contenu textuel
   - **Ordre** : Numéro d'ordre d'apparition
3. Cliquez "Enregistrer"

### Supprimer une section

1. Allez à "📝 Sections"
2. Trouvez la section à supprimer
3. Cliquez "🗑️ Supprimer"
4. Confirmez la suppression

---

## 📧 Gérer les informations de contact

1. Allez à http://localhost:3000/admin
2. Cliquez sur "📧 Contacts" dans la barre latérale
3. Vous verrez 3 champs :
   - **Email** : Email de contact
   - **Téléphone** : Numéro de téléphone
   - **Adresse** : Adresse physique

4. Modifiez les valeurs directement
5. Cliquez "Enregistrer" pour chaque champ

---

## 📲 Responsive et Mobile

Le site est entièrement responsive :
- ✅ Fonctionne sur desktop (1920px+)
- ✅ Fonctionne sur tablette (768px-1023px)
- ✅ Fonctionne sur mobile (< 768px)

Testez en redimensionnant votre navigateur!

---

## 🔗 Structure du site public

Le site public a les sections suivantes :

1. **Header (Navbar)** - Navigation sticky
2. **Hero** - Section d'accueil avec CTA
3. **À propos** - Information sur l'ONG
4. **Missions** - Liste des 12 missions
5. **Programmes** - 5 programmes principaux
6. **Contact** - Informations et formulaire

---

## 🛠️ Configuration avancée

### Variables d'environnement

Modifiez le fichier `.env` :

```
PORT=3000              # Port du serveur (défaut: 3000)
NODE_ENV=development   # development ou production
```

### Base de données

La base de données SQLite est créée automatiquement dans le dossier `data/`

- `data/nevus.db` : Fichier de base de données

Si vous voulez réinitialiser :
```bash
rm data/nevus.db
npm start
```

---

## 🐛 Dépannage

### Le serveur ne démarre pas
```bash
# Vérifiez les logs
npm start

# Vérifiez le port 3000
lsof -i :3000
```

### Les modifications ne s'appliquent pas
1. Rafraîchissez la page (Ctrl+F5 ou Cmd+Shift+R)
2. Vérifiez la console (F12)
3. Redémarrez le serveur (Ctrl+C puis npm start)

### Erreur de base de données
1. Arrêtez le serveur
2. Supprimez `data/nevus.db`
3. Redémarrez : `npm start`

---

## 📤 Déploiement

### Déployer sur Render.com

1. Allez sur https://render.com
2. Créez un compte et connectez votre GitHub
3. Créer un **New → Web Service**
4. Sélectionnez votre repo
5. Configuration :
   - **Name** : nevus-africa-site
   - **Runtime** : Node
   - **Build Command** : `npm install`
   - **Start Command** : `npm start`
6. Ajouter les variables d'environnement
7. Déployer!

### Déployer sur Railway

1. Allez sur https://railway.app
2. Créez un compte et connectez GitHub
3. **Create a new project**
4. Sélectionnez votre repo
5. Railway détecte automatiquement
6. Cliquez **Deploy**

---

## 💡 Conseils

- 📸 Prenez des notes des couleurs que vous aimez (codes hex)
- 💾 Sauvegardez régulièrement vos changements
- 🔄 Les changements sont instantanés - pas besoin de redémarrer
- 📱 Testez toujours sur mobile aussi
- 🌐 Vérifiez les liens dans les formulaires

---

## ❓ Questions ?

Contactez : contact@nevusafrica.org

Bonne chance avec le site NEVUS AFRICA! 🌍❤️
