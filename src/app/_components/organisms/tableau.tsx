import Link from "next/link";
import React from "react";
import { type RouterOutputs } from "~/trpc/shared";
import { DeleteSalle } from "../api/delete-salle";

export default async function Tableau(props: { salles: RouterOutputs["halls"]["getAll"] }) {
  const { salles } = props;

  return (
    <div className="md:w-6/7 ml-auto mt-21"> {/* Utilisez md:w-5/6 pour définir la largeur à 83,33% */}
      <div className="p-4 bg-white rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center uppercase">
          Toutes les salles Summer Fit
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Nom de la Salle</th>
                <th className="px-4 py-2">Nombre Coach</th>
                {/* <th className="px-4 py-2">Modifier</th> */}
                <th className="px-4 py-2">Supprimer</th>
              </tr>
            </thead>
            <tbody>
              {salles.map((salle) => (
                <tr key={salle.id}>
                  <td className="px-4 py-2 text-center">{salle.name}</td>
                  <td className="px-4 py-2 text-center">
                    {salle.nbr_coach}
                  </td>
                  {/* <td className="px-4 py-2 text-center">
                    <Link href={`/administrateur/${salle.id}/modifier/`} className="underline">Modifier</Link>
                  </td> */}
                  <td className="px-4 py-2 text-center">
                    <DeleteSalle salleId={salle.id} >Supprimer</DeleteSalle>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
