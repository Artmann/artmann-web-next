import React, { ReactElement } from 'react'
import {
  FiGithub,
  FiInstagram,
  FiLink,
  FiLinkedin,
  FiTwitter
} from 'react-icons/fi'

import Campfire from '../delight/campfire'
import ParticleField from '../delight/particle-field'
import RangerBadge from '../delight/ranger-badge'
import Treeline from '../delight/treeline'

export default function Footer(): ReactElement {
  const socials = [
    { icon: FiGithub, url: 'https://github.com/artmann/' },
    { icon: FiInstagram, url: 'https://www.instagram.com/christofferartmann/' },
    { icon: FiLinkedin, url: 'https://www.linkedin.com/in/chistoffer-artmann' },
    { icon: FiTwitter, url: 'https://twitter.com/chrisartmann' },
    { icon: FiLink, url: 'https://linktr.ee/chrisartmann' }
  ]

  return (
    <footer className="mt-8">
      <div className="-mb-px">
        <Treeline />
      </div>

      <div
        className="relative flex flex-col text-white px-16 pb-16 pt-8 justify-center items-center text-center"
        style={{ background: '#71222f' }}
      >
        <ParticleField
          className="absolute inset-0 h-full w-full"
          mode="fireflies"
        />

        <RangerBadge
          className="absolute right-[8%] top-10 hidden -rotate-6 lg:block"
          size={88}
        />

        <Campfire
          className="absolute bottom-4 left-4 md:bottom-6 md:left-10"
          size={48}
        />

        <div className="relative z-10 flex flex-col items-center">
          <div className="flex-shrink-0 mb-4">
            <img
              alt="Christoffer Artmann"
              className="w-16 h-16 rounded-full shadow-lg md:w-24 md:h-24"
              src="/images/christoffer-artmann.jpg"
            />
          </div>

          <div className="flex flex-col items-center gap-2">
            <h3 className="text-xl m-0 text-white">Hi, I&apos;m Chris!</h3>

            <p className="text-sm m-0">
              I&apos;m a Software Engineer and Product Manager living in sunny
              Barcelona.
            </p>

            <p className="text-sm m-0">
              If you want to chat, you can find me on all the social platforms.
            </p>

            <div className="flex gap-4 mt-4 text-2xl justify-center items-center">
              {socials.map((social, index) => {
                return (
                  <a
                    href={social.url}
                    key={index}
                  >
                    <social.icon />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
