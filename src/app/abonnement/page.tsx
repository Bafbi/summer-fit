import Footer from "../_components/organisms/Footer";
import Header from "../_components/organisms/Header";
import React from "react";
import "~/styles/accueil.css"; 
import "~/styles/header.css"; 
// Import your CSS file
import Or from "/public/assets/images/or.svg";
import Argent from "/public/assets/images/argent.svg";
import Diamand from "/public/assets/images/diamond.svg";
import Image from "next/image";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { AbonneBouton } from "../_components/api/abonne_bouton";

const App = async () => {
  const session = await getServerAuthSession();
  const userAbonnement = session?.user.abonnement;

  return (
    <>
      <Header></Header>

<main className="px-4">
  

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-[#444] mb-6 pt-4 text-3xl font-semibold underline">
            Nos différents abonnements 
          </h1>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Carte d'offre 1 */}
            <div className="rounded-lg bg-[#eeeff0] p-6 shadow-md">
              <div className="text-center">
                <Image
                  src={Argent}
                  alt="Abonnement"
                  className="mx-auto mb-4 h-32 w-32 rounded-full"
                />
              </div>
              <h3 className="mb-2 text-center text-xl font-semibold text-[#7945f7]">
                <span>ARGENT</span>
              </h3>
              <ul className="mb-4 pl-6 text-left text-gray-600">
                <li className="mb-2">
                  <span className="mr-2 text-green-500">&#10004;</span>
                  <span className="text-green-500">
                    Accès toutes nos salles de sport
                  </span>
                </li>
                <li className="mb-2">
                  <span className="mr-2 text-red-500">&#10006;</span>
                  <span className="text-red-500">Coach virtuel illimité</span>
                </li>
                <li className="mb-2">
                  <span className="mr-2 text-red-500">&#10006;</span>
                  <span className="text-red-500">
                    Cours avec nos coachs Summer-Fit
                  </span>
                </li>
              </ul>
              {userAbonnement === "ARGENT" ? (
                <div className="text-center">
                  <button className="bg-[#ad57f9] text-white px-8 my-4 py-2 rounded-lg transition-transform transform  active:scale-95"
                  >
                    Abonnement actuel
                  </button>
                  <br />
                  <span className="text-[#444]-500 mt-1">
                   20€/mois
                  </span>
                </div>
              ) : (
                <div className="text-center">
                  <AbonneBouton plan="ARGENT" >
                    Souscrire
                  </AbonneBouton>
                  <br />
                  <span className="text-[#444]-500 mt-1">
                   20€/mois
                  </span>
                </div>
              )}
            </div>

            {/* Carte d'offre 2 */}
            <div className="rounded-lg bg-[#eeeff0] p-6 shadow-md">
              <div className="text-center">
                <Image
                  src={Or}
                  alt="Abonnement"
                  className="mx-auto mb-4 h-32 w-32 rounded-full"
                />
              </div>
              <h3 className="mb-2 text-center text-xl font-semibold text-[#7945f7]">
                <span>Or</span>
              </h3>
              <ul className="mb-4 pl-6 text-left text-gray-600">
                <li className="mb-2">
                  <span className="mr-2 text-green-500">&#10004;</span>
                  <span className="text-green-500">
                    Accès toutes nos salles de sport
                  </span>
                </li>
                <li className="mb-2">
                  <span className="mr-2 text-green-500">&#10004;</span>
                  <span className="text-green-500">Coach virtuel illimité</span>
                </li>
                <li className="mb-2">
                  <span className="mr-2 text-red-500">&#10006;</span>
                  <span className="text-red-500">
                    Cours avec nos coachs Summer-Fit
                  </span>
                </li>
              </ul>
              {userAbonnement === "OR" ? (
                <div className="text-center">
                  <button className="bg-[#ad57f9] text-white px-8 my-4 py-2 rounded-lg transition-transform transform  active:scale-95">
                    Abonnement actuel
                  </button>
                  <br />
                  <span className="text-[#444]-500 mt-1">
                   35€/mois
                  </span>
                </div>
              ) : (
                <div className="text-center">
                  <AbonneBouton plan="OR">
                    Souscrire
                  </AbonneBouton>
                  <br />
                  <span className="text-[#444]-500 mt-1">
                   35€/mois
                  </span>
                </div>
              )}
            </div>

            {/* Carte d'offre 3 */}
            <div className="rounded-lg bg-[#eeeff0] p-6 shadow-md">
              <div className="text-center">
                <Image
                  src={Diamand}
                  alt="Abonnement"
                  className="mx-auto mb-4 h-32 w-32 rounded-full"
                />
              </div>
              <h3 className="mb-2 text-center text-xl font-semibold text-[#7945f7]">
                <span>Diamant</span>
              </h3>
              <ul className="mb-4 pl-6 text-left text-gray-600">
                <li className="mb-2">
                  <span className="mr-2 text-green-500">&#10004;</span>
                  <span className="text-green-500">
                    Accès toutes nos salles de sport
                  </span>
                </li>
                <li className="mb-2">
                  <span className="mr-2 text-green-500">&#10004;</span>
                  <span className="text-green-500">Coach virtuel illimité</span>
                </li>
                <li className="mb-2">
                  <span className="mr-2 text-green-500">&#10004;</span>
                  <span className="text-green-500">
                    Cours avec nos coachs Summer-Fit
                  </span>
                </li>
              </ul>
              {userAbonnement === "DIAMANT" ? (
                <div className="text-center">
                  <button className="bg-[#ad57f9] text-white px-8 py-2 my-4 rounded-lg transition-transform transform active:scale-95">
                    Abonnement actuel
                  </button>
                  <br />
                  <span className="text-[#444]-500 mt-1">
                   50€/mois
                  </span>
                </div>
              ) : (
                <div className="text-center">
                  <AbonneBouton plan="DIAMANT">
                    Souscrire
                  </AbonneBouton>
                  <br />
                  <span className="text-[#444]-500 mt-1">
                   50€/mois
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      </main>

      <Footer></Footer>
    </>
  );
};

export default App;
