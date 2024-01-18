"use client";

import { redirect, useRouter } from "next/navigation";
import { Children, useState } from "react";

import { api } from "~/trpc/react";

export function DeleteReservation({
    children,
    ...props
  }: {
    children: React.ReactNode;
    reservationId: string;
  }) {


  const deleteReservation = api.reservation.deleteOne.useMutation({
    onSuccess: () => {
      redirect("/");
    },
  });

  return (
    <button onClick={() => deleteReservation.mutate({ id: props.reservationId  })} className="rounded-full bg-surface-variant px-10 py-3 font-semibold transition hover:bg-secondary">
        {children}
    </button>
  );
}

