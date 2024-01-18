"use client";

import { Status, Wrapper } from "@googlemaps/react-wrapper";
import { Salle } from "@prisma/client";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { env } from "~/env";
import { RouterOutputs } from "~/trpc/shared";
import { CreateReservation } from "../api/create-reservation";

const customMapStyles: google.maps.MapTypeStyle[] = [
  // Insérez ici le tableau de styles que vous avez fourni

  {
    featureType: "all",
    elementType: "geometry.fill",
    stylers: [
      {
        weight: "2.00",
      },
    ],
  },
  {
    featureType: "all",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#FFFFFF",
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "all",
    stylers: [
      {
        color: "#FFFF",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "all",
    stylers: [
      {
        saturation: -100,
      },
      {
        lightness: 45,
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#eeeeee",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#7b7b7b",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "all",
    stylers: [
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [
      {
        color: "#ee8bf7",
      },
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ee8bf7 ",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#070707",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
];

function MapComponent(props : {salles: RouterOutputs["halls"]["getAll"]}) {
  const { salles } = props;
  const ref = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<Salle | null>(null);
  const [searchTerm, setSearchTerm] = useState(""); // Ajouté pour la barre de recherche


  const [showPopup, setShowPopup] = useState(false); // État pour le popup

  // Gestionnaire de clic pour le bouton de réservation
  const handleReservationClick = () => {
    setShowPopup(true); // Afficher le popup
  };

  const filteredSalles = salles.filter((salle) =>
  salle.name.toLowerCase().includes(searchTerm.toLowerCase())
);  


const handleSalleClick = (salle: Salle) => {
  setSelectedMarker(salle);
  setSearchTerm(""); // Réinitialiser la barre de recherche
  
};
  const defaultLocation: google.maps.LatLngLiteral = {
    lat: 50.6333,
    lng: 3.0667,
  };

  const initializeMap = (position: GeolocationPosition | null) => {
    let center: google.maps.LatLngLiteral;

    if (position) {
      center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    } else {
      center = defaultLocation; // Utiliser la position par défaut de Lille
    }
    if (ref.current) {
      map.current = new google.maps.Map(ref.current, {
        center: center,
        zoom: 11,
        styles: customMapStyles,
        streetViewControl: false,
        rotateControl: false,
        scaleControl: false,
        zoomControl: false,
        mapTypeControl: false,
        panControl: false,
        fullscreenControl: true,
      });

      props.salles.forEach((salle) => {
        const marker = new google.maps.Marker({
          position: { lat: salle.latitude, lng: salle.longitude },
          map: map.current,
          title: salle.name,
          icon: {
            url: "/Localisation.png",
            size: new google.maps.Size(40, 40),
            scaledSize: new google.maps.Size(20, 20),
          },
        });

        // Ajouter un écouteur d'événement pour centrer la carte sur le marqueur lorsque le marqueur est cliqué
        marker.addListener("click", () => {
          setSelectedMarker(salle); // Définir le marqueur sélectionné au clic
        });
      });
    }
  };
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => initializeMap(position),
        () => initializeMap(null), // Géolocalisation échouée, utiliser Lille par défaut
      );
    } else {
      console.error(
        "La géolocalisation n'est pas prise en charge par ce navigateur",
      );
      initializeMap(null);
    }
  }, []);
  // Utilisez useEffect pour centrer la carte lorsque selectedMarker change
  useEffect(() => {
    if (selectedMarker && map.current) {
      const marker = new google.maps.Marker({
        position: { lat: selectedMarker.latitude, lng: selectedMarker.longitude },
        map: map.current,
        title: selectedMarker.name,
        icon: {
          url: "/Localisation.png",
          size: new google.maps.Size(40, 40),
          scaledSize: new google.maps.Size(20, 20),
        },
      });

      if (map.current && marker) {
        map.current.panTo(marker.getPosition()!);
      }
    }
  }, [selectedMarker]);

  const [isGood, setIsGood] = useState(true)



  const closePopup = () => {
    setShowPopup(false); // Cacher le popup
  };
  

  
  const ReservationPopup = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded shadow-lg">
        <h2>Réservation pour {selectedMarker?.name}</h2>
        <CreateReservation salleId="65a7972b05b02b0409551ffb" />

        <button onClick={() => setShowPopup(false)} className="mt-4 bg-red-500 hover:bg-red-700 text-black font-bold py-2 px-4 rounded">
          Fermer
        </button>
      </div>
    </div>
  );
  return (
      <div className="flex flex-col px-4 md:flex-row">
        <div className="relative max-h-screen w-full overflow-y-auto p-4 md:w-1/4">
          <h2 className="mb-2 text-lg font-semibold">Nos salles : </h2>
          <input
            type="text"
            placeholder="Recherchez une salle"
            className="border-gray-300 block w-full rounded-md border p-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Recherchez une salle"
          />
          <div className={`absolute z-10 mt-1 bg-white w-full rounded-md shadow-lg ${searchTerm ? 'block' : 'hidden'}`}>
            {searchTerm && filteredSalles.map((salle) => (
              <div
                key={salle.id}
                onClick={() => handleSalleClick(salle)}
                className="cursor-pointer hover:bg-gray-200 p-2"
              >
                {salle.name}
              </div>
            ))}
          </div>
          <div className={`mt-${searchTerm ? filteredSalles.length * 8 : 0} p-2`}>
            {selectedMarker && (
      
          <div className="mt-4">
            <h3 className="text-lg font-semibold">{selectedMarker.name}</h3>
            <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
</svg>

      {selectedMarker.adresse}
    </div>
   
            <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
       <span> {selectedMarker.heure_ouverture[0]}-{selectedMarker.heure_fermeture[0]}</span>
    </div>
    <div className="flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
      </svg>
      {selectedMarker.num_tel}
    </div>
            <p className="text-gray-500 text-sm">
              Capacité de : {selectedMarker.capacite}
            </p>
            <p className="text-gray-500 text-sm">
              {selectedMarker.nbr_coach} coach(s) disponible
            </p>
          <button
            onClick={handleReservationClick}
            className="mt-4 py-2 px-4"
          >
            Réserver un créneau
          </button>
          </div>
            )}
             {showPopup && <ReservationPopup />}
      </div>
      </div>
      <div className="border-gray-300 mt-4 w-full border md:ml-72 md:mr-2 md:mt-0 md:w-full md:max-w-[400px]">
        <div ref={ref} className="h-[400px]" />
      </div>
    </div>
  );
}
export default function Map(props : {salles: RouterOutputs["halls"]["getAll"]}) {
  return (
    <Wrapper apiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} render={render}>
      <MapComponent salles={props.salles} />
    </Wrapper>
  );
}

const render = (status: Status): ReactElement => {
  if (status === Status.FAILURE) return <span>nul</span>;
  return <span>load</span>;
};
