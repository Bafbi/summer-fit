import React, {useEffect, useState} from "react";
import { api } from "~/trpc/server";
import { RequestChatGpt } from "~/app/_components/api/requestChatGpt";

export default function App() {
  
  

  

  return (
    <>
        <header>
        
        </header>
        <main>
            <div className="wrapper">
                <h1>Bonne nouvelle !</h1>
                <h2>Vous n'avez jamais été aussi proche du <span>SUMMER FIT</span>...</h2>
                <h3>Veuillez répondre à ces quelques questions pour nous aider à réaliser votre programme sportif...</h3>
                
                <RequestChatGpt></RequestChatGpt>
            </div>
        </main>
    </>
  );
}
