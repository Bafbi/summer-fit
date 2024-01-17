import Link from "next/link";

import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import CardProject from "~/app/_components/molecules/CardProject";
import Adidas from "~/../public/assets/images/Adidass.png";
import Fond from "~/../public/assets/images/Fond.png";

export default async function Home() {
  const projects = [
    {
      projectId: 1,
      startup: "Unitevent",
      description: "La soirée en un clic !",
      expertise: "Application sur-mesure",
      image: Fond,
      logo: Adidas,
      link: "/ok",
    },
    {
      projectId: 2,
      startup: "Unitevent",
      description: "La soirée en un clic !",
      expertise: "Application sur-mesure",
      image: Fond,
      logo: Adidas,
      link: "#",
    },
    {
      projectId: 3,
      startup: "Unitevent",
      description: "La soirée en un clic !",
      expertise: "Application sur-mesure",
      image: Fond,
      logo: Adidas,
      link: "#",
    },
    {
      projectId: 4,
      startup: "Unitevent",
      description: "La soirée en un clic !",
      expertise: "Application sur-mesure",
      image: Fond,
      logo: Adidas,
      link: "#",
    },
    {
      projectId: 5,
      startup: "Unite",
      description: "La soirée en un clic !",
      expertise: "Application sur-mesure",
      image: Fond,
      logo: Adidas,
      link: "#",
    },
    {
      projectId: 6,
      startup: "Unitevent",
      description: "La soirée en un clic !",
      expertise: "Application sur-mesure",
      image: Fond,
      logo: Adidas,
      link: "#",
    },
  ];

  const hello = await api.post.hello.query({ text: "from tRPC" });
  const session = await getServerAuthSession();

  let userRole = null;
  if (session) {
    userRole = await api.user.getRole.query();
  }

  return (
    //? Liste des projets réalisés

    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Create <span className="text-primary">T3</span> App
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
            href="https://create.t3.gg/en/usage/first-steps"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">First Steps →</h3>
            <div className="text-lg">
              Just the basics - Everything you need to know to set up your
              database and authentication.
            </div>
          </Link>
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
            href="https://create.t3.gg/en/introduction"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">Documentation →</h3>
            <div className="text-lg">
              Learn more about Create T3 App, the libraries it uses, and how to
              deploy it.
            </div>
          </Link>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl text-white">
            {hello ? hello.greeting : "Loading tRPC query..."}
          </p>

          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center text-2xl text-white">
              {session && (
                <span>
                  Logged in as {session.user?.name} : {userRole?.role}
                </span>
              )}
            </p>
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            >
              {session ? "Sign out" : "Sign in"}
            </Link>
          </div>
        </div>

      </div>

      <div className="mx-auto max-w-5xl px-16 max-md:px-6">
        <div className="grid grid-cols-2 gap-x-10 gap-y-10 max-md:grid-cols-1 max-md:gap-x-7 max-md:gap-y-5">
          {projects.map((project) => (
            <CardProject
              key={project.projectId}
              startup={project.startup}
              description={project.description}
              expertise={project.expertise}
              image={project.image}
              logo={project.logo}
              link={project.link}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

