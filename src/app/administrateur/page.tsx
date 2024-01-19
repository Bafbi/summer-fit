import Link from "next/link";
import React from "react";
import '~/styles/globals.css';
import { Card, CardFooter, CardBody } from "@nextui-org/react";
import Image from "next/image";
import { api } from "~/trpc/server";
import Header from "../_components/organisms/Header";
import Footer from "../_components/organisms/Footer";
import Tableau from "../_components/organisms/tableau";
import TableauUser from "../_components/organisms/tableauUser";
import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
    const salles = await api.halls.getAll.query();
    const users = await api.utilisateur.getAllUser.query();

    const session = await getServerAuthSession();
  
    return (
      <>
        <Header user={session?.user}></Header>
        <div className="bg-white">
          <div className="container mx-auto mt-8">
            <div className="md:flex justify-between">
              {/* Card à gauche */}
              <div className="md:w-1/2 ml-20 mb-4 mt-40 md:mb-0">
                <Card className="w-full h-auto p-4 bg-[#eeeff0] rounded-xl">
                  <CardBody className="overflow-visible ">
                    <div className="flex items-center justify-center">
                      <Image
                        alt="Card background"
                        className="object-cover p-2 rounded-xl "
                        src="/assets/images/creersalle.jpg"
                        width={400}
                        height={300}
                      />
                    </div>
                  </CardBody>
                  <CardFooter className="pb-0 pt-2 px-4 flex-col items-center">
                    <Link
                      href="/administrateur/CreerSalle"
                      className="text-default text-center text-primary " id="button"
                    >
                      Créer votre Salle Summer Fit
                    </Link>
                  </CardFooter>
                </Card>
              </div>
  
              {/* Tableaux à droite */}
              <div className="md:w-1/2 mr-20 mt-20">
                <div className="pt-0 p-4 bg-white mb-8">
                  <Tableau salles={salles} />
                </div>
                <div className="pt-0 p-4 bg-white">
                  <TableauUser users={users} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </>
    );
  }
  
  