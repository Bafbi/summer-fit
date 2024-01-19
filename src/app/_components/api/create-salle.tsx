"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { number } from "zod";

import { api } from "~/trpc/react";


export function CreateSalle() {

    const router = useRouter();

    const createSalle = api.halls.createOne.useMutation({
        onSuccess: () => {
            router.replace("/administrateur");
        },
    });

    const [formData, setFormData] = useState({
        roomName: '',
        address: '',
        capacite: 0,
        longitude: 0,
        latitude: 0,
        coachCount: 0,
        phoneNumber: '',
        openingHour: '',
        closingHour: '',
        machineName: '',
        machineCount: '1',
        machines: [],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddMachine = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const newMachine = {
            name: formData.machineName,
            count: formData.machineCount
        };
        setFormData({
            ...formData,
            machines: [...formData.machines, newMachine],
            machineName: '',
            machineCount: '1',
        });
    };


    return (
        <form className="flex flex-col gap-3 max-w-md mx-auto p-6 rounded-md shadow-md bg-[#eeeff0]" onSubmit={(e) => {
            e.preventDefault();
            createSalle.mutate({
                images: [],
                name: formData.roomName,
                adresse: formData.address,
                capacite: +formData.capacite,
                nbr_coach: +formData.coachCount,
                num_tel: formData.phoneNumber,
                heure_ouverture: [7].map(() => {
                    return formData.openingHour
                }),
                heure_fermeture: [7].map(() => {
                    return formData.closingHour
                }),
                latitude: +formData.latitude,
                longitude: +formData.longitude,
                machines: formData.machines

            })
        }}>
            <h2 className="text-center text-2xl font-bold mb-5 uppercase text-[#7945f7]">Créer votre Salle</h2>
            <input className="p-2 border-2 border-[#7945f7] rounded" type="text" name="roomName" placeholder="Nom de la Salle" onChange={handleChange} />
            <input className="p-2 border-2 border-[#7945f7] rounded" type="text" name="address" placeholder="Adresse" onChange={handleChange} />
            <input className="p-2 border-2 border-[#7945f7] rounded" type="number" name="capacite" placeholder="Capacite" onChange={handleChange} />
            <input className="p-2 border-2 border-[#7945f7] rounded" type="number" name="longitude" placeholder="Longitude" onChange={handleChange} />
            <input className="p-2 border-2 border-[#7945f7] rounded" type="number" name="latitude" placeholder="Latitude" onChange={handleChange} />
            <input className="p-2 border-2 border-[#7945f7] rounded" type="number" name="coachCount" placeholder="Nombre de coachs" onChange={handleChange} />
            <input className="p-2 border-2 border-[#7945f7] rounded" type="tel" name="phoneNumber" placeholder="Numéro de téléphone" onChange={handleChange} />
            <input className="p-2 border-2 border-[#7945f7] rounded" type="time" name="openingHour" placeholder="Heure d'ouverture" onChange={handleChange} />
            <input className="p-2 border-2 border-[#7945f7] rounded" type="time" name="closingHour" placeholder="Heure de fermeture" onChange={handleChange} />
            <div className="flex gap-3">
                <input
                    className="p-2 border-2 border-[#7945f7] rounded flex-grow"
                    type="text"
                    name="machineName"
                    placeholder="Nom machine"
                    value={formData.machineName}
                    onChange={handleChange}
                />
                <select
                    className="p-2 border-2 border-[#7945f7] rounded"
                    name="machineCount"
                    onChange={handleChange}
                    value={formData.machineCount}
                >
                    {Array.from({ length: 15 }, (_, i) => i + 1).map(value => (
                        <option key={value} value={value}>{value}</option>
                    ))}
                </select>
                <button className="px-4 py-2 border-2 border-[#7945f7] rounded-md bg-blue-500 text-black hover:bg-blue-600" onClick={handleAddMachine}>Ajouter</button>
            </div>
            <table className="w-full mt-4 border-collapse">
                <thead>
                    <tr>
                        <th className="border-2 border-[#7945f7] p-2 text-left">Nom Machine</th>
                        <th className="border-2 border-[#7945f7] p-2 text-left">Nombre Machine</th>
                    </tr>
                </thead>
                <tbody>
                    {formData.machines.map((machine, index) => (
                        <tr key={index}>
                            <td className="border-2 border-[#7945f7] p-2">{machine.name}</td>
                            <td className="border-2 border-[#7945f7] p-2">{machine.count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="px-4 py-2 mt-3 border-2 border-[#7945f7] rounded-md bg-blue-500 text-black hover:bg-blue-600" type="submit" id="button">Envoyer</button>
        </form>
    );
}
