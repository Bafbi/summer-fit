/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import React from "react";
import { RoleChanger } from "../api/role-changer";
import { type User } from "@prisma/client";


export default async function Tableau(props: { users: User[] }) {
  const { users } = props;

  return (
    <div className="md:w-6/7 ml-auto mt-21"> 
    <div className="p-4 bg-white rounded shadow-md">
    <h2 className="text-xl font-semibold mb-4 text-center uppercase">
      Toutes les salles Summer Fit
    </h2>
    
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Nom de l'utilisateur</th>
            <th className="px-4 py-2">Rôle</th>
            <th className="px-4 py-2">Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-4 py-2 text-center">{user.name}</td>
              <td className="px-4 py-2 text-center">
                <RoleChanger user={user} />
              </td>
              <td className="px-4 py-2 text-center">
                <Link href = '/administrateur/'className="underline">Supprimer</Link>
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



/*
<div className="md:w-6/7 ml-auto mt-21"> 
<div className="p-4 bg-white rounded shadow-md">
<h2 className="text-xl font-semibold mb-4 text-center uppercase">
  Toutes les salles Summer Fit
</h2>

<div className="overflow-x-auto">
  <table className="w-full">
    <thead>
      <tr>
        <th className="px-4 py-2">Nom de l'utilisateur</th>
        <th className="px-4 py-2">Rôle</th>
        <th className="px-4 py-2">Supprimer</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user) => (
        <tr key={user.id}>
          <td className="px-4 py-2 text-center">{user.name}</td>
          <td className="px-4 py-2 text-center">
              <select value={user.role}>
                  {
                      Object.keys($Enums.Role).map(role => (<option value={role}>{role}</option>))
                  }
              </select>

          </td>
          <td className="px-4 py-2 text-center">
            <Link href = '/administrateur/'className="underline">Supprimer</Link>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
</div>
</div>
*/