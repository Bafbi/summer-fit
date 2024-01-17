
import React, { useEffect, useState } from "react";
import QRCode from "qrcode.react";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";



export async function Home() {
    const session = await getServerAuthSession();
   


  return (
    <div className="h-screen">
      <header className="ml-10 mt-5 md:mt-20">
        <h1 className="text-3xl md:text-5xl font-bold">Bonjour {session?.user.name}</h1>
      </header>
      
      <main>
        {reservations.map((reservation, index) => (
          <div key={index}>
            {/* Supposons que chaque réservation a un identifiant unique */}
            <QRCode value={reservation.id} />
          </div>
        ))}
      </main>
    </div>
  );
}

   

    