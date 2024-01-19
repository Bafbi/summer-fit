"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

export function SetName(props: { username: string | null | undefined }) {

  const [name, setName] = useState<string>(props.username ?? '');

  const router = useRouter();

  const setNameApi = api.utilisateur.setName.useMutation({
    onSuccess: () => {
      router.replace("/");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setNameApi.mutate({ name });
      }}
      className="flex flex-col gap-2 bg-[#eeeff0] p-4 rounded-xl"
    >
        <label className="font-semibold">Ton nom</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="bg-[#cecdcd] w-full rounded-full px-4 py-2"
      />
      <button
        type="submit"
        className="btn bg-[#7945f7] text-white py-2 px-5 mt-3 rounded-md transition-transform duration-200 ease-in-out hover:bg-second-color active:scale-95"
        disabled={setNameApi.isLoading}
      >
        {setNameApi.isLoading ? "Envoie en cours..." : "Envoyer"}
      </button>
      <span className=" text-error">{setNameApi.isError ? setNameApi.error.message : null}</span>
    </form>
  );
}
