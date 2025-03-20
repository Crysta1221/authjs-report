"use client";

import Image from "next/image";
import { useState } from "react";

export function SigninImage() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className='relative overflow-hidden hidden lg:flex lg:w-7/12 xl:w-8/12'>
      <div
        className={`absolute inset-0 bg-gray-200 ${
          isLoaded ? "opacity-0" : "opacity-100"
        } transition-opacity duration-500`}
      />
      <Image
        src='/signin.png'
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        alt='Signin'
        priority
        quality={70}
        loading='eager'
        fill
        sizes='(max-width: 768px) 100vw, 75vw'
        onLoadingComplete={() => setIsLoaded(true)}
      />
      <div className='absolute bottom-4 left-4 text-white bg-black bg-opacity-50 p-2 rounded'>
        <p className='text-xs font-mono'>lorem ipsum</p>
      </div>
    </div>
  );
}
