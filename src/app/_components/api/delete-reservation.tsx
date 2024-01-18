"use client";

import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

export function DeleteReservation(props: { reservationId: string}) {


  const deleteReservation = api.reservation.deleteOne.useMutation({
    onSuccess: () => {
      redirect("/");
    },
  });

  return (
    <button onClick={() => deleteReservation.mutate({ id: props.reservationId  })} className="rounded-full bg-error px-10 py-3 font-semibold transition hover:bg-primary">
        Supprimer la réservation
    </button>
  );
}

