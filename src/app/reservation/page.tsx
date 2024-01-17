

import { QRReservation } from "../_components/organisms/QR";

import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
  const session = await getServerAuthSession();
  const reservations = await api.reservation.getAll.query();

  return (
    <div className="h-screen">
      <header className="ml-10 mt-5 md:mt-20">
        <h1 className="text-3xl font-bold md:text-5xl">
          Bonjour {session?.user.name}
        </h1>
      </header>

      <main>
        {reservations.map((reservation) => (
          <div key={reservation.id}>
            <span className="text-primary">{reservation.salle.name}</span>

            {/* Supposons que chaque réservation a un identifiant unique */}
            <QRReservation reservationId={reservation.id} />
          </div>
        ))}
      </main>
    </div>
  );
}
