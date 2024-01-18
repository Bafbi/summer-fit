"use client";

import { $Enums } from "@prisma/client";
import { redirect, useRouter } from "next/navigation";
import { Children, useState } from "react";

import { api } from "~/trpc/react";

export function AbonneBouton({
  children,
  ...props
}: {
  children: React.ReactNode;
  plan: $Enums.Abonnement;
}) {
  const { plan } = props;
  const router = useRouter();
  const abonne = api.abonnement.purchaseSubscription.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <button
      onClick={() => abonne.mutate({ plan })}
      className="bg-[#7945f7] text-white my-4 px-8 py-2 rounded-lg transition-transform transform hover:bg-[#ad57f9] active:scale-95"
    >
      {abonne.isLoading ? <span>aa</span> : <div>{children}</div>}
    </button>
  );
}
