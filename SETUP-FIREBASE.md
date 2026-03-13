# Configuration Firebase pour Impactiv Admin

## 1. Créer un projet Firebase

1. Aller sur [Firebase Console](https://console.firebase.google.com/)
2. Cliquer sur "Ajouter un projet"
3. Nommer le projet (ex: "impactiv-website")
4. Désactiver Google Analytics (optionnel)
5. Cliquer sur "Créer le projet"

## 2. Activer Realtime Database

1. Dans le menu gauche, cliquer sur "Build" > "Realtime Database"
2. Cliquer sur "Créer une base de données"
3. Choisir la région **europe-west1** (Belgique)
4. Sélectionner "Démarrer en mode test" (on sécurisera après)
5. Cliquer sur "Activer"

## 3. Activer Storage (pour les images)

1. Dans le menu gauche, cliquer sur "Build" > "Storage"
2. Cliquer sur "Commencer"
3. Sélectionner "Démarrer en mode test"
4. Choisir la région **europe-west1**
5. Cliquer sur "Terminé"

## 4. Obtenir la configuration

1. Cliquer sur l'icône ⚙️ (engrenage) en haut à gauche > "Paramètres du projet"
2. Descendre jusqu'à "Vos applications"
3. Cliquer sur l'icône "</>" (Web)
4. Donner un nom à l'app (ex: "impactiv-web")
5. Cliquer sur "Enregistrer l'application"
6. Copier la configuration qui s'affiche

## 5. Mettre à jour les fichiers

Remplacer la configuration dans **admin.html** et **index.html** :

```javascript
const firebaseConfig = {
    apiKey: "AIzaSy...",  // Votre vraie clé
    authDomain: "votre-projet.firebaseapp.com",
    databaseURL: "https://votre-projet-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "votre-projet",
    storageBucket: "votre-projet.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123"
};
```

## 6. Sécuriser la base de données

Dans Firebase Console > Realtime Database > Règles, remplacer par :

```json
{
  "rules": {
    "actualites": {
      ".read": true,
      ".write": true
    }
  }
}
```

## 7. Sécuriser le Storage

Dans Firebase Console > Storage > Règles, remplacer par :

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /actualites/{allPaths=**} {
      allow read: if true;
      allow write: if true;
    }
  }
}
```

## 8. Changer le mot de passe admin

Dans **admin.html**, chercher et modifier :

```javascript
const ADMIN_PASSWORD = "impactiv2024";
```

Remplacer par un mot de passe sécurisé.

## 9. Tester

1. Ouvrir `admin.html` dans le navigateur
2. Se connecter avec le mot de passe
3. Ajouter une actualité
4. Vérifier sur `index.html` que l'actualité apparaît

## URL de l'admin

Une fois déployé sur Netlify : `https://votre-site.netlify.app/admin.html`

---

## Pour le client

Donnez à votre client :
- L'URL de la page admin
- Le mot de passe que vous avez choisi
