'use client';
import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import ReactDOM from 'react-dom';

export function QRReservation(props: { reservationId: string }) {
  const [showPopup, setShowPopup] = useState(false);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  if (showPopup) {
    return (
      <>
        <div onClick={openPopup} className="cursor-pointer">
          <QRCode value={props.reservationId} />
        </div>

        {ReactDOM.createPortal(
          <div className="fixed top-0 left-0 right-0 bottom-0  flex justify-center items-center">
            <div className="bg-[#eeeff0] rounded-lg p-4">
              <QRCode value={props.reservationId} size={256} />
              <button
                className="bg-[#444] ml-[25%] text-white px-8 my-4 py-2 rounded-lg transition-transform transform  active:scale-95"
                onClick={closePopup}
              >
                Fermer
              </button>
            </div>
          </div>,
          document.body
        )}
      </>
    );
  } else {
    return (
      <div onClick={openPopup} className="cursor-pointer">
        <QRCode value={props.reservationId} />
        <i className="bx bx-search cursor-pointer absolute bottom-4 right-4 text-white"></i>
      </div>
    );
  }
}
