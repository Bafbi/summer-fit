import "~/styles/globals.css";
import { cookies } from "next/headers";
import { TRPCReactProvider } from "~/trpc/react";
import Preloader from "./_components/atoms/Preloader";

export const metadata = {
  title: "Summer Fit® | Gestion de Salle de Sport",
  description: "Application de gestion de salle de sport",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TRPCReactProvider cookies={cookies().toString()}>
        <Preloader></Preloader>
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}