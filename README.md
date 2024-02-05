# Create T3 App

Le projet Summer-Fit a pour objectif de créer une application de gestion d’une salle de sport.

## Technologies utilisées

Le stack est basé sur le T3 Stack, qui est un stack fullstack TypeScript.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Fonctionnalités

- [x] Authentification
- [x] Gestion des utilisateurs
- [x] Gestion des abonnements
- [x] Reservation d'une séance
- [x] Validation d"une reservation par qr code
- [x] Création d'un programme d'entrainement par AI
- [x] Pannel d'administration

## Installation

clonez le repository

```bash
pnpm install
```

Copier le fichier `.env.example` en `.env` et remplissez les variables d'environnement.

```bash
cp .env.example .env
```

### Lancer le projet

```bash
pnpm dev
```
