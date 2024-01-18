import Footer from "./_components/organisms/Footer";
import Header from "./_components/organisms/Header";
import React from 'react';
import '~/styles/accueil.css'; 

const App = () => {
  return (
    <>
    <Header></Header>
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css" />
        <link rel="shortcut icon" type="image/x-icon" href="/ScrapBienIci/front-end/image/Logo.png" />
        <title>Site officiel BIEN LÀ-BAS® - Annonces immobilières</title>
      </head>
      <body>
        {/* Home */}
        <section className="home" id="home">
          <div className="text">
            <h1>Find Your Dream<br /><span>House By Us</span></h1>
            <p>We offers a wide range of the highest quality and provide<br />a new place to live has become much more comfortable.</p>
            <div className="app-stores">
              <img src="assets/images/App Store.png" alt="Apple Store" />
              <img src="assets/images/Google Play.png" alt="Google Play" />
            </div>
          </div>

          {/* Forms */}
          <div className="form-container">
            <form action="announcement.html">
              <div className="input-box">
                <span>Acheter</span>
                <input type="search" name="" id="" placeholder="Dans quelle ville?" />
              </div>
              <div className="input-box">
                <span>Budget</span>
                <input type="search" name="" id="" placeholder="Votre budget max ?" />
              </div>
              <input type="submit" name="Search" id="" className="btn" />
              <a href="search.html">Recherche avancée</a>
            </form>
          </div>
        </section>

        {/* Advantage */}
        <section className="advantage" id="advantage">
          <div className="heading">
            <span>Our advantage</span>
            <h1>Our Special Service</h1>
          </div>
          <div className="advantage-container">
            <div className="box">
              <i className="bx bxs-shield-minus"></i>
              <h2>Your holidays in peace</h2>
              <p>Get 24/7 support with our warranty</p>
            </div>
            <div className="box">
              <i className="bx bxs-shopping-bag"></i>
              <h2>Book with Confidence</h2>
              <p>More unforgettable moments from booking</p>
            </div>
            <div className="box">
              <i className="bx bxs-coffee"></i>
              <h2>All the privacy of a home</h2>
              <p>Enjoy full kitchens, pools, gardens, and more</p>
            </div>
            <div className="box">
              <i className="bx bxs-credit-card-front"></i>
              <h2>Much more than a vacation rental</h2>
              <p>More space, privacy, and all the amenities you need</p>
            </div>
          </div>
        </section>

        {/* About Us */}
        <section className="about" id="about">
          <div className="heading">
            <span>About Us</span>
            <h1>We are Trusted Real Estate Agent</h1>
          </div>
          <div className="about-container">
            <div className="about-img">
              <img src="assets/images/about.png" alt="mockup" />
            </div>
            <div className="about-text">
              <span>Extra Security</span>
              <p>We provide security cameras, whether you get one that <br /> connects to your phone, is triggered by motion detection,<br /> has night vision, or two-way talking capabilities.</p>
              <span>Best Price</span>
              <p>We focus on offering the best prices on quality properties to you <br /> with friendly service. Browse your selection or come in and visit<br /> us at one of our 3 convenient locations</p>
              <a href="" className="btn">Learn More</a>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <div className="reviews" id="reviews">
          <div className="heading">
            <span>Reviews</span>
            <h1>Whats Our Customer Say</h1>
          </div>
          <div className="reviews-container">
            <div className="box">
              <div className="rev-img">
                <img src="assets/images/Client1.jpg" alt="Client1" />
              </div>
              <h2>Hervé.M</h2>
              <div className="stars">
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
              </div>
              <p>Nous sommes ravis de cette location. L'appartement est très bien placé, grand, lumineux et fonctionnel.Le grand canapé est aussi très confortable après une longue journée de marche. Je recommande cette location très confortable et l'appartement est d'époque.</p>
            </div>
            <div className="box">
              <div className="rev-img">
                <img src="assets/images/Client2.jpg" alt="Client2" />
              </div>
              <h2>Juliette.L</h2>
              <div className="stars">
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star-half"></i>
              </div>
              <p>Bien situé, facile d’accès, près du métro. Un ventilateur portatif sera apprécié par temps chaud.</p>
            </div>
            <div className="box">
              <div className="rev-img">
                <img src="assets/images/Client3.jpg" alt="Client3" />
              </div>
              <h2>Claire.T</h2>
              <div className="stars">
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star"></i>
                <i className="bx bxs-star-half"></i>
              </div>
              <p>Appartement très joli, propre et bien situé, propriétaire joignable dès que l'on a une demande.</p>
            </div>
          </div>
        </div>
      </body>
      <Footer></Footer>
    </>
  );
};

export default App;
