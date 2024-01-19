// Import des bibliothèques et des composants nécessaires
import React, { useState } from 'react';
import Header from '~/app/_components/organisms/Header';
import Footer from '~/app/_components/organisms/Footer';
import { getServerAuthSession } from '~/server/auth';
import Link from 'next/link';
import { SetName } from '~/app/_components/api/set-name';

// Fonction principale de la page d'accueil
export default async function Home() {
  // Récupération des données des salles
  const session = await getServerAuthSession();

  return (
    <>
      <Header user={session?.user} />

      <main className=" flex flex-col items-center justify-center min-h-[100vh]">
        <SetName username={session?.user.name} />
      </main>

      <Footer />
    </>
  );
}
