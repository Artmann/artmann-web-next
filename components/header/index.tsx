import Link from 'next/link';
import React, { ReactElement } from 'react';

export default function Header(): ReactElement {
  return (
    <nav className="brand flex justify-between mb-16 items-baseline">
      <div className="uppercase text-gray-900 text-xl">
        <Link href="/">
          <span className="text-red-500">Christoffer</span> Artmann
        </Link>
      </div>
      <div className="flex uppercase text-sm text-gray-700">
        <div className="mx-2">
          <Link className="hover:underline" href="/">
            Articles
          </Link>
        </div>
        <div className="mx-2">
          <Link className="hover:underline" href="/projects">
            Projects
          </Link>
        </div>
      </div>
    </nav>
  );
}
