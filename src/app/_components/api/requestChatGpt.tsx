"use client";
import "~/styles/virtualCoach/newTrainingProgram.css";
import { useState,useEffect } from "react";
import { Page, Text, View, Document, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';


import { api } from "~/trpc/react";
import { RouterOutputs } from "~/trpc/shared";
import { ChatCompletion } from "openai/resources/index.mjs";

interface RequestChatGptProps {
  onDataUpdate: (data: ChatCompletion) => void;
}

export function RequestChatGpt({ onDataUpdate }:RequestChatGptProps){
  
    const request = api.newTraining.callChatGpt.useMutation({
        onSuccess(data) {
          onDataUpdate(data);
        }
      });

      const [etatAvancement, setEtatAvancement ] = useState(1)

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
    
      
      //On stocke toutes les valeurs des inputs de la page
    
      // États pour stocker les valeurs des différents inputs
      const [objectifs, setObjectifs] = useState<string[]>([]);
      const [conditionPhysique, setConditionPhysique] = useState("");
      const [joursEntrainement, setJoursEntrainement] = useState<string[]>([]);
      const [niveauMotivation, setNiveauMotivation] = useState("");
      const [lieuEntrainement, setLieuEntrainement] = useState("");
    
      // Fonction pour gérer le changement d'état de la checkbox "joursEntrainement"
      const handleJoursEntrainementChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const jourSelectionne = event.target.value;
        setJoursEntrainement((prevJours) =>
          prevJours.includes(jourSelectionne)
            ? prevJours.filter((jour) => jour !== jourSelectionne)
            : [...prevJours, jourSelectionne]
        );
      };
    
      // Fonction pour gérer le changement d'état de la checkbox "objectifs"
      const handleObjectifsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const objectifSelectionner = event.target.value;
        setObjectifs((prevObj) =>
          prevObj.includes(objectifSelectionner)
            ? prevObj.filter((obj) => obj !== objectifSelectionner)
            : [...prevObj, objectifSelectionner]
        );
      };

      //function startPdfGeneration(){
        const HelloWorldPDF = () => (
          <Document>
            <Page>
              <View>
                <Text>Programme Sportif d</Text>
              </View>
            </Page> 
          </Document>
        );
      //}
    
      return (
      <form onSubmit={(e) => {
          e.preventDefault();
          setEtatAvancement(2)
          const resp = request.mutate({ objectifs: objectifs, difficulte: parseInt(conditionPhysique), jours: joursEntrainement, lieu: lieuEntrainement });

        }}>
        
        {(etatAvancement == 1) && (
          <div className="wrapper">
            <h1>Bonne nouvelle !</h1>
            <h2>Vous n'avez jamais été aussi proche du <span>SUMMER FIT</span>...</h2>
            <h3>Veuillez répondre à ces quelques questions pour nous aider à réaliser votre programme sportif...</h3>
        
            <div className="container-radio">
                  <p>Quels sont les objectifs de ce programme ?</p>
                  <div className="radio-tile-group">
            
                    <div className="input-container big-input-container">
                      <input id="pertePoids" type="checkbox" name="question1" value="perte de poids" onChange={handleObjectifsChange}/>
                      <div className="radio-tile">
                        <label htmlFor="pertePoids">Perte de poids</label>
                      </div>
                    </div>

                    <div className="input-container big-input-container">
                      <input id="remiseEnForme" type="checkbox" name="question1" value="remise en forme" onChange={handleObjectifsChange}/>
                      <div className="radio-tile">
                        <label htmlFor="remiseEnForme">Remise en forme</label>
                      </div>
                    </div>

                    <div className="input-container big-input-container">
                      <input id="cardio" type="checkbox" name="question1" value="amélioration du cardio" onChange={handleObjectifsChange}/>
                      <div className="radio-tile">
                        <label htmlFor="cardio">Amélioration Cardio</label>
                      </div>
                    </div>

                    <div className="input-container big-input-container">
                      <input id="muscuBras" type="checkbox" name="question1" value="Musculation des bras" onChange={handleObjectifsChange}/>
                      <div className="radio-tile">
                        <label htmlFor="muscuBras">Musculation Bras</label>
                      </div>
                    </div>

                    <div className="input-container big-input-container">
                      <input id="muscuPec" type="checkbox" name="question1" value="Musculation des pectoraux" onChange={handleObjectifsChange}/>
                      <div className="radio-tile">
                        <label htmlFor="muscuPec">Musculation Pectoraux</label>
                      </div>
                    </div>

                    <div className="input-container big-input-container">
                      <input id="muscuAbdo" type="checkbox" name="question1" value="Musculation des abdominaux" onChange={handleObjectifsChange}/>
                      <div className="radio-tile">
                        <label htmlFor="muscuAbdo">Musculation Abdominaux</label>
                      </div>
                    </div>

                    <div className="input-container big-input-container">
                      <input id="muscuDos" type="checkbox" name="question1" value="Musculation du dos" onChange={handleObjectifsChange}/>
                      <div className="radio-tile">
                        <label htmlFor="muscuDos">Musculation Dos</label>
                      </div>
                    </div>

                    <div className="input-container big-input-container">
                      <input id="muscuJambes" type="checkbox" name="question1" value="Musculation des jambes" onChange={handleObjectifsChange}/>
                      <div className="radio-tile">
                        <label htmlFor="muscuJambes">Musculation Jambes</label>
                      </div>
                    </div>
            
                    
                  </div>
                </div>

            

              <div className="container-radio">
                  <p>Comment évaluer vous votre condition physique actuelle ? (1 : très mauvaise, 10 : excellente)</p>
                  <div className="radio-tile-group">
            
                    <div className="input-container little-input-container">
                      <input id="1" type="radio" name="question2" value="1" onChange={(event) => setConditionPhysique(event.target.value)}/>
                      <div className="radio-tile">
                        <label htmlFor="1">1</label>
                      </div>
                    </div>
            
                    <div className="input-container little-input-container">
                      <input id="2" type="radio" name="question2" value="2" onChange={(event) => setConditionPhysique(event.target.value)}/>
                      <div className="radio-tile">
                        <label htmlFor="2">2</label>
                      </div>
                    </div>
            
                    <div className="input-container little-input-container">
                      <input id="3" type="radio" name="question2" value="3" onChange={(event) => setConditionPhysique(event.target.value)}/>
                      <div className="radio-tile">
                        <label htmlFor="3">3</label>
                      </div>
                    </div>
            
                    <div className="input-container little-input-container">
                      <input id="4" type="radio" name="question2" value="4" onChange={(event) => setConditionPhysique(event.target.value)}/>
                      <div className="radio-tile">
                        <label htmlFor="4">4</label>
                      </div>
                    </div>

                    <div className="input-container little-input-container">
                      <input id="5" type="radio" name="question2" value="5" onChange={(event) => setConditionPhysique(event.target.value)}/>
                      <div className="radio-tile">
                        <label htmlFor="5">5</label>
                      </div>
                    </div>
            
                    <div className="input-container little-input-container">
                      <input id="6" type="radio" name="question2" value="6" onChange={(event) => setConditionPhysique(event.target.value)}/>
                      <div className="radio-tile">
                        <label htmlFor="6">6</label>
                      </div>
                    </div>
            
                    <div className="input-container little-input-container">
                      <input id="7" type="radio" name="question2" value="7" onChange={(event) => setConditionPhysique(event.target.value)}/>
                      <div className="radio-tile">
                        <label htmlFor="7">7</label>
                      </div>
                    </div>
            
                    <div className="input-container little-input-container">
                      <input id="8" type="radio" name="question2" value="8" onChange={(event) => setConditionPhysique(event.target.value)}/>
                      <div className="radio-tile">
                        <label htmlFor="8">8</label>
                      </div>
                    </div>

                    <div className="input-container little-input-container">
                      <input id="9" type="radio" name="question2" value="9" onChange={(event) => setConditionPhysique(event.target.value)}/>
                      <div className="radio-tile">
                        <label htmlFor="9">9</label>
                      </div>
                    </div>
            
                    <div className="input-container little-input-container">
                      <input id="10" type="radio" name="question2" value="10" onChange={(event) => setConditionPhysique(event.target.value)}/>
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
                      <input id="lundi" type="checkbox" name="question3" value="lundi" onChange={handleJoursEntrainementChange}/>
                      <div className="radio-tile">
                        <label htmlFor="lundi">Lundi</label>
                      </div>
                    </div>
            
                    <div className="input-container big-input-container"> 
                      <input id="mardi" type="checkbox" name="question3" value="mardi" onChange={handleJoursEntrainementChange}/>
                      <div className="radio-tile">
                        <label htmlFor="mardi">Mardi</label>
                      </div>
                    </div>
            
                    <div className="input-container big-input-container">
                      <input id="mercredi" type="checkbox" name="question3" value="mercredi" onChange={handleJoursEntrainementChange}/>
                      <div className="radio-tile">
                        <label htmlFor="mercredi">Mercredi</label>
                      </div>
                    </div>

                    <div className="input-container big-input-container">
                      <input id="jeudi" type="checkbox" name="question3" value="jeudi" onChange={handleJoursEntrainementChange}/>
                      <div className="radio-tile">
                        <label htmlFor="jeudi">Jeudi</label>
                      </div>
                    </div>
            
                    <div className="input-container big-input-container">
                      <input id="vendredi" type="checkbox" name="question3" value="vendredi" onChange={handleJoursEntrainementChange}/>
                      <div className="radio-tile">
                        <label htmlFor="vendredi">Vendredi</label>
                      </div>
                    </div>
            
                    <div className="input-container big-input-container">
                      <input id="samedi" type="checkbox" name="question3" value="samedi" onChange={handleJoursEntrainementChange}/>
                      <div className="radio-tile">
                        <label htmlFor="samedi">Samedi</label>
                      </div>
                    </div>

                    <div className="input-container big-input-container">
                      <input id="dimanche" type="checkbox" name="question3" value="dimanche" onChange={handleJoursEntrainementChange}/>
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
                      <input id="q4r1" type="radio" name="question4" value="1" onChange={(event) => setNiveauMotivation(event.target.value)}/>
                      <div className="radio-tile">
                        <label htmlFor="1">1</label>
                      </div>
                    </div>
            
                    <div className="input-container little-input-container">
                      <input id="q4r2" type="radio" name="question4" value="2" onChange={(event) => setNiveauMotivation(event.target.value)}/>
                      <div className="radio-tile">
                        <label htmlFor="2">2</label>
                      </div>
                    </div>
            
                    <div className="input-container little-input-container">
                      <input id="q4r3" type="radio" name="question4" value="3" onChange={(event) => setNiveauMotivation(event.target.value)}/>
                      <div className="radio-tile">
                        <label htmlFor="3">3</label>
                      </div>
                    </div>
            
                    <div className="input-container little-input-container">
                      <input id="q4r4" type="radio" name="question4" value="4" onChange={(event) => setNiveauMotivation(event.target.value)}/>
                      <div className="radio-tile">
                        <label htmlFor="4">4</label>
                      </div>
                    </div>

                    <div className="input-container little-input-container">
                      <input id="q4r5" type="radio" name="question4" value="5" onChange={(event) => setNiveauMotivation(event.target.value)}/>
                      <div className="radio-tile">
                        <label htmlFor="5">5</label>
                      </div>
                    </div>
            
                    <div className="input-container little-input-container">
                      <input id="q4r6" type="radio" name="question4" value="6" onChange={(event) => setNiveauMotivation(event.target.value)}/>
                      <div className="radio-tile">
                        <label htmlFor="6">6</label>
                      </div>
                    </div>
            
                    <div className="input-container little-input-container">
                      <input id="q4r7" type="radio" name="question4" value="7" onChange={(event) => setNiveauMotivation(event.target.value)}/>
                      <div className="radio-tile">
                        <label htmlFor="7">7</label>
                      </div>
                    </div>
            
                    <div className="input-container little-input-container">
                      <input id="q4r8" type="radio" name="question4" value="8" onChange={(event) => setNiveauMotivation(event.target.value)}/>
                      <div className="radio-tile">
                        <label htmlFor="8">8</label>
                      </div>
                    </div>

                    <div className="input-container little-input-container">
                      <input id="q4r9" type="radio" name="question4" value="9" onChange={(event) => setNiveauMotivation(event.target.value)}/>
                      <div className="radio-tile">
                        <label htmlFor="9">9</label>
                      </div>
                    </div>
            
                    <div className="input-container little-input-container">
                      <input id="q4r10" type="radio" name="question4" value="10" onChange={(event) => setNiveauMotivation(event.target.value)}/>
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
                      <input id="salle" type="radio" name="question7" value="à la salle de sport" onChange={(event) => setLieuEntrainement(event.target.value)}/>
                      <div className="radio-tile">
                        <label htmlFor="salle">A la salle</label>
                      </div>
                    </div>
            
                    <div className="input-container big-input-container">
                      <input id="maison" type="radio" name="question7" value="à la maison" onChange={(event) => setLieuEntrainement(event.target.value)}/>
                      <div className="radio-tile">
                        <label htmlFor="maison">A la maison</label>
                      </div>
                    </div>

            
                    <div className="input-container big-input-container">
                      <input id="dehors" type="radio" name="question7" value="à l'exterieur" onChange={(event) => setLieuEntrainement(event.target.value)}/>
                      <div className="radio-tile">
                        <label htmlFor="dehors">Dehors</label>
                      </div>
                    </div>
                  </div>
                </div>

                <button type="submit" id="submitBtn" >
                    Générer l'entrainement
                </button>
            </div>
        )}

        {(etatAvancement == 2) && (
          <div className="containerLoader">
              <h5>Une petite seconde, on travaille sur votre programme...</h5>
              <div className="loader"></div>
          </div>
        )}
        </form>  
        
        
      );
  
}
