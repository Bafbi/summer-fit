import { permanentRedirect } from "next/navigation";
import { DeleteReservation } from "~/app/_components/api/delete-reservation";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Page({
  params,
}: {
  params: { reservationId: string; userId: string };
}) {

  const session = await getServerAuthSession();

  if (!session || session.user.role === "USER" ) {
    permanentRedirect("/");
  }

  let reservation;
  try {
    reservation = await api.reservation.getOne.query(
      { id: params.reservationId }
    );
  } catch (error) {
    reservation = null;
  }

  if (!reservation) {
    return (
      // reservation incunnu
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-3xl font-semibold">Réservation Inconnue</h1>
      </div>
    )
  }


  return (
    <div className="flex flex-col gap-4 items-center">
      <h1 className="text-3xl font-semibold">Réservation</h1>
      <div className="flex flex-col gap-4 items-center">
        <div className="flex flex-col gap-2 bg-secondary p-4 rounded-xl">
          <label className="font-semibold">Salle</label>
          <input
            type="text"
            value={reservation?.salle.name}
            readOnly
            className="bg-surface-variant w-full rounded-full px-4 py-2"
          />
        </div>
        <div className="flex flex-col gap-2 bg-secondary p-4 rounded-xl">
          <label className="font-semibold">Utilisateur</label>
          <input
            type="text"
            value={reservation?.user.name ?? "Utilisateur inconnu"}
            readOnly
            className="bg-surface-variant w-full rounded-full px-4 py-2"
          />
        </div>
        <div className="flex flex-col gap-2 bg-secondary p-4 rounded-xl">
          <label className="font-semibold">Date et heure</label>
          <input
            type="datetime-local"
            value={reservation?.date.toISOString().slice(0, 16)}
            readOnly
            className="bg-surface-variant w-full rounded-full px-4 py-2"
          />
        </div>
        <DeleteReservation reservationId={params.reservationId} >
          Valider la reservation
        </DeleteReservation>
      </div>
    </div>
  );
}
