import Footer from "../_components/organisms/Footer";
import Header from "../_components/organisms/Header";
import CardProject from "../_components/molecules/CardProject";
import Salle from "~/../public/assets/images/Salle.jpg";
import React from 'react';
import '~/styles/accueil.css'; // Import your CSS file

const App = () => {
  const projects = [
    {
      projectId: 1,
      startup: 'National 2',
      description: '2 rue National, Lille',
      ouverture : ' 8h - 18h',
      image: Salle,
      link: '/ok',
    },
    {
      projectId: 2,
      startup: 'National 2',
      description: '2 rue National, Lille',
      ouverture : ' 8h - 18h',
      image: Salle,
      link: '/ok',
    }
  ];

  return (
    <>
      <Header />
      <div className="max-w-5xl mx-auto px-16 max-md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10 max-md:gap-x-7 max-md:gap-y-5">
          {/* Right Column - List of Projects */}
          <div className="grid grid-cols-1 gap-y-10 max-md:gap-y-5">
            {projects.map((project) => (
              <CardProject
                key={project.projectId}
                startup={project.startup}
                description={project.description}
                ouverture={project.ouverture}
                image={project.image}
                link={project.link}
              />
            ))}
          </div>

          {/* Left Column - Google Map */}
          <div>
            <span>rdcftgvbjhnkdxfcgvbjhnk,esrxdcftvgybuhjnikdrtfvygbuhjnesrdtfvgybuhesrdtfvgybuhzsedrtfgvybuhnesrdtfvgybuhjn r(ftygedrf tbgyuhedtrfvbgyuhn'ed(rftbgyuhnjiedrftbgyuhnji</span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;


