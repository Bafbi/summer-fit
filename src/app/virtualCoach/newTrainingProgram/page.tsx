import React, {useEffect, useState} from "react";
import {Input, Link} from "@nextui-org/react";
import "~/styles/virtualCoach/newTrainingProgram.css";

import coachImg from "../../../public/assets/images/coach.png";
import Header from "~/app/_components/organisms/Header";

export default async function App() {
  
  

  

  return (
    <>
     
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
