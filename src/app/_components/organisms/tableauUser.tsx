'use client'

import Link from "next/link";
import React, { useState } from "react";
import { Card, CardFooter, CardBody } from "@nextui-org/react";
import Image from "next/image";
import { RouterOutputs } from "~/trpc/shared";
import { $Enums, User } from "@prisma/client";

import { api } from "~/trpc/server";

export default async function TableauUser(props: { users: RouterOutputs["user"]["getAllUser"] }) {
    const { users } = props;

    const setRole = api.user.setRole.mutate()
  
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
    );
  }