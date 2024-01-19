import React from "react";
import {Input, Link} from "@nextui-org/react";
import "~/styles/virtualCoach/virtualCoach_MainPage.css";

import coachImg from "../../../public/assets/images/coach.png";
import { getServerAuthSession } from "~/server/auth";
import Header from "../_components/organisms/Header";
import { redirect } from "next/navigation";

export default async function App() {
const session = await getServerAuthSession()
if (session?.user.abonnement == "ARGENT" || session?.user.abonnement == "BRONZE" ){
    redirect("/redirection")
}

if (!session ){
    redirect("/redirectionAbo")
}
  return (
    <>
        <Header user = {session?.user}/>
    
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
