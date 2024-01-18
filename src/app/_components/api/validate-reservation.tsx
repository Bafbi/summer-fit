"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

export function ValidateReservation() {
  const [reservationId, setReservationId] = useState<string>(
    "65a7d6574d6feeda2a6c57b6",
  );
  const [userId, setUserId] = useState<string>("65a5557fba98ac8fcaddbf2c");
  const [valide, setValide] = useState<boolean>(false);

  const validateReservation = api.reservation.validateOne.useMutation({
    onSuccess: () => {
      setValide(true);
    },
    onError: () => {
      setValide(false);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        validateReservation.mutate({ reservationId, userId });
      }}
      className="flex flex-col gap-2 rounded-xl bg-secondary p-4"
    >
      <label className="font-semibold">Reservation Id</label>
      <input
        type="text"
        value={reservationId}
        onChange={(e) => setReservationId(e.target.value)}
        className="bg-surface-variant w-full rounded-full px-4 py-2"
      />
      <label className="font-semibold">User Id</label>
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="bg-surface-variant w-full rounded-full px-4 py-2"
      />
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={validateReservation.isLoading}
      >
        {validateReservation.isLoading ? "Submitting..." : "Submit"}
      </button>
      <span className=" text-error">
        {validateReservation.isError ? validateReservation.error.message : null}
      </span>
      {valide ? (
        <span className="text-success">Reservation validée</span>
      ) : (
        <span className="text-error">Reservation non validée</span>
      )}
    </form>
  );
}
