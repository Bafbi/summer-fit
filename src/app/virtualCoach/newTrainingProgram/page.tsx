"use client";
import React, {useEffect, useState} from "react";
import {Input, Link} from "@nextui-org/react";

import coachImg from "../../../public/assets/images/coach.png";

export default function App() {
  
  useEffect(() => {
    let toggle_box1 = document.querySelector(".toggle_box1") as HTMLElement;
    let circle1 = document.querySelector(".circle1") as HTMLElement;
    let checkbox1 = document.getElementById("sante") as HTMLInputElement;

    let toggle_box2 = document.querySelector(".toggle_box2") as HTMLElement;
    let circle2 = document.querySelector(".circle2") as HTMLElement;
    let checkbox2 = document.getElementById("blesse") as HTMLInputElement;

    toggle_box1.onclick = function () {
      if (checkbox1.checked) {
        circle1.style.transform = "translateX(25px)";
        toggle_box1.style.backgroundColor = "#ad57f9";
      } else {
        circle1.style.transform = "translateX(0px)";
        toggle_box1.style.backgroundColor = "#d2d2d2";
      }
    };

    toggle_box2.onclick = function () {
      if (checkbox2.checked) {
        circle2.style.transform = "translateX(25px)";
        toggle_box2.style.backgroundColor = "#ad57f9";
      } else {
        circle2.style.transform = "translateX(0px)";
        toggle_box2.style.backgroundColor = "#d2d2d2";
      }
    };
  }, []); // Le tableau vide [] signifie que cet effet s'exécutera une seule fois après le rendu initial.
      

  //Logique d'affichage des questions optionnelles

  // État pour stocker la valeur de la checkbox "sante"
  const [santeChecked, setSanteChecked] = useState(false);
  const [blesseChecked, setBlesseChecked] = useState(false);

  const handleSanteCheckboxChange = () => {
    // Mettez à jour l'état avec la nouvelle valeur de la checkbox
    const newSanteChecked = !santeChecked;
    setSanteChecked(newSanteChecked);
  };

  const handleBlesseCheckboxChange = () => {
    // Mettez à jour l'état avec la nouvelle valeur de la checkbox
    const newBlesseChecked = !blesseChecked;
    setBlesseChecked(newBlesseChecked);
  }



  return (
    <>
        <header>
        
        </header>
        <main>
            <div className="wrapper">
                <h1>Bonne nouvelle !</h1>
                <h2>Vous n'avez jamais été aussi proche du <span>SUMMER FIT</span>...</h2>
                <h3>Veuillez répondre à ces quelques questions pour nous aider à réaliser votre programme sportif...</h3>
                
                <form>
                  <div className="container-radio">
                      <p>Comment évaluer vous votre condition physique actuelle ? (1 : très mauvaise, 10 : excellente)</p>
                      <div className="radio-tile-group">
                
                        <div className="input-container little-input-container">
                          <input id="1" type="radio" name="question2"/>
                          <div className="radio-tile">
                            <label htmlFor="1">1</label>
                          </div>
                        </div>
                
                        <div className="input-container little-input-container">
                          <input id="2" type="radio" name="question2"/>
                          <div className="radio-tile">
                            <label htmlFor="2">2</label>
                          </div>
                        </div>
                
                        <div className="input-container little-input-container">
                          <input id="3" type="radio" name="question2"/>
                          <div className="radio-tile">
                            <label htmlFor="3">3</label>
                          </div>
                        </div>
                
                        <div className="input-container little-input-container">
                          <input id="4" type="radio" name="question2"/>
                          <div className="radio-tile">
                            <label htmlFor="4">4</label>
                          </div>
                        </div>
    
                        <div className="input-container little-input-container">
                          <input id="5" type="radio" name="question2"/>
                          <div className="radio-tile">
                            <label htmlFor="5">5</label>
                          </div>
                        </div>
                
                        <div className="input-container little-input-container">
                          <input id="6" type="radio" name="question2"/>
                          <div className="radio-tile">
                            <label htmlFor="6">6</label>
                          </div>
                        </div>
                
                        <div className="input-container little-input-container">
                          <input id="7" type="radio" name="question2"/>
                          <div className="radio-tile">
                            <label htmlFor="7">7</label>
                          </div>
                        </div>
                
                        <div className="input-container little-input-container">
                          <input id="8" type="radio" name="question2"/>
                          <div className="radio-tile">
                            <label htmlFor="8">8</label>
                          </div>
                        </div>
    
                        <div className="input-container little-input-container">
                          <input id="9" type="radio" name="question2"/>
                          <div className="radio-tile">
                            <label htmlFor="9">9</label>
                          </div>
                        </div>
                
                        <div className="input-container little-input-container">
                          <input id="10" type="radio" name="question2"/>
                          <div className="radio-tile">
                            <label htmlFor="10">10</label>
                          </div>
                        </div>
    
                      </div>
                    </div>
    
    
                   
    
                    <div className="container-radio">
                      <p>Quels jours souhaitez-vous vous entraîner ?</p>
                      <div className="radio-tile-group">
                
                        <div className="input-container big-input-container">
                          <input id="lundi" type="checkbox" name="question3"/>
                          <div className="radio-tile">
                            <label htmlFor="lundi">Lundi</label>
                          </div>
                        </div>
                
                        <div className="input-container big-input-container"> 
                          <input id="mardi" type="checkbox" name="question3"/>
                          <div className="radio-tile">
                            <label htmlFor="mardi">Mardi</label>
                          </div>
                        </div>
                
                        <div className="input-container big-input-container">
                          <input id="mercredi" type="checkbox" name="question3"/>
                          <div className="radio-tile">
                            <label htmlFor="mercredi">Mercredi</label>
                          </div>
                        </div>
    
                        <div className="input-container big-input-container">
                          <input id="jeudi" type="checkbox" name="question3"/>
                          <div className="radio-tile">
                            <label htmlFor="jeudi">Jeudi</label>
                          </div>
                        </div>
                
                        <div className="input-container big-input-container">
                          <input id="vendredi" type="checkbox" name="question3"/>
                          <div className="radio-tile">
                            <label htmlFor="vendredi">Vendredi</label>
                          </div>
                        </div>
                
                        <div className="input-container big-input-container">
                          <input id="samedi" type="checkbox" name="question3"/>
                          <div className="radio-tile">
                            <label htmlFor="samedi">Samedi</label>
                          </div>
                        </div>
    
                        <div className="input-container big-input-container">
                          <input id="dimanche" type="checkbox" name="question3"/>
                          <div className="radio-tile">
                            <label htmlFor="dimanche">Dimanche</label>
                          </div>
                        </div>
                      </div>
                    </div>
    
    
                  
                   
    
                    <div className="container-radio">
                      <p>Comment évaluer vous votre niveau de motivation ? (1 : très mauvais, 10 : excellent)</p>
                      <div className="radio-tile-group">
                
                        <div className="input-container little-input-container">
                          <input id="1" type="radio" name="question4"/>
                          <div className="radio-tile">
                            <label htmlFor="1">1</label>
                          </div>
                        </div>
                
                        <div className="input-container little-input-container">
                          <input id="2" type="radio" name="question4"/>
                          <div className="radio-tile">
                            <label htmlFor="2">2</label>
                          </div>
                        </div>
                
                        <div className="input-container little-input-container">
                          <input id="3" type="radio" name="question4"/>
                          <div className="radio-tile">
                            <label htmlFor="3">3</label>
                          </div>
                        </div>
                
                        <div className="input-container little-input-container">
                          <input id="4" type="radio" name="question4"/>
                          <div className="radio-tile">
                            <label htmlFor="4">4</label>
                          </div>
                        </div>
    
                        <div className="input-container little-input-container">
                          <input id="5" type="radio" name="question4"/>
                          <div className="radio-tile">
                            <label htmlFor="5">5</label>
                          </div>
                        </div>
                
                        <div className="input-container little-input-container">
                          <input id="6" type="radio" name="question4"/>
                          <div className="radio-tile">
                            <label htmlFor="6">6</label>
                          </div>
                        </div>
                
                        <div className="input-container little-input-container">
                          <input id="7" type="radio" name="question4"/>
                          <div className="radio-tile">
                            <label htmlFor="7">7</label>
                          </div>
                        </div>
                
                        <div className="input-container little-input-container">
                          <input id="8" type="radio" name="question4"/>
                          <div className="radio-tile">
                            <label htmlFor="8">8</label>
                          </div>
                        </div>
    
                        <div className="input-container little-input-container">
                          <input id="9" type="radio" name="question4"/>
                          <div className="radio-tile">
                            <label htmlFor="9">9</label>
                          </div>
                        </div>
                
                        <div className="input-container little-input-container">
                          <input id="10" type="radio" name="question4"/>
                          <div className="radio-tile">
                            <label htmlFor="10">10</label>
                          </div>
                        </div>
    
                      </div>
                    </div>
    
    
                    
                    <div className="container-toggle">
                      <p>J'ai des problèmes de santé :</p>  
                      <label className="toggle_box toggle_box1">
                          <input type="checkbox" id="sante" className="checkboxToggle" onChange={handleSanteCheckboxChange} checked={santeChecked} />
                          <div className="circle circle1"></div>
                      </label>
                    </div>
    
                    {/* Condition pour afficher la div uniquement si santeChecked est true */}
                    {santeChecked && (
                      <div className="input-data">
                        <input type="text" required />
                        <div className="underline"></div>
                        <label>Vos problèmes de santé :</label>
                      </div>
                    )}
    
                    
                    <div className="container-toggle">
                      <p>Je suis blessé :</p>
                
                      <label className="toggle_box toggle_box2">
                          <input type="checkbox" id="blesse" className="checkboxToggle" onChange={handleBlesseCheckboxChange} checked={blesseChecked}/>
                          <div className="circle circle2"></div>
                      </label>
                    </div>

                    {/* Condition pour afficher la div uniquement si santeChecked est true */}
                    {blesseChecked && (
                      <div className="input-data">
                        <input type="text" required/>
                        <div className="underline"></div>
                        <label>Vos blessures :</label>
                      </div>
                    )}
    
                    
  
                    <div className="container-radio">
                      <p>Pour quel lieu se programme d'entrainement est-il destiné ?</p>
                      <div className="radio-tile-group">
                
                        <div className="input-container big-input-container">
                          <input id="salle" type="radio" name="question7" />
                          <div className="radio-tile">
                            <label htmlFor="salle">A la salle</label>
                          </div>
                        </div>
                
                        <div className="input-container big-input-container">
                          <input id="maison" type="radio" name="question7"/>
                          <div className="radio-tile">
                            <label htmlFor="maison">A la maison</label>
                          </div>
                        </div>
    
                
                        <div className="input-container big-input-container">
                          <input id="dehors" type="radio" name="question7"/>
                          <div className="radio-tile">
                            <label htmlFor="dehors">Dehors</label>
                          </div>
                        </div>
                      </div>
                    </div>
    
                    <button type="submit" id="submitBtn">Créer mon programme</button>
                </form>  
            </div>
        </main>
    </>
  );
}
