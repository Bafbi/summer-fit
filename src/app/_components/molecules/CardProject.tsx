`use client`;

import React from 'react';
import Link from 'next/link';
import Image, { type StaticImageData } from 'next/image';

type CardProjectProps = {
  startup: string;
  description: string;
  ouverture: string;
  image: StaticImageData;
  link: string;
};

const CardProject = ({
  startup,
  description,
  ouverture,
  image,
  link,
}: CardProjectProps) => {
  return (
    <Link
      href={link}
      className="p-6 rounded-lg bg-[#eeeff0] hover:bg-background-200 group"
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
      </div>
      <div className="flex">
        <h2 className="text-[#7945f7] font-semibold text-2xl pr-3">
          {startup}
        </h2>
      </div>
      <p className="text-[14px] text-[#444] font-light pt-1">
        {description}
      </p>

      <p className="text-[14px] text-[#767575] font-light pt-1">
        {ouverture}
      </p>
    </Link>
  );
};

export default CardProject;
