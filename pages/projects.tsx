import Head from 'next/head'
import { ReactElement } from 'react';

import Container from '../components/container';

interface Library {
  description: string;
  github: string;
  icon: string;
  name: string;
  
  homepage?: string;
}

interface LibraryItemProps {
  library: Library;
}

function LibraryItem({ library }: LibraryItemProps): ReactElement {
  const gitHubUrl = `https://github.com/${ library.github }`;
  
  const Homepage = (): ReactElement | null => library.homepage  ? (
      <p className="mb-4">
        <a href={ library.homepage } className="text-sm text-red-500 hover:text-red-700">
          { library.homepage }
        </a>
      </p>
  ) : null;

  return (
    <div className="mb-12">
      <div className="flex items-center mb-4">
        <img alt="icon" className="block mr-4 w-8 h-8" src={ library.icon } />
        <h3 className="block text-xl m-0">{ library.name }</h3>
      </div>

      <p className="mb-4 max-w-lg">
        { library.description }
      </p>

      <Homepage />
      
      <p className="mb-4">
        <a href={ gitHubUrl } className="text-sm text-red-500 hover:text-red-700">
          { gitHubUrl }
        </a>
      </p>
    </div>
  );
}

export default function Home(): ReactElement {
  const icons = {
    go: 'https://i.imgur.com/brBvDH5.png',
    javascript: 'https://cdn4.iconfinder.com/data/icons/scripting-and-programming-languages/512/js-512.png',
    python: 'https://i.imgur.com/jhHz8Py.png',
    react: 'https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png',
    ruby: 'https://avatars0.githubusercontent.com/u/19463480?s=512&v=4',
    typescript: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1024px-Typescript_logo_2020.svg.png'
  };

  const libraries: Library[] = [
    {
      name: 'Blender Batch FBX Exporter',
      github: 'Artmann/blender-batch-fbx-exporter',
      description: 'This add-on lets you export your selected objects into separate FBX files which will be named according to the objects names in the hierarchy.',
      icon: icons.python
    },
    {
      name: 'Correlations',
      github: 'Artmann/correlations',
      description: 'Command line utility for calculating Pearson Correlation Coefficients.',
      icon: icons.ruby
    },
    {
      name: 'Effectful',
      github: 'Artmann/effectful',
      description: 'The easy way to handle side effects in Redux.',
      icon: icons.react
    },
    {
      name: 'Esix',
      github: 'Artmann/esix',
      description: 'A really slick ORM for MongoDB.',
      icon: icons.typescript
    },
    {
      name: 'Fuzzy Comparison',
      github: 'Artmann/fuzzy-comparison',
      description: 'Do you need to know if two strings are kind of the same? This package compares two string and tells you if they are similar enough.',
      icon: icons.javascript
    },
    {
      name: 'React & Koa Template',
      github: 'Artmann/react-koa-template',
      description: 'This template hooks you up with everything you need to build a React SPA with a Koa backend.',
      icon: icons.typescript
    },
    {
      name: 'Run Occasionally',
      github: 'Artmann/run-occasionally',
      description: 'Runs commands on a schedule.',
      icon: icons.go
    },
    {
      name: 'Steam Revenue Calculator',
      github: 'Artmann/steam-revenue-calculator',
      description: 'A tool used to estimate sales for a game released on Steam.',
      icon: icons.react
    }
  ];

  return (
    <Container>

      <Head>
        <title>Projects - Christoffer Artmann</title>
      </Head>

      <div className="border-b border-gray-300 pb-8 mb-8">
        <h1 className="text-3xl mb-4">
          Projects
        </h1>

        <p>
          I like to build stuff. 😊 So here's a list of things that I've helped build. 🚀
        </p>
      </div>

      <div className="pb-8 mb-8">
        { libraries.map((library, index) => <LibraryItem library={ library } key={ index } /> )}
      </div>


    </Container>
  );
}
