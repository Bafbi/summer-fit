import Footer from "../_components/organisms/Footer";
import Header from "../_components/organisms/Header";
import React from "react";
import "~/styles/accueil.css";
import "~/styles/abonnement.css"; // Import your CSS file
import "~/styles/header.css";
// Import your CSS file
import Or from "/public/assets/images/or.svg";
import Argent from "/public/assets/images/argent.svg";
import Diamand from "/public/assets/images/diamond.svg";
import Image, { StaticImageData } from "next/image";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { AbonneBouton } from "../_components/api/abonne_bouton";

const App = async () => {
  const session = await getServerAuthSession();
  const userAbonnement = session?.user.abonnement;

  return (
    <>
      <Header user={session?.user} />

      <div className="image-container">
        <div className="overlay-text">Nos différents abonnements</div>
      </div>
      <main className="px-4">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Carte d'offre 1 */}
              <div className="rounded-lg bg-[#eeeff0] p-6 shadow-md">
                <div className="text-center">
                  <Image
                    src={Argent as StaticImageData}
                    alt="Abonnement"
                    className="mx-auto mb-4 h-32 w-32 rounded-full"
                  />
                </div>
                <h3 className="mb-2 text-center text-xl font-semibold text-[#7945f7]">
                  <span>ARGENT</span>
                </h3>
                <ul className="text-gray-600 mb-4 pl-6 text-left">
                  <li className="mb-2">
                    <span className="text-green-500 mr-2">&#10004;</span>
                    <span className="text-green-500">
                      Accès toutes nos salles de sport
                    </span>
                  </li>
                  <li className="mb-2">
                    <span className="text-red-500 mr-2">&#10006;</span>
                    <span className="text-red-500">Coach virtuel illimité</span>
                  </li>
                  <li className="mb-2">
                    <span className="text-red-500 mr-2">&#10006;</span>
                    <span className="text-red-500">
                      Cours avec nos coachs Summer-Fit
                    </span>
                  </li>
                </ul>
                {userAbonnement === "ARGENT" ? (
                  <div className="text-center">
                    <button className="my-4 transform rounded-lg bg-[#ad57f9] px-8 py-2 text-white transition-transform  active:scale-95">
                      Abonnement actuel
                    </button>
                    <br />
                    <span className="text-[#444]-500 mt-1">20€/mois</span>
                  </div>
                ) : (
                  <div className="text-center">
                    <AbonneBouton plan="ARGENT">Souscrire</AbonneBouton>
                    <br />
                    <span className="text-[#444]-500 mt-1">20€/mois</span>
                  </div>
                )}
              </div>

              {/* Carte d'offre 2 */}
              <div className="rounded-lg bg-[#eeeff0] p-6 shadow-md">
                <div className="text-center">
                  <Image
                    src={Or as StaticImageData}
                    alt="Abonnement"
                    className="mx-auto mb-4 h-32 w-32 rounded-full"
                  />
                </div>
                <h3 className="mb-2 text-center text-xl font-semibold text-[#7945f7]">
                  <span className="uppercase">Or</span>
                </h3>
                <ul className="text-gray-600 mb-4 pl-6 text-left">
                  <li className="mb-2">
                    <span className="text-green-500 mr-2">&#10004;</span>
                    <span className="text-green-500">
                      Accès toutes nos salles de sport
                    </span>
                  </li>
                  <li className="mb-2">
                    <span className="text-green-500 mr-2">&#10004;</span>
                    <span className="text-green-500">
                      Coach virtuel illimité
                    </span>
                  </li>
                  <li className="mb-2">
                    <span className="text-red-500 mr-2">&#10006;</span>
                    <span className="text-red-500">
                      Cours avec nos coachs Summer-Fit
                    </span>
                  </li>
                </ul>
                {userAbonnement === "OR" ? (
                  <div className="text-center">
                    <button className="my-4 transform rounded-lg bg-[#ad57f9] px-8 py-2 text-white transition-transform  active:scale-95">
                      Abonnement actuel
                    </button>
                    <br />
                    <span className="text-[#444]-500 mt-1">35€/mois</span>
                  </div>
                ) : (
                  <div className="text-center">
                    <AbonneBouton plan="OR">Souscrire</AbonneBouton>
                    <br />
                    <span className="text-[#444]-500 mt-1">35€/mois</span>
                  </div>
                )}
              </div>

              {/* Carte d'offre 3 */}
              <div className="rounded-lg bg-[#eeeff0] p-6 shadow-md">
                <div className="text-center">
                  <Image
                    src={Diamand as StaticImageData}
                    alt="Abonnement"
                    className="mx-auto mb-4 h-32 w-32 rounded-full"
                  />
                </div>
                <h3 className="mb-2 text-center text-xl font-semibold text-[#7945f7]">
                  <span className="uppercase">Diamant</span>
                </h3>
                <ul className="text-gray-600 mb-4 pl-6 text-left">
                  <li className="mb-2">
                    <span className="text-green-500 mr-2">&#10004;</span>
                    <span className="text-green-500">
                      Accès toutes nos salles de sport
                    </span>
                  </li>
                  <li className="mb-2">
                    <span className="text-green-500 mr-2">&#10004;</span>
                    <span className="text-green-500">
                      Coach virtuel illimité
                    </span>
                  </li>
                  <li className="mb-2">
                    <span className="text-green-500 mr-2">&#10004;</span>
                    <span className="text-green-500">
                      Cours avec nos coachs Summer-Fit
                    </span>
                  </li>
                </ul>
                {userAbonnement === "DIAMANT" ? (
                  <div className="text-center">
                    <button className="my-4 transform rounded-lg bg-[#ad57f9] px-8 py-2 text-white transition-transform active:scale-95">
                      Abonnement actuel
                    </button>
                    <br />
                    <span className="text-[#444]-500 mt-1">50€/mois</span>
                  </div>
                ) : (
                  <div className="text-center">
                    <AbonneBouton plan="DIAMANT">Souscrire</AbonneBouton>
                    <br />
                    <span className="text-[#444]-500 mt-1">50€/mois</span>
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
