# 🍽️ Délices de Douala

Application Angular de notation de restaurants camerounais, développée dans le cadre du **Angular Talent Lab**.

## 📖 Description

Cette application permet de consulter une liste de 6 restaurants de Douala et de les noter de 1 à 5 étoiles. Le header affiche en temps réel le nombre de restaurants notés ainsi que la moyenne globale des notes.

## ✨ Fonctionnalités

- Affichage d'une grille de 6 restaurants avec leur quartier et spécialité
- Notation interactive par étoiles (1 à 5)
- Retrait de note possible en cliquant sur la même étoile
- Header sticky avec compteur de restaurants notés
- Affichage dynamique de la moyenne des notes (visible dès la première notation)

## 🏗️ Architecture

```
src/app/
├── components/
│   ├── header/           # Header sticky avec stats dynamiques
│   ├── restaurant-list/  # Grille de cartes restaurants
│   ├── restaurant-card/  # Carte individuelle d'un restaurant
│   └── star-rating/      # Composant de notation par étoiles
├── models/
│   └── restaurant.ts     # Interface Restaurant
├── app.ts                # Composant racine (signals + computed)
└── app.routes.ts
```

## 🔧 Concepts Angular utilisés

| Concept | Usage |
|---|---|
| `signal()` | État réactif de la liste des restaurants |
| `computed()` | Calcul du nombre noté et de la moyenne |
| `input()` / `input.required()` | Communication parent → enfant |
| `output()` | Communication enfant → parent (événements de notation) |
| `@for` | Rendu de la liste avec `track` |
| `@if` | Affichage conditionnel (moyenne, score) |

## 🍲 Restaurants disponibles

| Restaurant | Quartier | Spécialité |
|---|---|---|
| Le Calao Doré | Akwa | Ndolé aux crevettes |
| Chez Madame Ngono | Bonapriso | Eru aux pieds de bœuf |
| La Fourchette Camerounaise | Bonanjo | Poulet DG |
| Saveurs du Wouri | Bonamoussadi | Poisson braisé |
| L'Akwa Gourmand | Akwa | Bobolo et sauce arachide |
| Le Royal de Bali | Bali | Koki et plantain |

## 🚀 Démarrage

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
ng serve
```

Ouvrir [http://localhost:4200](http://localhost:4200) dans le navigateur.

## 🧪 Tests

```bash
# Tests unitaires
ng test

# Tests end-to-end
ng e2e
```

## 📦 Build

```bash
ng build
```

Les artifacts de build sont générés dans le dossier `dist/`.

## 🛠️ Stack technique

- **Angular** 22
- **TypeScript**
- **Vitest** (tests unitaires)
- **Angular CLI** 22.0.1
