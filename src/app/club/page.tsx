import Footer from "../_components/organisms/Footer";
import Header from "../_components/organisms/Header";
import CardProject from "../_components/molecules/CardProject";
import Fond from "~/../public/assets/images/fond.png"
import Adidas from "~/../public/assets/images/Adidass.png"
import React from 'react';
import '~/styles/accueil.css'; // Import your CSS file

const App = () => {
    
    const projects = [
        {
          projectId: 1,
          startup: 'Unitevent',
          description: 'La soirée en un clic !',
          expertise: 'Application sur-mesure',
          image: Fond,
          logo: Adidas,
          link: '/ok',
        },
        {
          projectId: 2,
          startup: 'Unitevent',
          description: 'La soirée en un clic !',
          expertise: 'Application sur-mesure',
          image: Fond,
          logo: Adidas,
          link: '#',
        },
        {
          projectId: 3,
          startup: 'Unitevent',
          description: 'La soirée en un clic !',
          expertise: 'Application sur-mesure',
          image: Fond,
          logo: Adidas,
          link: '#',
        },
        {
          projectId: 4,
          startup: 'Unitevent',
          description: 'La soirée en un clic !',
          expertise: 'Application sur-mesure',
          image: Fond,
          logo: Adidas,
          link: '#',
        },
        {
          projectId: 5,
          startup: 'Unite',
          description: 'La soirée en un clic !',
          expertise: 'Application sur-mesure',
          image: Fond,
          logo: Adidas,
          link: '#',
        }, 
        {
          projectId: 6,
          startup: 'Unitevent',
          description: 'La soirée en un clic !',
          expertise: 'Application sur-mesure',
          image: Fond,
          logo: Adidas,
          link: '#',
        },
      ];
  return (
    <>
    <Header></Header>
    <div className="max-w-5xl mx-auto px-16 max-md:px-6">
        <div className="grid grid-cols-2 gap-x-10 gap-y-10 max-md:gap-x-7 max-md:gap-y-5 max-md:grid-cols-1">
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
      <Footer></Footer>
    </>
  );
};

export default App;

