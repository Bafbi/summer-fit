import { QRReservation } from "../_components/organisms/QR";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import Link from "next/link";
import Header from "../_components/organisms/Header";
import Footer from "../_components/organisms/Footer";
import "~/styles/reservation.css"; // Import your CSS file

import { redirect } from "next/navigation";
export default async function Home() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/redirection");
  }

  const reservations = await api.reservation.getAll.query();

  return (
    <>
      <Header user={session?.user}></Header>
      <div className="image-container">
        <div className="overlay-text">MES Réservations</div>
      </div>
      <div className=" items-center justify-center ">
        <h3 className="px-[8%] pt-8 text-2xl font-black uppercase text-[#444]">
          Bonjour {session?.user.name} 💪​, voici vos réservations
        </h3>

        <main className="w-full max-w-screen-md ">
          {reservations.map((reservation) => (
            <div
              key={reservation.id}
              className=" m-4  mx-[13%]  flex rounded-lg bg-[#eeeff0] p-4"
            >
              <div className="">
                <h2 className="text-2xl font-semibold text-[#7945f7]">
                  Reservation à {reservation.salle.name}
                </h2>
                <h2 className="text-lg  font-semibold text-[#444]">
                  {new Date(reservation.date).toLocaleDateString()} à{" "}
                  {new Date(reservation.date).toLocaleTimeString()}
                </h2>
                <div className=" mt-2 flex flex-row justify-between pr-8">
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
                  </div>
              </div>
                  <div className="ml-20">
                    <QRReservation
                      reservationId={reservation.id}
                      userId={session.user.id}
                    />
                  </div>
            </div>
          ))}
        </main>
      </div>
      <span className="text-[#fff]">
        {" "}
        . <br />. <br />. <br />. <br />. <br />. <br />. <br />. <br />. <br />
        . <br />. <br />. <br />. <br />. <br />
      </span>
      <Footer></Footer>
    </>
  );
}
