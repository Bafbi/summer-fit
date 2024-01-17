
import React, { ReactElement} from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Map from "../_components/organisms/Map";


import { api } from "~/trpc/server";






  export default async function Home() {
    const salles = await api.halls.getAll.query();


    return(
    <div className="h-screen">
      <header className="ml-10 mt-5 md:mt-20">
        <h1 className="text-3xl md:text-5xl font-bold">Où nous trouver !</h1>
      </header>
      
        <main>
            <Map salles={salles} />
        </main>
    </div>
  )}
  
