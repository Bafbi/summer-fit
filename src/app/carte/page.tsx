// Import des bibliothèques et des composants nécessaires
import React, { useState } from 'react';
import '~/styles/header.css';
import Header from '../_components/organisms/Header';
import Map from '../_components/organisms/Map';
import Footer from '../_components/organisms/Footer';
import { api } from '~/trpc/server';
import { getServerSession } from 'next-auth';
import { getServerAuthSession } from '~/server/auth';
import '~/styles/carte.css'; // Import your CSS file

// Fonction principale de la page d'accueil
export default async function Home() {
  // Récupération des données des salles
  const salles = await api.halls.getAll.query();
  const session = await getServerAuthSession()

  return (
    <>
      <Header user ={session?.user}/>
      <div className="h-screen">
        
    <div className="image-container">
      <div className="overlay-text">Nos salles de sport</div>
    </div>
        <main className=' m-20 mb-0'>
          <Map salles={salles} isConnected={session !== null} />
        </main>
      </div>  
      <Footer />
    </>
  );
}
