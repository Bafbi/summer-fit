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

  let valide = false;
  try {
    valide = await api.reservation.validateOne.mutate(
      { reservationId: params.reservationId, userId: params.userId },
      {},
    );
  } catch (error) {
    valide = false;
  }


  return (
    <div className="flex flex-col gap-4 items-center">
      <span className="text-2xl font-semibold">
        {valide ? "Reservation valide" : "Reservation non valide"}
      </span>
      {valide ? <DeleteReservation reservationId={params.reservationId} /> : null}
    </div>
  );
}
