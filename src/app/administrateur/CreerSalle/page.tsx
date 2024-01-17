"use client"
import React, { useState } from "react";
import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default function Page() {
  const [nomSalle, setNomSalle] = useState("");
  const [adresse, setAdresse] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [capacite, setCapacite] = useState("");
  const [nbrCoach, setNbrCoach] = useState("1");
  const [numTel, setNumTel] = useState("");
  const [heureOuvertureHeures, setHeureOuvertureHeures] = useState("0");
  const [heureOuvertureMinutes, setHeureOuvertureMinutes] = useState("0");
  const [heureFermetureHeures, setHeureFermetureHeures] = useState("0");
  const [heureFermetureMinutes, setHeureFermetureMinutes] = useState("0");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const heureOuverture = `${heureOuvertureHeures}:${heureOuvertureMinutes}`;
    const heureFermeture = `${heureFermetureHeures}:${heureFermetureMinutes}`;

    const formData = {
      nomSalle,
      adresse,
      latitude,
      longitude,
      capacite,
      nbrCoach,
      numTel,
      heureOuverture,
      heureFermeture,
    };

    // Exemple de requête POST
    fetch("/votre-api-ou-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi du formulaire :", error);
      });
  };

  return (
    <div className="min-h-screen bg-background-100">
      <header className="p-4 flex items-center bg-secondary-dark justify-between">
        <div className="flex items-center">
          <img
            src="/assets/images/Logo.png"
            alt="Logo"
            className="w-10 h-10 mr-2"
          />
          <h1 className="text-2xl font-bold text-center">Bienvenue sur SummerFit</h1>
        </div>
        <Link href="/deconnexion" className="text-primary text-lg font-semibold hover:underline focus:outline-none focus:ring focus:ring-purple-300 px-4 py-2 rounded-md">
          Déconnexion
        </Link>
      </header>
      <div className="flex mt-8 justify-center">
        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nom de la salle :
            </label>
            <input
              type="text"
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-primary"
              placeholder="Entrez le nom de la salle"
              value={nomSalle}
              onChange={(e) => setNomSalle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Adresse :
            </label>
            <input
              type="text"
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-primary"
              placeholder="Entrez l'adresse de la salle"
              value={adresse}
              onChange={(e) => setAdresse(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Latitude :
            </label>
            <input
              type="text"
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-primary"
              placeholder="Entrez la latitude de la salle"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Longitude :
            </label>
            <input
              type="text"
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-primary"
              placeholder="Entrez la longitude de la salle"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Capacité :
            </label>
            <input
              type="text"
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-primary"
              placeholder="Entrez la capacité de la salle"
              value={capacite}
              onChange={(e) => setCapacite(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nombre de coach :
            </label>
            <select
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-primary"
              value={nbrCoach}
              onChange={(e) => setNbrCoach(e.target.value)}
            >
              {[...Array(10).keys()].map((i) => (
                <option key={i} value={String(i + 1)}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Numéro de téléphone :
            </label>
            <input
              type="text"
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-primary"
              placeholder="Entrez le numéro de téléphone de la salle"
              value={numTel}
              onChange={(e) => setNumTel(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Heure d'ouverture :
            </label>
            <div className="flex">
              <select
                className="border rounded-md py-2 px-3 focus:outline-none focus:border-primary"
                value={heureOuvertureHeures}
                onChange={(e) => setHeureOuvertureHeures(e.target.value)}
              >
                {[...Array(25).keys()].map((i) => (
                  <option key={i} value={String(i)}>
                    {i}
                  </option>
                ))}
              </select>
              <span className="mx-2">:</span>
              <select
                className="border rounded-md py-2 px-3 focus:outline-none focus:border-primary"
                value={heureOuvertureMinutes}
                onChange={(e) => setHeureOuvertureMinutes(e.target.value)}
              >
                {[...Array(60).keys()].map((i) => (
                  <option key={i} value={String(i)}>
                    {i}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Heure de fermeture :
            </label>
            <div className="flex">
              <select
                className="border rounded-md py-2 px-3 focus:outline-none focus:border-primary"
                value={heureFermetureHeures}
                onChange={(e) => setHeureFermetureHeures(e.target.value)}
              >
                {[...Array(25).keys()].map((i) => (
                  <option key={i} value={String(i)}>
                    {i}
                  </option>
                ))}
              </select>
              <span className="mx-2">:</span>
              <select
                className="border rounded-md py-2 px-3 focus:outline-none focus:border-primary"
                value={heureFermetureMinutes}
                onChange={(e) => setHeureFermetureMinutes(e.target.value)}
              >
                {[...Array(60).keys()].map((i) => (
                  <option key={i} value={String(i)}>
                    {i}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-primary text-white font-bold py-2 px-4 rounded-md focus:outline-none hover:bg-primary-dark"
            >
              Créer la salle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
