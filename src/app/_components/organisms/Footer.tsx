// Footer.js
import React from 'react';
import '~/styles/footer.css';

const Footer = () => {
  return (
    <>
      <section className="newsletter">
        <h2>S'abonner à Newsletter</h2>
        <p>Pour plus d'informations sur notre entreprise <br /> ou s'il y en a
          autres questions, veuillez nous contacter
        </p>
        <div className="box">
          <input type="text" placeholder="Entrer votre email" />
          <a href="#" className="btn">
            Envoyer
          </a>
        </div>
      </section>

      {/* CopyRight */}
      <div className="copyright">
        <p>&#169; SUMMER FIT 2024, Tout droit réservés</p>
        <div className="social">
          <a href="#">
            <i className="bx bxl-facebook"></i>
          </a>
          <a href="#">
            <i className="bx bxl-twitter"></i>
          </a>
          <a href="#">
            <i className="bx bxl-instagram"></i>
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
