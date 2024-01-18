// Import des bibliothèques et des composants nécessaires
import React, { useState } from 'react';
import '~/styles/header.css';
import Header from '../_components/organisms/Header';
import Map from '../_components/organisms/Map';
import { api } from '~/trpc/server';

// Fonction principale de la page d'accueil
export default async function Home() {
  // Récupération des données des salles
  const salles = await api.halls.getAll.query();

  return (
    <>
      {/* Inclusion du composant Header */}
      <Header />

      {/* Contenu principal de la page */}
      <div className="h-screen">
        {/* En-tête */}
        <header className="ml-10 mt-5 md:mt-20">
          <h1 className="text-3xl md:text-5xl font-bold">Où nous trouver !</h1>
        </header>

        {/* Contenu principal (la carte) */}
        <main>
          <Map salles={salles} />
        </main>
      </div>
    </>
  );
}
