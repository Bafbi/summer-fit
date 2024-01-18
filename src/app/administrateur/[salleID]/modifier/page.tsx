"use client"
  import React, { useState } from "react";
  import Link from "next/link";
  import { getServerAuthSession } from "~/server/auth";
  import { api } from "~/trpc/server";

  const RegistrationForm = () => {
    const [formData, setFormData] = useState({
      roomName: '',
      address: '',
      longitude: '',
      latitude: '',
      coachCount: '',
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
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(formData);
      // Insert here the logic to send the data to a server or handle it as needed
    };
  
    return (
      <div className="relative">
      {/* Bouton de retour - choisir entre l'option Link ou button */}
      <form className="flex flex-col gap-3 max-w-md mx-auto p-6 rounded-md shadow-md bg-white" onSubmit={handleSubmit}>
      <Link href="../" className="text-sm text-blue-600 hover:text-blue-800 mr-3"> Retour </Link>
        <h2 className="text-center text-2xl font-semibold mb-5">Créer votre Salle</h2>
        <input className="p-2 border border-gray-300 rounded" type="text" name="roomName" placeholder="Nom de la Salle" onChange={handleChange} />
        <input className="p-2 border border-gray-300 rounded" type="text" name="address" placeholder="Adresse" onChange={handleChange} />
        <input className="p-2 border border-gray-300 rounded" type="text" name="longitude" placeholder="Longitude" onChange={handleChange} />
        <input className="p-2 border border-gray-300 rounded" type="text" name="latitude" placeholder="Latitude" onChange={handleChange} />
        <input className="p-2 border border-gray-300 rounded" type="number" name="coachCount" placeholder="Nombre de coachs" onChange={handleChange} />
        <input className="p-2 border border-gray-300 rounded" type="tel" name="phoneNumber" placeholder="Numéro de téléphone" onChange={handleChange} />
        <input className="p-2 border border-gray-300 rounded" type="time" name="openingHour" placeholder="Heure d'ouverture" onChange={handleChange} />
        <input className="p-2 border border-gray-300 rounded" type="time" name="closingHour" placeholder="Heure de fermeture" onChange={handleChange} />
        <div className="flex gap-3">
          <input
            className="p-2 border border-gray-300 rounded flex-grow"
            type="text"
            name="machineName"
            placeholder="Nom machine"
            value={formData.machineName}
            onChange={handleChange}
          />
          <select
            className="p-2 border border-gray-300 rounded"
            name="machineCount"
            onChange={handleChange}
            value={formData.machineCount}
          >
            {Array.from({ length: 15 }, (_, i) => i + 1).map(value => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
          <button className="px-4 py-2 border border-black rounded-md bg-blue-500 text-black hover:bg-blue-600" onClick={handleAddMachine}>Ajouter</button>
        </div>
        <table className="w-full mt-4 border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 text-left">Nom Machine</th>
              <th className="border border-gray-300 p-2 text-left">Nombre Machine</th>
            </tr>
          </thead>
          <tbody>
            {formData.machines.map((machine, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{machine.name}</td>
                <td className="border border-gray-300 p-2">{machine.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="px-4 py-2 mt-3 border border-black rounded-md bg-blue-500 text-black hover:bg-blue-600" type="submit">Envoyer</button>
      </form>
    </div>

    );
  };
  
  export default RegistrationForm;