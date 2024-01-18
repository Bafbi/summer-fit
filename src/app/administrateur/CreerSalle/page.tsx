  import React, { useState } from "react";
  import Link from "next/link";
  import { getServerAuthSession } from "~/server/auth";
  import { api } from "~/trpc/server";
import { CreateSalle } from "~/app/_components/api/create-salle";

  const RegistrationForm = () => {



  
  
    return (
        <>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css" />
     
      <div className="relative">
      <Link href="../administrateur" className="text-sm text-blue-600 hover:text-blue-800 mr-3 font-bold">
  <i className="bx bx-arrow-back text-[30px] p-5 "></i>
</Link>
      {/* Bouton de retour - choisir entre l'option Link ou button */}
      <CreateSalle />
    </div>
</>
    );
  };
  
  export default RegistrationForm;