"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";






export function CreateSubscription(props: { salleId: string }) {
  const { salleId } = props;

  const router = useRouter();
  const [datetime, setDatetime] = useState<Date>(new Date());


  // Assurez-vous que le nom de la procédure tRPC est correct (par exemple, `subscriptionApi` au lieu de `api.suscription`)
  const createSubscription = api.suscription.createOne.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // Utilisez le nom correct de la procédure tRPC pour déclencher la mutation
        createSubscription.mutate({ salleId, datetime });
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="datetime-local"
        value={datetime.toISOString().slice(0, 16)}
        onChange={(e) => setDatetime(new Date(e.target.value))}
        className="bg-surface-variant w-full rounded-full px-4 py-2"
      />
      <button
        type="submit"
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createSubscription.isLoading}
      >
        {createSubscription.isLoading ? "Submitting..." : "Submit"}
      </button>
      <span className="text-error">
        {createSubscription.isError ? createSubscription.error.message : null}
      </span>
    </form>
  );
}
