`use client`;

import React from 'react';
import Link from 'next/link';
import Image, { type StaticImageData } from 'next/image';

type CardProjectProps = {
  startup: string;
  description: string;
  expertise: string;
  image: StaticImageData;
  logo: StaticImageData;
  link: string;
};

const CardProject = ({
  startup,
  description,
  expertise,
  image,
  logo,
  link,
}: CardProjectProps) => {
  return (
    <Link
      href={link}
      className="p-6 rounded-lg bg-background-100 hover:bg-background-200 group"
    >
      <div className="relative">
        <div className="relative overflow-hidden brightness-75 pt-[75%] rounded-lg group-hover:brightness-100">
          <Image
            src={image}
            alt="Fond Startup"
            loading="lazy"
            className="absolute top-[0%] transition-transform duration-300 ease-in-out group-hover:scale-110"
          />
        </div>
        <div className="absolute bottom-4 right-4 w-[15%]">
          <Image
            src={logo}
            alt="Logo Startup"
            className="w-full object-contain opacity-50"
          />
        </div>
      </div>
      <div className="flex pt-3">
        <h2 className="text-[#ccdae7] font-semibold text-2xl pr-3">
          {startup}
        </h2>
        <div className="w-full text-right">
          <span className="text-[0.75em] text-[#a7b5c4] text-right py-1.5 px-3 inline-block rounded bg-background-300">
            {expertise}
          </span>
        </div>
      </div>
      <p className="text-[14px] text-[#a7b5c4] font-light pt-1">
        {description}
      </p>
    </Link>
  );
};

export default CardProject;
