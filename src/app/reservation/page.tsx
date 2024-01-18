import { QRReservation } from "../_components/organisms/QR";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import Link from "next/link";

export default async function Home() {
  const session = await getServerAuthSession();
  const reservations = await api.reservation.getAll.query();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <header className="mb-10 text-center">
        <h1 className="text-3xl md:text-5xl font-bold">
          Bonjour {session?.user.name}
        </h1>
      </header>

      <main className="w-full max-w-screen-md">
        {reservations.map((reservation) => (
          <div
            key={reservation.id}
            className="bg-white rounded-lg shadow-md p-4 mb-4 flex items-center"
          >
            <QRReservation reservationId={reservation.id} />

            <div className="ml-4">
              <h2 className="text-2xl font-semibold text-primary">
                Reservation à {reservation.salle.name} le {new Date(reservation.date).toLocaleDateString()}
              </h2>

              <div className="flex items-center mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                {reservation.salle.heure_fermeture}-{reservation.salle.heure_fermeture}
              </div>
              <div className="flex items-center mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
                {reservation.salle.adresse}
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
