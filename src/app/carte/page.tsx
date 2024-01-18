// Import des bibliothèques et des composants nécessaires
import React, { useState } from 'react';
import '~/styles/header.css';
import Header from '../_components/organisms/Header';
import Map from '../_components/organisms/Map';
import { api } from '~/trpc/server';
import { getServerSession } from 'next-auth';
import { getServerAuthSession } from '~/server/auth';

// Fonction principale de la page d'accueil
export default async function Home() {
  // Récupération des données des salles
  const salles = await api.halls.getAll.query();
  const session = await getServerAuthSession()

  return (
    <>
      {/* Inclusion du composant Header */}
      <Header user ={session?.user}/>

      {/* Contenu principal de la page */}
      <div className="h-screen">
        {/* En-tête */}


        {/* Contenu principal (la carte) */}
        <main>
          <Map salles={salles} />
        </main>
      </div>
    </>
  );
}
