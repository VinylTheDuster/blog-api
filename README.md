# My Devlog : Blog + API + Dashboard – Projet Fullstack

## 🔗 Liens du projet

- **Frontend (Blog)** : [VinylTheDuster/blog](https://github.com/VinylTheDuster/blog)  
  → Application React affichant les articles et tags, interface publique du projet.

- **Backend (API + Dashboard)** : [VinylTheDuster/blog-api](https://github.com/VinylTheDuster/blog-api)  
  → Serveur Express.js connecté à Supabase, expose les routes API et sert le dashboard d’administration.

## 📖 Description

Ce projet est une application **fullstack** composée de trois parties :
- **Blog (Front)** : une interface utilisateur moderne construite avec **React**, affichant les articles et tags.
- **API (Back)** : un serveur **Express.js** qui expose des routes REST pour fournir les données et gérer l’authentification.
- **Dashboard (Front embarqué)** : une interface d’administration compilée et servie directement par l’API, permettant de gérer le contenu.

L’objectif est de démontrer ma maîtrise d’une architecture complète : **front + back + base de données + déploiement**.

Le projet suit une organisation **MVC (Model – View – Controller)** :
- **Model** : gestion des données via **Supabase/PostgreSQL** et synchronisation en JSON côté serveur.  
- **View** : interfaces React (blog public et dashboard admin).  
- **Controller** : logique métier et routes Express pour orchestrer les échanges entre front et base de données.  

Il implémente également les opérations **CRUD** (Create, Read, Update, Delete) :
- **Create** : ajout de nouveaux articles ou tags via le dashboard.  
- **Read** : récupération des données (articles, tags, version) depuis l’API.  
- **Update** : modification des contenus existants.  
- **Delete** : suppression d’articles ou de tags.  

Ce projet illustre donc la mise en place d’un **cycle complet de gestion de données** dans une architecture moderne et modulaire.

---

## 🛠️ Stack technique

- **Frontend** : React, TailwindCSS, React Router, Material UI  
- **Backend** : Node.js, Express.js, Dotenv
- **Base de données** : Supabase (PostgreSQL)
- **Authentification** : Vérification des identifiants via API + redirection dynamique
- **Déploiement** : API et dashboard embarqué sur le même serveur Express, blog déployé séparément  
- **Gestion des environnements** : `.env.local`, `.env.production`  

---

## ⚙️ Fonctionnalités

- 🔹 **Blog public** : affichage des articles et tags depuis l’API  
- 🔹 **API REST** : endpoints `/data?type=articles|tags|version`
- 🔹 **Dashboard admin** : accessible via `/dashboard`, permet de gérer le contenu 
- 🔹 **Authentification** : login avec identifiants stockés en variables d’environnement  
- 🔹 **Synchronisation** : au démarrage, l’API met à jour les fichiers JSON depuis Supabase
- 🔹 **Architecture modulaire** : séparation claire entre blog, API et dashboard

---

## 📂 Structure du projet

```
/backend
├── app.js     # Serveur Express
├── routes/    # Routes API
├── data/      # Fichiers JSON générés 
├── client/    # Front embarqué (dashboard React build) 
└── .env       # Variables d'environnement

/frontend-blog 
├── src/       # Blog React 
└── build/     # Déploiement statique
```

---

## 🚦 Installation & Lancement

### 1. Cloner le repo

```
git clone https://github.com/VinylTheDuster/[blog ou blog-api].git
cd [blog ou blog-api]
```

### 2. Installer les dépendances

```
npm install
```

### 3. Configurer les variables d’environnement

Créer un fichier `.env` à la racine de blog :

```
REACT_APP_API=http://localhost:3000 #hors prod
REACT_APP_API_PROD=...URL de votre api
```

Créer un fichier `.env` à la racine de blog-api :

```
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
API_INTERFACE_USERNAME=admin
API_INTERFACE_PASSWORD=12345
API_INTERFACE_FRUIT=fruit préféré
```

## 🎯 Objectifs pédagogiques

- **Maîtrise fullstack :** Démontrer ma capacité à concevoir et développer un projet complet intégrant un **frontend moderne (React)**, un **backend robuste (Express.js)** et une **base de données relationnelle (Supabase/PostgreSQL)**.  
- **Architecture scalable :** Mettre en avant ma compétence à structurer une application selon une logique **MVC (Model – View – Controller)**, avec séparation claire des responsabilités, gestion des environnements (`.env`), et organisation modulaire pour faciliter la maintenance et l’évolution du projet.  
- **Bonnes pratiques :** Illustrer ma compréhension des principes essentiels du développement professionnel :  
  - Sécurité (authentification, gestion des accès, variables d’environnement)  
  - Gestion des données (synchronisation JSON ↔ base SQL, opérations CRUD complètes)  
  - Déploiement (front et back intégrés, gestion multi-fronts, adaptation dev/prod)  
- **Projet présentable :** Fournir un projet **concret, documenté et déployable**, avec un **README clair**, des **captures d’écran** à venir et un déploiement futur pour valoriser mes compétences auprès des recruteurs.  
- **Cycle complet de développement :** Montrer que je maîtrise toutes les étapes : conception, implémentation, tests, documentation et mise en production.

---

## 🔮 Améliorations possibles

- **Sécuriser l’authentification:** Intégrer bcrypt pour le hash des mots de passe et JWT pour la gestion de session.
- **Tests automatiques:** Ajouter des tests unitaires et d’intégration (Jest, Supertest) sur les routes critiques.
- **CI/CD:** Mettre en place un pipeline GitHub Actions (lint, tests, build, déploiement).
- **Gestion des rôles:** Implémenter un contrôle d’accès basé sur les rôles (admin/user) avec middleware dédié.

