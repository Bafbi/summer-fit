/* eslint-disable react/no-unescaped-entities */

// Import des bibliothèques et des composants nécessaires
import React, { useState } from 'react';
import Header from '../_components/organisms/Header';
import Footer from '../_components/organisms/Footer';
import { getServerAuthSession } from '~/server/auth';
import '~/styles/profil.css'; // Import your CSS file
import Link from 'next/link';

// Fonction principale de la page d'accueil
export default async function Home() {
  // Récupération des données des salles
  const session = await getServerAuthSession();
  const userAbonnement = session?.user.abonnement;

  return (
    <>
      <Header user={session?.user} />
      <div className="image-container">
        <div className="overlay-text">Mon Profil </div>
      </div>
      <main className=" flex flex-col   ">
        <h1 className="text-3xl font-semibold text-[#7945f7] mt-5 ml-[7%] uppercase py-3">
          Connecté avec {session?.user.name}
        </h1>
        <h1 className="text-xl font-semibold ml-[7%]  text-[#444]">
        Vous avez actuellement l'abonnement   <span className='text-[#7945f7]'>{session?.user.abonnement}</span>.
        </h1>
        <div className="flex ml-[7%] mt-2">
        <Link
          href="/abonnement"
          className="my-4 transform rounded-lg mr-5 uppercase font-black  bg-[#7945f7] px-8 py-2 text-white transition-transform active:scale-95"
        >
          Changer d'abonnement
        </Link>
        <Link
          href="/api/auth/signout"
          className="my-4 transform rounded-lg uppercase font-black  bg-[#ee0028] px-8 py-2 text-white transition-transform active:scale-95"
        >
          Se déconnecter
        </Link></div>
      </main>

      <span className="text-[#fff]">
        {" "}
        . <br />. <br />. <br />. <br />. <br />. <br />. <br />. 
      </span>
      <Footer />
    </>
  );
}
