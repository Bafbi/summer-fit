import React from "react";
import {Input, Link} from "@nextui-org/react";

import coachImg from "../../../public/assets/images/coach.png";

export default function App() {

  return (
    <>
        <header>
        
        </header>
    
        <main>
            <div className="wrapper">
                <div className="containerText">
                    <h1>Vous n'avez pas encore de programme sportif !</h1>
                    <h2>N'attendez plus pour commencer l'entrainement avec notre coach virtuel...</h2>
                    <Link href="virtualCoach/newTrainingProgram"  className="createButton">Créer un programme</Link>
                </div>
             
                <div className="containerImgBtn">
                    <img src={coachImg.src} alt="Illustration d'un coach de sport" />
                </div>
            </div>
        </main>
    </>
  );
}
