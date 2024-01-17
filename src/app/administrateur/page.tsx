import Link from "next/link";
import React from "react";
import { Card, CardFooter, CardBody } from "@nextui-org/react";
import Image from "next/image";
import { RouterOutputs } from "~/trpc/shared";
import { Salle } from "@prisma/client";

import {api} from "~/trpc/server"

export default async function Home() {
  const salles = await api.halls.getAll.query();
  const salleData = [
    { id: 1, nom: "Salle 1", proprietaire: "Propriétaire 1" },
    { id: 2, nom: "Salle 2", proprietaire: "Propriétaire 2" },
    { id: 3, nom: "Salle 3", proprietaire: "Propriétaire 3" },
    { id: 4, nom: "Salle 4", proprietaire: "Propriétaire 4" },
    { id: 5, nom: "Salle 5", proprietaire: "Propriétaire 5" },
    { id: 6, nom: "Salle 6", proprietaire: "Propriétaire 6" },
    { id: 7, nom: "Salle 7", proprietaire: "Propriétaire 7" },
  ];

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
        <Link href="/deconnexion" className="text-primary text-lg font-semibold hover:underline focus:outline-none focus:ring focus:ring-purple-300 px-4 py-2 rounded-md">Déconnexion</Link>
      </header>

      <div className="container mx-auto mt-8">
        <div className="md:flex justify-between">
          <div className="md:w-1/2 mb-4 md:mb-0">
            <Card className="py-4 bg-secondary-light">
              <CardBody className="overflow-visible py-2">
                <div className="flex items-center justify-center">
                  <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src="/assets/images/Logo.png"
                    width={270}
                    height={200}
                  />
                </div>
              </CardBody>
              <CardFooter className="pb-0 pt-2 px-4 flex-col items-center">
                <Link href="/administrateur/CreerSalle" className="text-default text-center text-primary">
                  Créer votre Salle SummerFit
                </Link>
              </CardFooter>
            </Card>
          </div>

          <div className="md:w-1/2">
            <div className="p-4 bg-white rounded shadow-md">
              <h2 className="text-xl font-semibold mb-4 text-center">Toutes les salles SummerFit</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Nom de la Salle</th>
                      <th className="px-4 py-2">Propriétaire</th>
                      <th className="px-4 py-2">Modifié</th>
                      <th className="px-4 py-2">Fréquentation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salleData.map((salle) => (
                      <tr key={salle.id}>
                        <td className="px-4 py-2 text-center">{salle.nom}</td>
                        <td className="px-4 py-2 text-center">{salle.proprietaire}</td>
                        <td className="px-4 py-2 text-center">
                          <Link href={`/modifierSalle/${salle.id}`}>Modifier</Link>
                        </td>
                        <td className="px-4 py-2 text-center">
                          <Link href={`/frequentationSalle/${salle.id}`}>Fréquentation</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
