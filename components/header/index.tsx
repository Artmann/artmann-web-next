import Link from 'next/link';
import React, { ReactElement } from 'react';

export default function Header(): ReactElement {
  return (
    <nav className="brand flex justify-between mb-16 items-baseline">
      <div className="uppercase text-gray-900 text-xl">
        <Link href="/">
          <a>
            <span className="text-red-500">Christoffer</span> Artmann
          </a>
        </Link>
      </div>
      <div className="flex uppercase text-sm text-gray-700">
        <div className="mx-2">
          <Link href="/">
            <a className="hover:underline">
              Articles
            </a>
          </Link>
        </div>
        <div className="mx-2">
          <Link href="/projects">
            <a className="hover:underline">
              Projects
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
