'use client'

import React, { useEffect, useRef, ReactElement,useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

import { env } from "~/env";
import { link } from "fs";

const render = (status: Status): ReactElement => {
  if (status === Status.FAILURE) return <span>nul</span>;
  return <span>load</span>;
};

// Styles personnalisés pour la carte
const customMapStyles: google.maps.MapTypeStyle[] = [
  // Insérez ici le tableau de styles que vous avez fourni
  
    {
        "featureType": "all",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "weight": "2.00"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#9c9c9c"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#eeeeee"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#7b7b7b"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#46bcec"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#c8d7d4"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#070707"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    }
]
  // ... Autres styles ...
  const MyMapComponent = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [selectedMarker, setSelectedMarker] = useState<any>(null); // Pour stocker le marqueur sélectionné
    const [markersData] = useState([
      {
        id: 1,
        lat: 50.633333,
        lng: 3.066667,
        title: "Salle Lille 1",
        link: "/poule",
        address: "123 Rue de Lille, Lille",
        openingHours: "Lun-Ven: 8h-20h, Sam-Dim: 10h-18h",
      },
      {
        id: 2,
        lat: 50.633333,
        lng: 3.066667,
        title: "Salle Lille 2",
        link: "/poule",
        address: "456 Avenue des Sports, Lille",
        openingHours: "Lun-Ven: 7h-22h, Sam-Dim: 9h-17h",
      },
      // Ajoutez d'autres données de salle ici
    ]);
  
    const map = useRef<google.maps.Map | null>(null); // Référence à l'objet de carte
  
    useEffect(() => {
      if (ref.current && typeof google !== "undefined") {
        map.current = new google.maps.Map(ref.current, {
          center: { lat: 50.633333, lng: 3.066667 },
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
  
        markersData.forEach((markerData) => {
          const marker = new google.maps.Marker({
            position: { lat: markerData.lat, lng: markerData.lng },
            map: map.current,
            title: markerData.title,
            icon: {
              url: "/Localisation.png",
              size: new google.maps.Size(40, 40),
              scaledSize: new google.maps.Size(20, 20),
            },
          });
  
          // Ajouter un écouteur d'événement pour centrer la carte sur le marqueur lorsque le marqueur est cliqué
          marker.addListener("click", () => {
            setSelectedMarker(markerData); // Définir le marqueur sélectionné au clic
          });
        });
      }
    }, []);
  
    // Utilisez useEffect pour centrer la carte lorsque selectedMarker change
    useEffect(() => {
      if (selectedMarker && map.current) {
        const marker = new google.maps.Marker({
          position: { lat: selectedMarker.lat, lng: selectedMarker.lng },
          map: map.current,
          title: selectedMarker.title,
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
  
    return (
      <div className="flex flex-col md:flex-row px-4">
        {/* Menu déroulant à gauche de la carte */}
        <div className="w-full md:w-1/4 p-4 overflow-y-auto max-h-screen">
          <h2 className="text-lg font-semibold mb-2">Salles</h2>
          <select
            className="block w-full p-2 border border-gray-300 rounded-md"
            onChange={(e) => {
              const selectedId = parseInt(e.target.value);
              const selectedMarkerData = markersData.find(
                (markerData) => markerData.id === selectedId
              );
              setSelectedMarker(selectedMarkerData);
            }}
            aria-label="Sélectionnez une salle"
          >
            <option value="">Sélectionnez une salle</option>
            {markersData.map((markerData) => (
              <option key={markerData.id} value={markerData.id}>
                {markerData.title}
              </option>
            ))}
          </select>
          {selectedMarker && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">{selectedMarker.title}</h3>
              <p className="text-sm text-gray-500">{selectedMarker.address}</p>
              <p className="text-sm text-gray-500">{selectedMarker.openingHours}</p>
            </div>
          )}
        </div>
        {/* Carte à droite (pour mobile et ordinateur) */}
        <div className="w-full md:w-full md:max-w-[400px] border border-gray-300 mt-4 md:mt-0 md:ml-72 md:mr-2">
        <div ref={ref} className="h-[400px]" />
        </div>
      </div>
    );
  };
  
  const MyApp = () => (
    <div className="h-screen">
      <header className="ml-10 mt-5 md:mt-20">
        <h1 className="text-3xl md:text-5xl font-bold">Nous trouver</h1>
      </header>
      <Wrapper apiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} render={render}>
        <MyMapComponent />
      </Wrapper>
    </div>
  );
  
  export default MyApp;