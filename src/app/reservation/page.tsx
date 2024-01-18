import { QRReservation } from "../_components/organisms/QR";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import Link from "next/link";
import Header from "../_components/organisms/Header";
import Footer from "../_components/organisms/Footer";
export default async function Home() {
  const session = await getServerAuthSession();
  const reservations = await api.reservation.getAll.query();

  return (
    <>
      <Header></Header>
      <div className="mb-5 mt-16 flex  min-h-screen flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-[#444] md:text-5xl ">
          Bonjour {session?.user.name}
        </h1>
        <h3 className="py-4 text-[#444]">Voici vos reservation</h3>

        <main className="w-full max-w-screen-md">
          {reservations.map((reservation) => (
            <div
              key={reservation.id}
              className=" m-4   transform rounded-lg bg-[#eeeff0] p-4 transition-transform hover:scale-105"
            >
              <h2 className="text-2xl font-semibold text-[#444]">
                Reservation à {reservation.salle.name} le{" "}
                {new Date(reservation.date).toLocaleDateString()} à {new Date(reservation.date).toLocaleTimeString()}
              </h2>
              <div className="ml-4 flex flex-row justify-between pr-8 p-2">
                <div>
                  <div className="mt-2 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="mr-2 h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    {reservation.salle.heure_fermeture}-
                    {reservation.salle.heure_fermeture}
                  </div>
                  <div className="mt-2 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="mr-2 h-6 w-6"
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
                <QRReservation reservationId={reservation.id} />
              </div>
            </div>
          ))}
        </main>
      </div>
      <Footer></Footer>
    </>
  );
}
