import Footer from "../_components/organisms/Footer";
import Header from "../_components/organisms/Header";
import React from "react";
import "~/styles/accueil.css"; // Import your CSS file
import Or from "/public/assets/images/or.svg";
import Argent from "/public/assets/images/argent.svg";
import Diamand from "/public/assets/images/diamond.svg";
import Image from "next/image";
import { getServerAuthSession } from "~/server/auth";

const App = async () => {
  const session = await getServerAuthSession();
  const userAbonnement = session?.user.abonnement;

  return (
    <>
      <Header></Header>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="mb-6 pt-4 text-3xl font-semibold">
            Nos différents abonnements :
          </h1>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Carte d'offre 1 */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="text-center">
                <Image
                  src={Argent}
                  alt="Abonnement"
                  className="mx-auto mb-4 h-32 w-32 rounded-full"
                />
              </div>
              <h3 className="mb-2 text-center text-xl font-semibold text-primary">
                <span>ARGENT</span>
              </h3>
              <ul className="text-gray-600 mb-4 text-left pl-6">
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
                  <button className="bg-primary rounded-lg px-4 py-2 text-white hover:bg-primary-dark">
                    Abonnement actuel
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <button className="bg-primary rounded-lg px-4 py-2 text-white hover:bg-primary-dark">
                    Souscrire
                  </button>
                </div>
              )}
            </div>

            {/* Carte d'offre 2 */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="text-center">
                <Image
                  src={Or}
                  alt="Abonnement"
                  className="mx-auto mb-4 h-32 w-32 rounded-full"
                />
              </div>
              <h3 className="mb-2 text-center text-xl font-semibold text-primary">
                <span>Or</span>
              </h3>
              <ul className="text-gray-600 mb-4 text-left pl-6">
                <li className="mb-2">
                  <span className="text-green-500 mr-2">&#10004;</span>
                  <span className="text-green-500">
                    Accès toutes nos salles de sport
                  </span>
                </li>
                <li className="mb-2">
                  <span className="text-green-500 mr-2">&#10004;</span>
                  <span className="text-green-500">Coach virtuel illimité</span>
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
                  <button className="bg-primary rounded-lg px-4 py-2 text-white hover:bg-primary-dark">
                    Abonnement actuel
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <button className="bg-primary rounded-lg px-4 py-2 text-white hover:bg-primary-dark">
                    Souscrire
                  </button>
                </div>
              )}
            </div>

            {/* Carte d'offre 3 */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="text-center">
                <Image
                  src={Diamand}
                  alt="Abonnement"
                  className="mx-auto mb-4 h-32 w-32 rounded-full"
                />
              </div>
              <h3 className="mb-2 text-center text-xl font-semibold text-primary">
                <span>Diamant</span>
              </h3>
              <ul className="text-gray-600 mb-4 text-left pl-6">
                <li className="mb-2">
                  <span className="text-green-500 mr-2">&#10004;</span>
                  <span className="text-green-500">
                    Accès toutes nos salles de sport
                  </span>
                </li>
                <li className="mb-2">
                  <span className="text-green-500 mr-2">&#10004;</span>
                  <span className="text-green-500">Coach virtuel illimité</span>
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
                  <button className="bg-primary rounded-lg px-4 py-2 text-white hover:bg-primary-dark">
                    Abonnement actuel
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <button className="bg-primary rounded-lg px-4 py-2 text-white hover:bg-primary-dark">
                    Souscrire
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer></Footer>
    </>
  );
};

export default App;
