import React, { ReactElement } from 'react';
import { FiGithub, FiInstagram, FiLinkedin, FiTwitter } from "react-icons/fi";

export default function Footer(): ReactElement {
  const socials = [
    { icon: FiGithub, url: 'https://github.com/artmann/' },
    { icon: FiInstagram, url: 'https://www.instagram.com/christofferartmann/' },
    { icon: FiLinkedin, url: 'https://www.linkedin.com/in/chistoffer-artmann' },
    { icon: FiTwitter, url: 'https://twitter.com/chrisartmann' }
  ];

  return (
    <div
      className="flex flex-col text-white p-16 justify-center items-center text-center mt-8"
      style={{ background: '#71222f' }}
    >
      <div className="flex-shrink-0 mb-4">
        <img
          alt="Christoffer Artmann"
          className="w-16 h-16 rounded-full shadow-lg md:w-24 md:h-24"
          src="/images/christoffer-artmann.jpg"
          />
      </div>
      <div>
        <h3 className="text-xl mt-0 mb-2">
          Hi, I'm Chris!
        </h3>

        <p className="mb-4 text-sm">
          I'm a Software Engineer and Product Manager living in sunny Barcelona.
        </p>

        <p className="mb-6 text-sm">
          If you want to chat, you can find me on all the social platforms.
        </p>

        <div className="flex mb-4 text-2xl justify-center items-center">
            {
              socials.map((social, index) => {
                return (
                  <a href={ social.url } key={ index }>
                    <social.icon className="mr-2" />
                  </a>
                )
              })
            }
          </div>
      </div>
    </div>
  );
}
