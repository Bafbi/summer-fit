"use client";

import {  useRouter } from "next/navigation";

import { api } from "~/trpc/react";

export function DeleteSalle({
    children,
    ...props
  }: {
    children: React.ReactNode;
    salleId: string;
  }) {

    const router = useRouter();


  const deleteSalle = api.halls.deleteOneById.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <button onClick={() => deleteSalle.mutate({ salleId: props.salleId  })} className="rounded-full bg-surface-variant px-10 py-3 font-semibold transition hover:bg-secondary">
        {children}
    </button>
  );
}

