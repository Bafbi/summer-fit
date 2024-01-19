/* eslint-disable react/no-unescaped-entities */

import Footer from "./_components/organisms/Footer";
import Header from "./_components/organisms/Header";
import Image from "next/image";
import React from "react";
import { getServerAuthSession } from "~/server/auth";
import "~/styles/accueil.css";
import { redirect } from "next/navigation";


export default async function App() {
  const session = await getServerAuthSession();

  if (session && !session.user.name) {
    redirect("/client/info");
  }

  return (
    <>
      <body>
        <Header user={session?.user}></Header>

        {/* Home */}
        <section className="home" id="home">
          <div className="text">
            <h1>
              Trouvez votre <br />
              <span>Salle idéal</span>
            </h1>
            <p>
              Nous offrons une variété étendue de la plus haute qualité et
              créons <br />
              un nouvel espace pour s'entraîner qui devient bien plus
              confortable
            </p>
            <div className="app-stores">
              <Image
                src="/assets/images/App Store.png"
                alt="Apple Store"
                width={200}
                height={20}
              />
              <Image
                src="/assets/images/Google Play.png"
                alt="Google Play"
                width={200}
                height={20}
              />
            </div>
          </div>

          {/* Forms */}
          <div className="form-container">
            <form action="announcement.html">
              <div className="input-box">
                <span>Support</span>
                <input
                  type="search"
                  name=""
                  id=""
                  placeholder="Votre problème"
                />
              </div>
              <input
                type="submit"
                name="Une Question ?"
                id=""
                className="btn"
              />
              <a href="search.html">Contactez Nous</a>
            </form>
          </div>
        </section>

        {/* Advantage */}
        <section className="advantage" id="advantage">
          <div className="heading">
            <span>Notre avantage</span>
            <h1>Notre service spécial</h1>
          </div>
          <div className="advantage-container">
            <div className="box">
              <i className="bx bxs-shield-minus"></i>
              <h2>Vos entraînements en toute sérénité</h2>
              <p>
                Profitez d'un accompagnement 24h/24 et 7j/7 grâce à notre
                engagement et à la carte fidélitée
              </p>
            </div>
            <div className="box">
              <i className="bx bxs-shopping-bag"></i>
              <h2>Entraînez-vous en toute confiance</h2>
              <p>
                Vivez des moments inoubliables lors de votre séance
                d'entraînement dans votre salle préférée du moment
              </p>
            </div>
            <div className="box">
              <i className="bx bxs-coffee"></i>
              <h2>Toute l'énergie d'une salle de sport</h2>
              <p>
                Immergez-vous dans un espace équipé d'installations de premier
                ordre et d'une énergie vibrante
              </p>
            </div>
            <div className="box">
              <i className="bx bxs-credit-card-front"></i>
              <h2>Plus qu'une simple séance</h2>
              <p>
                Découvrez plus qu'un exercice - une communauté, un soutien et
                les équipements dont vous avez besoin
              </p>
            </div>
          </div>
        </section>

        {/* About Us */}
        <section className="about" id="about">
          <div className="heading">
            <span>A Propos de Nous</span>
            <h1>Nous sommes une salle de sport de confiance</h1>
          </div>
          <div className="about-container">
            <div className="about-img">
              <Image
                src="/assets/images/about.png"
                alt="mockup"
                width={1200}
                height={1200}
              />
            </div>
            <div className="about-text">
              <span>Offre Exceptionnel</span>
              <p>
                Plongez dans une aventure fitness inégalée avec notre offre
                exceptionnelle qui repousse les limites de l'extraordinaire. En
                tant que membre de notre salle de sport, vous bénéficierez d'un
                accès exclusif à des séances d'entraînement innovantes
              </p>
              <span>Diversité des machines</span>
              <p>
                Explorez un monde de possibilités avec notre collection
                diversifiée de machines de pointe, conçues pour répondre à tous
                les besoins de votre programme d'entraînement. Que vous
                souhaitiez renforcer vos muscles, améliorer votre endurance ou
                simplement vous détendre.
              </p>
              <a href="" className="btn">
                Lire Plus
              </a>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <div className="reviews" id="reviews">
          <div className="heading">
            <span>Avis</span>
            <h1>Que disent nos clients</h1>
          </div>
          <div className="reviews-container">
            <div className="box">
              <div className="rev-img">
                <Image
                  src="/assets/images/Client1.jpg"
                  alt="Client1"
                  width={50}
                  height={50}
                />
              </div>
              <h2>Hervé.M</h2>
              <div className="stars">
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
              </div>
              <p>
                En tant que débutante, j'ai trouvé Summer Fit incroyablement
                accueillante. Le personnel amical et les membres encourageants
                ont créé une communauté positive. Les programmes d'entraînement
                personnalisés m'ont permis de progresser à mon rythme. C'est
                bien plus qu'une simple salle de sport, c'est un lieu où l'on se
                sent soutenu dans son parcours de bien-être.
              </p>
            </div>
            <div className="box">
              <div className="rev-img">
                <Image
                  src="/assets/images/Client2.jpg"
                  alt="Client2"
                  width={50}
                  height={50}
                />
              </div>
              <h2>Juliette.L</h2>
              <div className="stars">
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star-half"></i>
              </div>
              <p>
                Summer Fit a définitivement dépassé mes attentes en matière
                d'installations et de services. Les divers cours proposés, du
                yoga à l'entraînement en groupe, m'ont maintenu motivé. Les
                espaces de détente et la propreté impeccable ajoutent à
                l'expérience globale. Je recommande vivement cette salle de
                sport à quiconque recherche un environnement favorable à la
                remise en forme.
              </p>
            </div>
            <div className="box">
              <div className="rev-img">
                <Image
                  src="/assets/images/Client3.jpg"
                  alt="Client3"
                  width={50}
                  height={50}
                />
              </div>
              <h2>Claire.T</h2>
              <div className="stars">
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star-half"></i>
              </div>
              <p>
                J'ai été agréablement surprise par l'atmosphère énergique et
                motivante à Summer Fit. L'équipement de pointe et les
                instructeurs compétents m'ont permis de relever mes défis
                fitness avec confiance. L'ambiance décontractée mais
                professionnelle fait de cette salle de sport un endroit idéal
                pour tous les niveaux de condition physique.
              </p>
            </div>
          </div>
        </div>
        <section className="newsletter">
          <h2>S'abonner à Newsletter</h2>
          <p>
            Pour plus d'informations sur notre entreprise <br /> ou s'il y en a
            autres questions, veuillez nous contacter
          </p>
          <div className="box">
            <input type="text" placeholder="Entrer votre email" />
            <a href="#" className="btn">
              Envoyer
            </a>
          </div>
        </section>
      </body>
      <Footer></Footer>
    </>
  );
}
