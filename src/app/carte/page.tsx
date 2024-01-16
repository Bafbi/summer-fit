
import React, { ReactElement} from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Map from "../_components/organisms/Map";

import { env } from "~/env";
import { api } from "~/trpc/server";
import dynamic from "next/dynamic";





  export default async function Home() {
    const salles = await api.halls.getAll.query();


    return(
    <div className="h-screen">
      <header className="ml-10 mt-5 md:mt-20">
        <h1 className="text-3xl md:text-5xl font-bold">Nous trouver</h1>
      </header>
      
        <main>
            <Map />
        </main>
    </div>
  )}
  
