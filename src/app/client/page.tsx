// Import des bibliothèques et des composants nécessaires
import React, { useState } from 'react';
import Header from '../_components/organisms/Header';
import Footer from '../_components/organisms/Footer';
import { getServerAuthSession } from '~/server/auth';
import Link from 'next/link';

// Fonction principale de la page d'accueil
export default async function Home() {
  // Récupération des données des salles
  const session = await getServerAuthSession();
  const userAbonnement = session?.user.abonnement;

  return (
    <>
      <Header user={session?.user} />

      <main className=" flex flex-col items-center justify-center min-h-[100vh]">
        <h1 className="text-3xl font-semibold text-center  py-3">
          Connecté avec {session?.user.name}
        </h1>
        <h1 className="text-3xl font-semibold text-center  py-3">
        Vous avez actuellement l'abonnement {session?.user.abonnement}.
        </h1>
        <h3 className="text-lg font-medium text-center  py-3">
          Pour améliorer votre abonnement :
        </h3>
        <Link
          href="/abonnement"
          className="bg-purple-600 text-white px-6 py-3 rounded-lg transition-transform transform hover:scale-105"
        >
          Changer d'abonnement
        </Link>
        <h3 className="text-lg font-medium text-center  py-3">
          Pour accèder à vos réservations:
        </h3>
        <Link
          href="/reservation"
          className="bg-purple-600 text-white px-6 py-3 rounded-lg transition-transform transform hover:scale-105"
        >
          Mes réservations
        </Link> 
        <Link
          href="/api/auth/signin"
          className="bg-red-600 text-white px-6 py-3 mt-9 rounded-lg transition-transform transform hover:scale-105"
        >
          Se déconnecter :/
        </Link>
      </main>

      <Footer />
    </>
  );
}
