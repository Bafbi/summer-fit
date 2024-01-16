import Link from "next/link";
import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
  return (
    <div className="min-h-screen">
      <header className="p-4 flex items-center bg-tertiary justify-between">
        <div className="flex items-center">
          <img
            src="/votre-logo.png"
            alt="Logo"
            className="w-10 h-10 mr-2"
          />
          <h1 className="text-2xl font-bold text-center">Bienvenue sur SummerFit</h1>
        </div>
        <Link href="/deconnexion" className="text-white text-lg font-semibold hover:underline focus:outline-none focus:ring focus:ring-purple-300 px-4 py-2 rounded-md"> Déconnexion </Link>
      </header>
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center p-4">
          <p>
            Cette page est conçue avec amour en utilisant React.
          </p>
          <p>
            N'hésitez pas à personnaliser cette page selon vos besoins !
          </p>
        </div>
      </div>
    </div>
  );
}
