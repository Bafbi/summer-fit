"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

export function CreateReservation(props: { salleId: string }) {
  const { salleId } = props;

  const router = useRouter();
  const [datetime, setDatetime] = useState<Date>(new Date());

  const createReservation = api.reservation.createOne.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createReservation.mutate({ salleId, datetime });
      }}
      className="flex flex-col gap-2 bg-secondary p-4 rounded-xl"
    >
        <label className="font-semibold">Date et heure</label>
      <input
        type="datetime-local"
        value={datetime.toISOString().slice(0, 16)}
        onChange={(e) => setDatetime(new Date(e.target.value))}
        className="bg-surface-variant w-full rounded-full px-4 py-2"
      />
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createReservation.isLoading}
      >
        {createReservation.isLoading ? "Submitting..." : "Submit"}
      </button>
      <span className=" text-error">{createReservation.isError ? createReservation.error.message : null}</span>
    </form>
  );
}
