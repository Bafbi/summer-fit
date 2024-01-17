
import React, { ReactElement} from "react";

import Map from "../_components/organisms/Map";

  
import { api } from "~/trpc/server";
import { getServerAuthSession } from "~/server/auth";




export default async function Home() {
    const session = await getServerAuthSession();



    return(
    <div className="h-screen">
      <header className="ml-10 mt-5 md:mt-20">
        <h1 className="text-3xl md:text-5xl font-bold">Bonjour {session?.user.name}</h1>
      </header>
      
        <main>
           
        </main>
    </div>
  )}