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
  const [nomMachine, setNomMachine] = useState("");
  const [nombreMachine, setNombreMachine] = useState("1");
  const [tableauData, setTableauData] = useState([
    { nomMachine: "", nombreMachine: "" },
    { nomMachine: "", nombreMachine: "" },
    { nomMachine: "", nombreMachine: "" },
  ]);

  const handleSubmit = (e) => {
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
      tableauData,
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

  const handleAddMachine = () => {
    const newMachine = { nomMachine, nombreMachine };
    setTableauData([...tableauData, newMachine]);
    setNomMachine("");
    setNombreMachine("1");
  };

  return (
    <div className="min-h-screen bg-background-100">
      <div className="flex mt-8 justify-center">
        <form className="w-full max-w-md" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
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
            <label className="block text-white text-sm font-bold mb-2">
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
            <label className="block text-white text-sm font-bold mb-2">
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
            <label className="block text-white text-sm font-bold mb-2">
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
            <label className="block text-white text-sm font-bold mb-2">
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
            <label className="block text-white text-sm font-bold mb-2">
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
            <label className="block text-white text-sm font-bold mb-2">
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
            <label className="block text-white text-sm font-bold mb-2">
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
            <label className="block text-white text-sm font-bold mb-2">
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
          <div className="mb-4">
            <div className="flex">
              <input
                type="text"
                className="w-full border rounded-md py-2 px-3 mr-2 focus:outline-none focus:border-primary"
                placeholder="Nom Machine"
                value={nomMachine}
                onChange={(e) => setNomMachine(e.target.value)}
              />
              <select
                className="border rounded-md py-2 px-3 mr-2 focus:outline-none focus:border-primary"
                value={nombreMachine}
                onChange={(e) => setNombreMachine(e.target.value)}
              >
                {[...Array(15).keys()].map((i) => (
                  <option key={i} value={String(i + 1)}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="bg-primary text-white font-bold py-2 px-4 rounded-md focus:outline-none hover:bg-primary-dark"
                onClick={handleAddMachine}
              >
                Valider
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
              Tableau de 2 colonnes :
            </label>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-primary">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-4 py-2">Nom Machine</th>
                    <th className="px-4 py-2">Nombre Machine</th>
                  </tr>
                </thead>
                <tbody>
                  {tableauData.map((item, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-100" : ""}
                    >
                      <td className="px-4 py-2">{item.nomMachine}</td>
                      <td className="px-4 py-2">{item.nombreMachine}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
