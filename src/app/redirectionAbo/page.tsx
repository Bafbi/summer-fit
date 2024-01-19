/* eslint-disable react/no-unescaped-entities */

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

      <main className=" flex flex-col items-center justify-center min-h-[88vh]">
        <h1 className="text-3xl font-semibold text-center ">
          Désolé, vous n'avez pas accès à cette page.
        </h1>
        <h3 className="text-lg font-medium text-center  py-3">
          Pour y accèder veuillez vous connecter:
        </h3>
        <Link
          href="/api/auth/signin"
          className="bg-[#7945f7] text-white px-6 py-3 rounded-lg transition-transform transform hover:scale-105"
        >
          Se connecter
        </Link>
      </main>

      <Footer />
    </>
  );
}
