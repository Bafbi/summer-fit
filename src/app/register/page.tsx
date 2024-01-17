"use client"
import React from 'react';
import { useState } from 'react';

/*import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import CardProject from "~/app/_components/molecules/CardProject";
import Adidas from "~/../public/assets/images/Adidass.png";
import Fond from "~/../public/assets/images/Fond.png";*/



export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');

  const handleSignUp = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }

    // Ici, ajoutez votre logique pour gérer l'inscription de l'utilisateur
    console.log('Inscription:', { email, password, nom, prenom });
    // Vous pourriez envoyer ces informations à votre serveur via une requête API
    
    // Après l'inscription, redirigez l'utilisateur vers la page de connexion ou de profil
    // Par exemple avec react-router-dom: history.push('/login');
  };
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Inscription à Summer Fit
        </h1>

        <form className="flex flex-col items-center gap-4" onSubmit={handleSignUp}>
          

          {/* Champ pour le nom */}
          <div className="flex flex-col items-center gap-4">
            <label htmlFor="nom" className="text-lg text-white">
              Nom
            </label>
            <input
              type="text"
              id="nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="rounded-full px-4 py-2 bg-white/10"
              required
            />
          </div>

          {/* Champ pour le prénom */}
          <div className="flex flex-col items-center gap-4">
            <label htmlFor="prenom" className="text-lg text-white">
              Prénom
            </label>
            <input
              type="text"
              id="prenom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              className="rounded-full px-4 py-2 bg-white/10"
              required
            />
          </div>

          {/* Champ pour l'email */}
          <div className="flex flex-col items-center gap-4">
            <label htmlFor="email" className="text-lg text-white">
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-full px-4 py-2 bg-white/10"
              required
            />
          </div>



          {/* Champs pour le mot de passe et la confirmation */}
          {/* ... */}
          <div className="flex flex-col items-center gap-4">
            <label htmlFor="password" className="text-lg text-white">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-full px-4 py-2 bg-white/10"
              required
            />
          </div>

          {/* Champ pour la confirmation du mdp */}
          <div className="flex flex-col items-center gap-4">
            <label htmlFor="confirmPassword" className="text-lg text-white">
              Confirmation du mot de passe
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="rounded-full px-4 py-2 bg-white/10"
              required
            />
          </div>

          <button
            type="submit"
            className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
          >
            S'inscrire
          </button>
        </form>
        <p>
          Vous êtes déjà inscrit ? <a href="/login">Se connecter</a>
        </p>
      </div>
    </main>
  );
}


