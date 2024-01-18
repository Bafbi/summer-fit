// Footer.js
import React from 'react';
import '~/styles/footer.css';

const Footer = () => {
  return (
    <>
     <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css" />
      {/* CopyRight */}
      <button id="qrCodeContainer">
        <i id="qrCodeIcon" className=' bx qr-scan'></i>
        </button>
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
