import { error } from "console";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

//Besoin de mettre à jour les publics/privates

export const newTrainingRouter = createTRPCRouter({
    callChatGpt : protectedProcedure
    .input(z.object({
        objectifs: z.array(z.string()),
        difficulte : z.number(),
        jours : z.array(z.string()),
        lieu : z.string()
    }))
    .mutation(async ({ ctx, input }) => {
        let prompt: string = "Tu es mon coach sportif, je souhaite un programme sportif ayant les objectifs suivants : ";
    
        //On ajout les objectifs
        for (var i = 0; i < input.objectifs.length; i++) {
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
        else if(input.difficulte < 3) prompt += "facile. "
        else if(input.difficulte < 3) prompt += "intermédiaire. "
        else if (input.difficulte < 3) prompt += "difficile. "
        else prompt+= "très difficile ."

        //Jours
        prompt += "Je veux m'entrainer ";
        prompt += input.jours.length;
        prompt += " fois dans la semaine et je souhaite que mes jours d'entrainements soit : "
        for (var i = 0; i < input.jours.length; i++) {
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

        

        return prompt;
        }),


        
    
});
