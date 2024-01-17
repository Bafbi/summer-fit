`use client`

import * as React from "react";
import Input from "../atoms/Input";

export default function FormAddHalls() {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
        <Input variant="flat" type="text" label="Nom de la salle"></Input>
        <Input variant="bordered" type="text" label="Adresse de la salle"></Input>
        <Input variant="underlined" type="text" label="Capacité de la salle"></Input>
        <Input variant="faded" type="text" label="test"></Input>
      </div>
    </div>
  );
};