import { api } from "~/trpc/server";
import { getServerAuthSession } from "~/server/auth";
import Header from "~/app/_components/organisms/Header";
import { RequestChatGpt } from "~/app/_components/api/requestChatGpt";
import { ChatCompletion } from "openai/resources/index.mjs";

export default async function App() {

  // Récupération des données des salles
  //const salles = await api.halls.getAll.query();
  const session = await getServerAuthSession();

  // Fonction de rappel pour recevoir les données du composant enfant
  const handleDataUpdate = async (newData:ChatCompletion) => {
    'use server'
    //On traite notre nouvelle data
    console.log("log explicite debut");
    console.log(newData.choices[0]?.message.content);
    console.log("log explicite fin");
  };

  return (
    <>

    <Header user={session?.user}></Header>
     
        <main>
           
              
                  <RequestChatGpt onDataUpdate={handleDataUpdate}/>
              
            
        </main>
    </>
  );
}
