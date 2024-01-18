import Link from "next/link";
import React from "react";
import '~/styles/globals.css';
import { Card, CardFooter, CardBody } from "@nextui-org/react";
import Image from "next/image";
import { api } from "~/trpc/server";
import Tableau from "../_components/organisms/tableau";

export default async function Home() {
  const salles = await api.halls.getAll.query();

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto mt-8">
        <div className="md:flex justify-between">
          <div className="md:w-0/1 ml-20 mb-4 mt-20 md:mb-0">
            <Card className="w-full h-auto p-4 bg-background-100">
              <CardBody className="overflow-visible">
                <div className="flex items-center justify-center">
                  <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src="/assets/images/creersalle.jpg"
                    width={400} // Largeur de l'image
                    height={300} // Hauteur de l'image
                  />
                </div>
              </CardBody>
              <CardFooter className="pb-0 pt-2 px-4 flex-col items-center">
                <Link
                  href="/administrateur/CreerSalle"
                  className="text-default text-center text-primary" id="button"
                >
                  Créer votre Salle SummerFit
                </Link>
              </CardFooter>
            </Card>
          </div>
          <div className="md:w-1/2 mr-20 mt-20 col-md-6">
            <div className="p-4 bg-white rounded shadow-md">
              <Tableau salles={salles} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
