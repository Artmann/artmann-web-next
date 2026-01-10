import Head from 'next/head'
import { ReactElement } from 'react';

import Container from '../components/container';
import Header from '../components/header';

interface Library {
  description: string;
  icon: string;
  name: string;
  
  github?: string;
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

      { library.github && (
        <p className="mb-4">
          <a href={ gitHubUrl } className="text-sm text-red-500 hover:text-red-700">
            { gitHubUrl }
          </a>
        </p>
      )}
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
      name: 'Esix',
      github: 'Artmann/esix',
      description: 'A really slick ORM for MongoDB.',
      icon: icons.typescript,
      homepage: 'https://esix.netlify.app/'
    },
    {
      name: 'Pull Panda',
      github: 'Artmann/pull-panda-desktop',
      description: 'Delightful code reviews.',
      homepage: 'https://pullpanda.io/',
      icon: 'https://pullpanda.io/logo-transparent.png'
      
    },
    {
      name: 'Steam Revenue Calculator',
      github: 'Artmann/steam-revenue-calculator',
      description: 'A revenue calculates for Steam games.',
      icon: icons.react
    },
    {
      name: 'Gustavs Kitchen',
      homepage: 'https://www.gustavskitchen.se/',
      description: 'Learn how to cook tasty food.',
      icon: icons.react
    },
    {
      name: 'Bitesized',
      homepage: 'https://www.bitesized.app/',
      description: 'Digital menu platform that lets restaurants create beautiful, mobile-friendly QR code menus they can update instantly from their phone.',
      icon: icons.react
    },
    {
      name: 'PMKIN',
      description: 'PMKIN makes content creation effortless with an intuitive editor that lets your team focus on writing. Centralize all your content, seamlessly integrate with Next.js, and publish updates faster—without bottlenecks or code.',
      homepage: 'https://pmkin.io/',
      icon: icons.react
    },
    {
      name: 'Resume Rocket',
      homepage: 'https://resumerocket.io/',
      description: 'ResumeRocket.io is an innovative platform redefining the resume-building experience by leveraging AI technology to create personalized, impactful resumes. It aims to simplify the resume creation process, making it efficient and effective, with a mission to help users land their dream job. The platform offers AI-driven content and layout suggestions, ensuring resumes resonate with hiring managers and embody the professional journey of each user. Additionally, it provides ATS-compliant templates, combining aesthetics with functionality to enhance job seekers\' chances in the competitive market.',
      icon: 'https://resumerocket.io/images/resume-rocket-logo-small.webp'
    },
    {
      name: 'Building Things With Javascript',
      homepage: 'https://buildingthingswithjavascript.com/',
      description: 'Resources and tutorials for learning JavaScript, TypeScript and React.',
      icon: icons.react
    },
    {
      name: 'Tiny TypeScript Logger',
      github: 'Artmann/tiny-typescript-logger',
      description: 'Get wonderful colorized log messages straight into your terminal.',
      icon: icons.typescript
    },
    {
      name: 'React Shared Storage',
      github: 'Artmann/react-shared-storage',
      description: 'React Shared Storage is built to be a simple way for storing state in the browsers local storage. It will keep your state synced between different components and different windows and tabs.',
      icon: icons.react
    },
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
    }
  ];

  return (
    <>
      <Head>
        <title>Projects - Christoffer Artmann</title>
      </Head>

      <Header />

      <Container>
        <div className="border-b border-gray-300 pb-8 mb-8 pt-8">
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
    </>
  );
}
