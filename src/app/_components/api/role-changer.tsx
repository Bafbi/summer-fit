"use client";

import { $Enums, type User } from "@prisma/client";
import {  useState } from "react";

import { api } from "~/trpc/react";

export function RoleChanger(props: { user: User }) {
  const { user } = props;

  const setRoleApi = api.utilisateur.setRole.useMutation({});

  const [role, setRole] = useState<User["role"]>(user.role);

  return (
    <select
      value={role}
      onChange={(e) => {
        setRole(e.target.value as User["role"]);
        setRoleApi.mutate({ userId: user.id, role: e.target.value as User["role"] });
      }}
    >
      {Object.keys($Enums.Role).map((role) => (
        <option key={role} value={role}>
          {role}
        </option>
      ))}
    </select>
  );
}
