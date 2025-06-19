# 🏢 Altoo - Système de Gestion de Produits et Factures

Une application moderne de gestion de produits et de factures construite avec **Django REST Framework** et **Next.js**.

## 📋 Table des matières

- [Fonctionnalités](#-fonctionnalités)
- [Technologies utilisées](#-technologies-utilisées)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Utilisation](#-utilisation)
- [Structure du projet](#-structure-du-projet)
- [API Endpoints](#-api-endpoints)
- [Captures d'écran](#-captures-décran)

## ✨ Fonctionnalités

### 🛍️ Gestion des Produits

- ✅ CRUD complet (Créer, Lire, Modifier, Supprimer)
- ✅ Gestion des dates de péremption
- ✅ Badges visuels pour produits expirés/expire bientôt
- ✅ Pagination automatique (5 produits par page)
- ✅ Interface responsive moderne

### 🧾 Gestion des Factures

- ✅ Création de factures avec lignes multiples
- ✅ Sélection de produits par nom dans les formulaires
- ✅ Calcul automatique des totaux
- ✅ Affichage détaillé des factures
- ✅ Modification des factures existantes
- ✅ Pagination automatique (5 factures par page)

### 🎨 Interface Utilisateur

- ✅ Design moderne avec Shadcn/ui et Tailwind CSS
- ✅ Toasts de feedback pour toutes les actions
- ✅ Navigation fluide entre les pages
- ✅ Responsive design (mobile-friendly)
- ✅ Loading states et gestion d'erreurs

## 🛠️ Technologies utilisées

### Backend

- **Django 5.2.3** - Framework web Python
- **Django REST Framework 3.16.0** - API REST
- **SQLite** - Base de données (pour le développement)

### Frontend

- **Next.js 15** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styles utilitaires
- **Shadcn/ui** - Composants UI
- **React Hook Form** - Gestion des formulaires
- **React Query (TanStack Query)** - Gestion des données
- **Zod** - Validation des schémas
- **Sonner** - Notifications toast
- **Date-fns** - Manipulation des dates

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Python 3.11+** - [Télécharger Python](https://www.python.org/downloads/)
- **Node.js 18+** - [Télécharger Node.js](https://nodejs.org/)
- **pnpm** - [Installer pnpm](https://pnpm.io/installation)
- **Git** - [Télécharger Git](https://git-scm.com/)

## 🚀 Installation

### 1. Cloner le projet

```bash
git clone https://github.com/votre-username/altoo.git
cd altoo
```

### 2. Configuration du Backend (Django)

#### 2.1 Créer et activer l'environnement virtuel

```bash
# Aller dans le dossier backend
cd backend

# Créer l'environnement virtuel
python -m venv env

# Activer l'environnement virtuel
# Sur Windows :
env\Scripts\activate
# Sur macOS/Linux :
source env/bin/activate
```

#### 2.2 Installer les dépendances Python

```bash
pip install django==5.2.3
pip install djangorestframework==3.16.0
pip install django-cors-headers
```

#### 2.3 Configurer la base de données

```bash
# Créer les migrations
python manage.py makemigrations

# Appliquer les migrations
python manage.py migrate

# (Optionnel) Créer un superutilisateur
python manage.py createsuperuser
```

#### 2.4 Démarrer le serveur Django

```bash
python manage.py runserver
```

Le backend sera accessible sur : **http://localhost:8000**

### 3. Configuration du Frontend (Next.js)

#### 3.1 Installer les dépendances

```bash
# Aller dans le dossier frontend (nouveau terminal)
cd frontend

# Installer les dépendances avec pnpm
pnpm install
```

#### 3.2 Démarrer le serveur de développement

```bash
pnpm dev
```

Le frontend sera accessible sur : **http://localhost:3000**

## 🎯 Utilisation

### Démarrage rapide

1. **Démarrer le backend** :

   ```bash
   cd backend
   env\Scripts\activate  # Windows
   python manage.py runserver
   ```

2. **Démarrer le frontend** (nouveau terminal) :

   ```bash
   cd frontend
   pnpm dev
   ```

3. **Accéder à l'application** : http://localhost:3000

### Navigation dans l'application

1. **Page d'accueil** : Vue d'ensemble avec navigation
2. **Produits** (`/produits`) :
   - Voir la liste des produits
   - Ajouter un nouveau produit
   - Modifier/Supprimer des produits
3. **Factures** (`/factures`) :
   - Voir la liste des factures
   - Créer une nouvelle facture
   - Voir les détails d'une facture
   - Modifier/Supprimer des factures

## 📁 Structure du projet

```
altoo/
├── backend/                 # API Django
│   ├── config/             # Configuration Django
│   │   ├── settings.py     # Paramètres Django
│   │   ├── urls.py         # URLs principales
│   │   └── ...
│   ├── facture/            # App Django principale
│   │   ├── models.py       # Modèles de données
│   │   ├── serializers.py  # Sérialiseurs DRF
│   │   ├── views.py        # Vues API
│   │   ├── urls.py         # URLs de l'app
│   │   └── migrations/     # Migrations de BD
│   ├── manage.py           # Script de gestion Django
│   └── db.sqlite3          # Base de données SQLite
│
├── frontend/               # Application Next.js
│   ├── src/
│   │   ├── app/            # Pages Next.js (App Router)
│   │   │   ├── produits/   # Pages produits
│   │   │   ├── factures/   # Pages factures
│   │   │   └── layout.tsx  # Layout principal
│   │   ├── components/     # Composants réutilisables
│   │   │   ├── ui/         # Composants Shadcn/ui
│   │   │   └── ...
│   │   ├── lib/            # Utilitaires
│   │   │   ├── api.ts      # Fonctions API
│   │   │   └── utils.ts    # Utilitaires divers
│   │   └── types/          # Types TypeScript
│   ├── package.json        # Dépendances Node.js
│   └── ...
│
└── README.md               # Ce fichier
```

## 🔌 API Endpoints

### Produits

- `GET /api/produits/` - Liste des produits (avec pagination)
- `POST /api/produits/` - Créer un produit
- `GET /api/produits/{id}/` - Détails d'un produit
- `PUT /api/produits/{id}/` - Modifier un produit
- `DELETE /api/produits/{id}/` - Supprimer un produit

### Factures

- `GET /api/factures/` - Liste des factures (avec pagination)
- `POST /api/factures/` - Créer une facture
- `GET /api/factures/{id}/` - Détails d'une facture
- `PUT /api/factures/{id}/` - Modifier une facture
- `DELETE /api/factures/{id}/` - Supprimer une facture

### Pagination

Toutes les listes supportent la pagination :

- `?page=1` - Numéro de page
- Limite : 5 éléments par page

## 🎨 Fonctionnalités visuelles

### Badges de statut des produits

- 🔴 **Badge rouge "Expiré"** : Produits dont la date de péremption est dépassée
- 🟡 **Badge orange "Expire bientôt"** : Produits expirant dans les 7 prochains jours

### Interface responsive

- 📱 **Mobile** : Cartes empilées, navigation adaptée
- 💻 **Desktop** : Grille de cartes, interface complète
- 🖱️ **Interactions** : Hover effects, transitions fluides

## 🔧 Commandes utiles

### Backend Django

```bash
# Créer une nouvelle migration
python manage.py makemigrations

# Appliquer les migrations
python manage.py migrate

# Créer un superutilisateur
python manage.py createsuperuser

# Accéder au shell Django
python manage.py shell

# Collecter les fichiers statiques (production)
python manage.py collectstatic
```

### Frontend Next.js

```bash
# Installer les dépendances
pnpm install

# Démarrer en mode développement
pnpm dev

# Build pour la production
pnpm build

# Démarrer en mode production
pnpm start

# Linter le code
pnpm lint
```

## 🚀 Déploiement

### Backend (Django)

1. Configurer les variables d'environnement
2. Utiliser une base de données de production (PostgreSQL)
3. Configurer les fichiers statiques
4. Déployer sur Heroku, Railway, ou serveur VPS

### Frontend (Next.js)

1. Build l'application : `pnpm build`
2. Déployer sur Vercel, Netlify, ou serveur statique

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature : `git checkout -b feature/AmazingFeature`
3. Commit les changes : `git commit -m 'Add some AmazingFeature'`
4. Push vers la branche : `git push origin feature/AmazingFeature`
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

Si vous rencontrez des problèmes :

1. Vérifiez que tous les prérequis sont installés
2. Assurez-vous que les deux serveurs (Django et Next.js) sont en cours d'exécution
3. Vérifiez les logs dans les terminaux
4. Ouvrez une issue sur GitHub

---

**Développé avec ❤️ par [Votre Nom]**
