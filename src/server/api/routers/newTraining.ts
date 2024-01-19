import { error } from "console";
import { z } from "zod";
import { readFileSync } from 'fs';

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import OpenAI from "openai";

import path from "path";

//Besoin de mettre à jour les publics/privates

const openai = new OpenAI({
    apiKey: "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"
  });

  async function askChatGPT(inputPrompt: string){
    return openai.chat.completions.create({
        messages: [{ role: "system", content: inputPrompt }],
        model: "gpt-3.5-turbo",
      });
    
  }

export const newTrainingRouter = createTRPCRouter({
    callChatGpt : protectedProcedure
    .input(z.object({
        objectifs: z.array(z.string()),
        difficulte : z.number(),
        jours : z.array(z.string()),
        lieu : z.string()
    }))
    .mutation(async ({ ctx, input }) => {
        let prompt = "Tu es mon coach sportif, je souhaite un programme sportif ayant les objectifs suivants : ";
    
        //On ajout les objectifs
        for (let i = 0; i < input.objectifs.length; i++) {
        prompt += input.objectifs[i];
        
        if(i+1 != input.objectifs.length){
            prompt += ", ";
        }else{
            prompt += ". ";
        }
        }

        //difficultés
        prompt += "j'aimerais des exercices "
        if(input.difficulte < 3) prompt += "très facile. "
        else if(input.difficulte < 5) prompt += "facile. "
        else if(input.difficulte < 7) prompt += "intermédiaire. "
        else if (input.difficulte < 9) prompt += "difficile. "
        else prompt+= "très difficile ."

        //Jours
        prompt += "Je veux m'entrainer ";
        prompt += input.jours.length;
        prompt += " fois dans la semaine et je souhaite que mes jours d'entrainements soit : "
        for (let i = 0; i < input.jours.length; i++) {
            prompt += input.jours[i];
        
            if(i+1 != input.jours.length){
                prompt += ", ";
            }else{
                prompt += ". ";
            }
        }

        //Endroit + materielle
        prompt += "Ce programme sera destiné à être appliqué ";
        prompt += input.lieu;
        prompt += ". "


            //On lui donne le matériel correspondant
        if(input.lieu == "à la salle de sport"){
            prompt += "L'équipement que ma salle de sport possède est le suivant : ";
    
            //Fake list (dynamique à coder !!)
            prompt += "HALTÈRES, CAGE À SQUAT, KINESIS, BANCS ABDOMINAUX, Abdominal Crunch, rameur, vélo, vélo elliptique, marches infini, arm curl, vertical traction, chest press, Lower back, leg extension. "
        }else{
            prompt += "Je n'ai pour ce faire aucun équipement particulier à ma disposition. ";
        }
    
        //Demande au format JSON
        prompt += "Donne moi mon programme sportif jour après jour en me donnant pour chaque jour une liste d'exercices sur le tout sur le format d'un fichier JSON. Tu devras suivre scrupuleusement le format de l'exemple suivant: ";

        //On essaie de lire le fichier json
        try{

            const jsonPath = path.resolve(__dirname, '../../../../../../exampleForChatGpt.JSON');
            const jsonContent = readFileSync(jsonPath, 'utf-8');
            

            prompt += jsonContent;

        }catch(error){
            console.log(error);
            console.log(__dirname);
            throw new Error("Erreur Impossible de lire le fichier JSON");
        }

        prompt += "Voici les instrusctions que tu devras suivre scrupuleusement afin de personnaliser cet exemple:Le tableau equipement_disponible (ligne 3), représente les machines à ma disposition. Il te sera absolument impossible de me donner des exercices sur des machines que je n'ai pas à ma disposition.Chaque objet contenu dans jours_entrainement (ligne 8), possède un attribut jour indiquant le jour pour lequel cet entrainement sera destiné. Le deuxième attribut est une liste d'exercices, dans mon exemple il y en avait deux mais tu es libre dans mettre plus tant que tu ne dépasse pas 10 exercices. Pour chaque exercice, tu indiqueras le nom de l'exercice dans l'attribut exercice, et tu indiqueras le nombre de séries et de répétitions en t'adaptant à ma condition physique (ligne 5), la règle est la suivante : les 5 niveaux de difficultés sont très facile, facile, intermédiaire, difficile, très difficile (en faisant attention à ce que ça reste humainement faisable). Après ça, tu estimeras le temps que prendras l'exercice avec une pause de 30 secondes entre chaques répétitions. Certains exercices se base sur une durée et non un nombre de répétion, comme du vélo d'interieur par exemple. Si tu me donnes un exercice de ce type, met l'attribut repetition à 0 et l'attribut duree_minutes selon la durée d'exercice que tu définieras. Ne dit rien à coté, donne uniquement le fichier JSON."

        return askChatGPT(prompt);
        
        }),

});
