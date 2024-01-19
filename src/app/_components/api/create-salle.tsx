"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";
import { RouterInputs } from "~/trpc/shared";

export function CreateSalle() {
  const router = useRouter();

  const createSalle = api.halls.createOne.useMutation({
    onSuccess: () => {
      router.replace("/administrateur");
    },
  });

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [capacite, setCapacite] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [coachCount, setCoachCount] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [openingHour, setOpeningHour] = useState("");
  const [closingHour, setClosingHour] = useState("");
  const [machineName, setMachineName] = useState("");
  const [machineCount, setMachineCount] = useState(1);
  const [machines, setMachines] = useState<
    { name: string; nbr_machine: number }[]
  >([]);

  return (
    <form
      className="mx-auto flex max-w-md flex-col gap-3 rounded-md bg-[#eeeff0] p-6 shadow-md"
      onSubmit={(e) => {
        e.preventDefault();
        const salle: RouterInputs["halls"]["createOne"] = {
          images: [],
          name: name,
          adresse: address,
          capacite: capacite,
          nbr_coach: coachCount,
          num_tel: phoneNumber,
          heure_ouverture: [7].map(() => {
            return openingHour;
          }),
          heure_fermeture: [7].map(() => {
            return closingHour;
          }),
          latitude: latitude,
          longitude: longitude,
          machines: machines,
        };

        createSalle.mutate(salle);
      }}
    >
      <h2 className="mb-5 text-center text-2xl font-bold uppercase text-[#7945f7]">
        Créer votre Salle
      </h2>
      <input
        className="rounded border-2 border-[#7945f7] p-2"
        type="text"
        name="roomName"
        placeholder="Nom de la Salle"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        className="rounded border-2 border-[#7945f7] p-2"
        type="text"
        name="address"
        placeholder="Adresse"
        onChange={(e) => {
          setAddress(e.target.value);
        }}
      />
      <input
        className="rounded border-2 border-[#7945f7] p-2"
        type="number"
        name="capacite"
        placeholder="Capacite"
        onChange={(e) => {
          setCapacite(parseInt(e.target.value));
        }}
      />
      <input
        className="rounded border-2 border-[#7945f7] p-2"
        type="number"
        name="longitude"
        placeholder="Longitude"
        onChange={(e) => {
          setLongitude(parseInt(e.target.value));
        }}
      />
      <input
        className="rounded border-2 border-[#7945f7] p-2"
        type="number"
        name="latitude"
        placeholder="Latitude"
        onChange={(e) => {
          setLatitude(parseInt(e.target.value));
        }}
      />
      <input
        className="rounded border-2 border-[#7945f7] p-2"
        type="number"
        name="coachCount"
        placeholder="Nombre de coachs"
        onChange={(e) => {
          setCoachCount(parseInt(e.target.value));
        }}
      />
      <input
        className="rounded border-2 border-[#7945f7] p-2"
        type="tel"
        name="phoneNumber"
        placeholder="Numéro de téléphone"
        onChange={(e) => {
          setPhoneNumber(e.target.value);
        }}
      />
      <input
        className="rounded border-2 border-[#7945f7] p-2"
        type="time"
        name="openingHour"
        placeholder="Heure d'ouverture"
        onChange={(e) => {
          setOpeningHour(e.target.value);
        }}
      />
      <input
        className="rounded border-2 border-[#7945f7] p-2"
        type="time"
        name="closingHour"
        placeholder="Heure de fermeture"
        onChange={(e) => {
          setClosingHour(e.target.value);
        }}
      />
      <div className="flex gap-3">
        <input
          className="flex-grow rounded border-2 border-[#7945f7] p-2"
          type="text"
          name="machineName"
          placeholder="Nom machine"
          value={machineName}
          onChange={(e) => {
            setMachineName(e.target.value);
          }}
        />
        <select
          className="rounded border-2 border-[#7945f7] p-2"
          name="machineCount"
          onChange={(e) => {
            setMachineCount(parseInt(e.target.value));
          }}
          value={machineCount}
        >
          {Array.from({ length: 15 }, (_, i) => i + 1).map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-600 rounded-md border-2 border-[#7945f7] px-4 py-2 text-black"
          onClick={() => {
            if (!machineName) return;
            if (machineCount <= 0) return;
            setMachines([
              ...machines,
              { name: machineName, nbr_machine: machineCount },
            ]);
            setMachineName("");
            setMachineCount(1);
          }}
        >
          Ajouter
        </button>
      </div>
      <table className="mt-4 w-full border-collapse">
        <thead>
          <tr>
            <th className="border-2 border-[#7945f7] p-2 text-left">
              Nom Machine
            </th>
            <th className="border-2 border-[#7945f7] p-2 text-left">
              Nombre Machine
            </th>
          </tr>
        </thead>
        <tbody>
          {machines.map((machine, index) => (
            <tr key={index}>
              <td className="border-2 border-[#7945f7] p-2">{machine.name}</td>
              <td className="border-2 border-[#7945f7] p-2">
                {machine.nbr_machine}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="bg-blue-500 hover:bg-blue-600 mt-3 rounded-md border-2 border-[#7945f7] px-4 py-2 text-black"
        type="submit"
        id="button"
      >
        Envoyer
      </button>
    </form>
  );
}
