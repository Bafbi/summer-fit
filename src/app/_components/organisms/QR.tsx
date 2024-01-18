'use client'
import QRCode from "qrcode.react";
import { useState } from "react";

import { api } from "~/trpc/react";

export function QRReservation(props: { reservationId: string }) {
  const [showPopup, setShowPopup] = useState(false);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <div onClick={openPopup} className="cursor-pointer">
        <QRCode value={props.reservationId} />
      </div>

      {showPopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75 flex justify-center items-center">
          <div className="bg-white rounded-lg p-4">
            <QRCode value={props.reservationId} size={256} />
            <button
              className="bg-primary text-white px-4 py-2 mt-4 rounded-full hover:bg-primary-dark"
              onClick={closePopup}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </>
  );
}
