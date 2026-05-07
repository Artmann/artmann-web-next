import type { Metadata } from 'next'
import type { ReactElement } from 'react'
import { FiArrowUpRight, FiGithub } from 'react-icons/fi'

import Footer from '../../components/footer'
import Header from '../../components/header'

export const metadata: Metadata = {
  title: 'Projects - Christoffer Artmann'
}

type Accent = 'burgundy' | 'ochre' | 'teal' | 'plum' | 'forest' | 'slate'
type Size = 'featured' | 'tall' | 'wide' | 'standard'

interface Project {
  name: string
  tagline: string
  description: string
  tech: string[]
  accent: Accent
  size: Size

  github?: string
  homepage?: string
}

const accentStyles: Record<Accent, { stripe: string; glow: string; text: string }> = {
  burgundy: {
    stripe: 'bg-[#71222f]',
    glow: 'from-[#71222f]/12 via-[#71222f]/4 to-transparent',
    text: 'text-[#71222f]'
  },
  ochre: {
    stripe: 'bg-amber-700',
    glow: 'from-amber-700/12 via-amber-700/4 to-transparent',
    text: 'text-amber-800'
  },
  teal: {
    stripe: 'bg-teal-700',
    glow: 'from-teal-700/12 via-teal-700/4 to-transparent',
    text: 'text-teal-800'
  },
  plum: {
    stripe: 'bg-purple-800',
    glow: 'from-purple-800/12 via-purple-800/4 to-transparent',
    text: 'text-purple-900'
  },
  forest: {
    stripe: 'bg-emerald-800',
    glow: 'from-emerald-800/12 via-emerald-800/4 to-transparent',
    text: 'text-emerald-900'
  },
  slate: {
    stripe: 'bg-slate-700',
    glow: 'from-slate-700/12 via-slate-700/4 to-transparent',
    text: 'text-slate-800'
  }
}

const sizeClasses: Record<Size, string> = {
  featured: 'md:col-span-2 lg:col-span-4 lg:row-span-2',
  tall: 'md:col-span-2 lg:col-span-2 lg:row-span-2',
  wide: 'md:col-span-2 lg:col-span-4 lg:row-span-1',
  standard: 'md:col-span-1 lg:col-span-2 lg:row-span-1'
}

const techDot: Record<string, string> = {
  TypeScript: 'bg-blue-500',
  JavaScript: 'bg-yellow-400',
  React: 'bg-cyan-500',
  'Next.js': 'bg-black',
  Go: 'bg-cyan-600',
  Python: 'bg-blue-600',
  Ruby: 'bg-red-600',
  'C#': 'bg-purple-700',
  Unity: 'bg-zinc-900',
  MongoDB: 'bg-green-600',
  Koa: 'bg-emerald-600',
  Electron: 'bg-slate-600',
  Tauri: 'bg-amber-600',
  Blender: 'bg-orange-500',
  AI: 'bg-purple-500',
  MCP: 'bg-purple-600',
  Chrome: 'bg-yellow-500',
  CLI: 'bg-zinc-700',
  Desktop: 'bg-zinc-700',
  iOS: 'bg-zinc-800',
  PWA: 'bg-indigo-500'
}

const projects: Project[] = [
  {
    name: 'Pull Panda',
    tagline: 'A native-feeling home for code review.',
    description:
      'A desktop app that reimagines GitHub code review around the things that actually matter: readable diffs, threaded conversations, and keyboard-driven navigation. Less context-switching, more shipping.',
    tech: ['TypeScript', 'React', 'Electron'],
    accent: 'teal',
    size: 'featured',
    homepage: 'https://pullpanda.io/',
    github: 'Artmann/pull-panda-desktop'
  },
  {
    name: 'Esix',
    tagline: 'A really slick MongoDB ORM for TypeScript.',
    description:
      'An ergonomic MongoDB ORM that brings ActiveRecord-style ease to TypeScript without giving up MongoDB’s flexibility. Clean APIs for queries, relations, and migrations — with the type-safety you’d expect.',
    tech: ['TypeScript', 'MongoDB'],
    accent: 'forest',
    size: 'tall',
    homepage: 'https://www.esixorm.com/introduction',
    github: 'Artmann/esix'
  },
  {
    name: 'Steam Revenue Calculator',
    tagline: 'Back-of-the-envelope earnings for any Steam game.',
    description:
      'Plug in a store URL and get a quick revenue estimate based on review counts, price, and refund rates. A handy gut-check tool for indie devs and curious analysts trying to size up the market.',
    tech: ['TypeScript', 'React'],
    accent: 'plum',
    size: 'tall',
    github: 'Artmann/steam-revenue-calculator'
  },
  {
    name: 'Gustavs Kitchen',
    tagline: 'Approachable recipes for hungry home cooks.',
    description:
      'A friendly cooking site with step-by-step guides for food that actually tastes good — minus the cheffy fuss. Built for people who want to enjoy cooking, not perform it.',
    tech: ['TypeScript', 'React'],
    accent: 'ochre',
    size: 'tall',
    homepage: 'https://www.gustavskitchen.se/'
  },
  {
    name: 'Blender Batch FBX Exporter',
    tagline: 'Export every selected object as its own FBX.',
    description:
      'A Blender add-on that exports each selected object into its own FBX file, named after the object’s position in the hierarchy. A quiet time-saver for anyone shipping assets to Unity or Unreal.',
    tech: ['Python', 'Blender'],
    accent: 'burgundy',
    size: 'tall',
    github: 'Artmann/blender-batch-fbx-exporter'
  },
  {
    name: 'Airhorn',
    tagline: 'Marketing intelligence for indie game studios.',
    description:
      'A growing database of content creators paired with marketing tools built specifically for game devs. Find the right streamers and YouTubers for your title, plan campaigns, and ship a launch without needing a full marketing team.',
    tech: ['TypeScript', 'Next.js', 'React'],
    accent: 'slate',
    size: 'tall',
    homepage: 'https://www.useairhorn.com/'
  },
  {
    name: 'PMKIN',
    tagline: 'A headless CMS that gets out of the writer’s way.',
    description:
      'PMKIN makes content creation effortless with an intuitive editor that lets your team focus on writing instead of fighting tooling. Centralize all your content, integrate seamlessly with Next.js, and ship updates without bottlenecks or developer hand-offs.',
    tech: ['TypeScript', 'Next.js', 'React'],
    accent: 'burgundy',
    size: 'tall',
    homepage: 'https://pmkin.io/'
  },
  {
    name: 'Resume Rocket',
    tagline: 'AI-built resumes that actually land interviews.',
    description:
      'An AI-powered resume builder that drafts personalized, ATS-compliant resumes tuned to the job a candidate is going after. Smart layout and content suggestions help job seekers tell a stronger story — fast.',
    tech: ['TypeScript', 'React', 'AI'],
    accent: 'plum',
    size: 'tall',
    homepage: 'https://resumerocket.io/'
  },
  {
    name: 'Squeal',
    tagline: 'A modern SQL workbench for desktop. (WIP)',
    description:
      'An in-progress desktop SQL editor and workbench, aiming to do for databases what good code editors did for code: keyboard-driven, fast, and quietly powerful — without the bloat of legacy enterprise tooling.',
    tech: ['TypeScript', 'Desktop'],
    accent: 'teal',
    size: 'wide',
    github: 'Artmann/squeal'
  },
  {
    name: 'Bitesized',
    tagline: 'QR menus restaurants can update from their phone.',
    description:
      'A digital menu platform that lets restaurants spin up beautiful, mobile-friendly QR menus in minutes — and update them instantly without printing a single thing. Built for kitchens that change specials daily, not yearly.',
    tech: ['TypeScript', 'React', 'PWA'],
    accent: 'ochre',
    size: 'wide',
    homepage: 'https://www.bitesized.app/'
  },
  {
    name: 'No Cap Food Rankings',
    tagline: 'Vote head-to-head on the world’s best cuisines.',
    description:
      'Rank the world’s cuisines through head-to-head matchups and watch a 100% scientific leaderboard emerge for which country actually has the best food. A silly, addictive ranking app that quietly tells you something true.',
    tech: ['TypeScript', 'React', 'Next.js'],
    accent: 'ochre',
    size: 'tall',
    homepage: 'https://no-cap-food-rankings.vercel.app/'
  },
  {
    name: 'Web Developer MCP',
    tagline: 'Give your AI agent a real browser.',
    description:
      'An MCP server that lets AI agents drive a real browser — navigate pages, click elements, fill forms, inspect the DOM, and read the console. Closes the loop between code generation and visual verification.',
    tech: ['TypeScript', 'MCP', 'AI'],
    accent: 'slate',
    size: 'tall',
    github: 'Artmann/web-developer-mcp'
  },
  {
    name: 'Package Registry MCP',
    tagline: 'Search npm, PyPI, Cargo & more from your agent.',
    description:
      'An MCP server that lets Claude, Cursor, and other AI agents look up package details, versions, and security advisories across npm, PyPI, Cargo, NuGet, and Go — without leaving the editor.',
    tech: ['TypeScript', 'MCP', 'AI'],
    accent: 'forest',
    size: 'tall',
    github: 'Artmann/package-registry-mcp'
  },
  {
    name: 'Website to Markdown',
    tagline: 'Snip any page to clean markdown, instantly.',
    description:
      'A Chrome extension that copies any website’s content as clean, readable markdown — perfect for pasting into LLMs, saving to your notes, or feeding into your agents.',
    tech: ['TypeScript', 'Chrome'],
    accent: 'plum',
    size: 'standard',
    homepage: 'https://pullpanda.io/tools/website-to-markdown'
  },
  {
    name: 'Building Things With JavaScript',
    tagline: 'Practical lessons from real JavaScript projects.',
    description:
      'Tutorials, deep dives, and resources for getting better at JavaScript, TypeScript, and React — drawn from things I’ve actually shipped, not toy examples.',
    tech: ['JavaScript', 'TypeScript', 'React'],
    accent: 'slate',
    size: 'wide',
    homepage: 'https://buildingthingswithjavascript.com/'
  },
  {
    name: 'Breeze',
    tagline: 'Tailwind for Unity’s UI Toolkit.',
    description:
      'A Tailwind-style stylesheet tool for Unity’s UI Toolkit — utility-first styling for game UI so you can iterate on layouts as quickly as you would on a website.',
    tech: ['C#', 'Unity'],
    accent: 'teal',
    size: 'standard',
    github: 'Artmann/Breeze'
  },
  {
    name: 'Tiny TypeScript Logger',
    tagline: 'Colorized terminal logs, zero dependencies.',
    description:
      'A tiny zero-dependency logger that produces colorized, leveled output in your terminal. Drop it into any TypeScript project for nicer logs without pulling in a heavy library.',
    tech: ['TypeScript', 'CLI'],
    accent: 'burgundy',
    size: 'standard',
    github: 'Artmann/tiny-typescript-logger'
  },
  {
    name: 'React Shared Storage',
    tagline: 'Local-storage state, synced across tabs.',
    description:
      'A small React hook for persisting state to localStorage and keeping it in sync across components, tabs, and windows. The boring problem you didn’t want to solve again.',
    tech: ['React', 'TypeScript'],
    accent: 'forest',
    size: 'standard',
    github: 'Artmann/react-shared-storage'
  },
  {
    name: 'Correlations',
    tagline: 'Pearson coefficients from the command line.',
    description:
      'A small CLI utility that computes Pearson correlation coefficients between columns in a dataset. For when you want a quick numerical answer without spinning up a notebook.',
    tech: ['Ruby', 'CLI'],
    accent: 'slate',
    size: 'standard',
    github: 'Artmann/correlations'
  },
  {
    name: 'Fuzzy Comparison',
    tagline: 'Are these two strings basically the same?',
    description:
      'A tiny package that compares two strings and tells you whether they’re close enough — useful for typo-tolerant matching, deduplication, and fuzzy search.',
    tech: ['JavaScript'],
    accent: 'ochre',
    size: 'standard',
    github: 'Artmann/fuzzy-comparison'
  },
  {
    name: 'React & Koa Template',
    tagline: 'A batteries-included starter for full-stack apps.',
    description:
      'A project template that wires up everything you need to build a React SPA backed by a Koa API — build pipeline, dev server, and sensible defaults included.',
    tech: ['TypeScript', 'React', 'Koa'],
    accent: 'plum',
    size: 'standard',
    github: 'Artmann/react-koa-template'
  },
  {
    name: 'Run Occasionally',
    tagline: 'A friendlier cron, in a single Go binary.',
    description:
      'A tiny Go binary for running commands on a schedule — a lightweight alternative to cron when you just want one or two recurring jobs without a system service.',
    tech: ['Go', 'CLI'],
    accent: 'teal',
    size: 'standard',
    github: 'Artmann/run-occasionally'
  }
]

function TechBadge({ name }: { name: string }): ReactElement {
  const dot = techDot[name] ?? 'bg-gray-400'

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700">
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {name}
    </span>
  )
}

function ProjectCard({ project }: { project: Project }): ReactElement {
  const accent = accentStyles[project.accent]
  const isLarge = project.size === 'featured' || project.size === 'tall'
  const gitHubUrl = project.github ? `https://github.com/${project.github}` : null

  return (
    <article
      className={`
        group relative col-span-1 overflow-hidden rounded-lg border border-gray-200 bg-white
        transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-sm
        ${sizeClasses[project.size]}
      `}
    >
      <div className={`absolute inset-x-0 top-0 h-1 ${accent.stripe}`} />
      <div
        className={`
          pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full
          bg-gradient-to-br ${accent.glow} blur-2xl
        `}
      />

      <div
        className={`
          relative flex h-full flex-col
          ${isLarge ? 'p-7 md:p-8' : 'p-6'}
        `}
      >
        <h3
          className={`
            brand m-0 leading-tight tracking-tight text-gray-900
            ${project.size === 'featured' ? 'text-3xl md:text-4xl' : ''}
            ${project.size === 'tall' ? 'text-2xl md:text-3xl' : ''}
            ${project.size === 'wide' ? 'text-2xl' : ''}
            ${project.size === 'standard' ? 'text-xl' : ''}
          `}
        >
          {project.name}
        </h3>

        <p className={`mt-2 text-sm font-medium ${accent.text}`}>
          {project.tagline}
        </p>

        <p
          className={`
            mt-4 text-gray-600 leading-relaxed
            ${isLarge ? 'text-[15px]' : 'text-sm'}
          `}
        >
          {project.description}
        </p>

        <div className="mt-auto pt-6">
          <div className="mb-4 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <TechBadge
                key={t}
                name={t}
              />
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            {project.homepage && (
              <a
                href={project.homepage}
                className={`
                  inline-flex items-center gap-1 font-medium ${accent.text}
                  transition-transform hover:translate-x-0.5
                `}
              >
                Visit
                <FiArrowUpRight className="text-base" />
              </a>
            )}

            {gitHubUrl && (
              <a
                href={gitHubUrl}
                className="
                  inline-flex items-center gap-1.5 font-medium text-gray-600
                  transition-colors hover:text-gray-900
                "
              >
                <FiGithub className="text-sm" />
                Source
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export default function ProjectsPage(): ReactElement {
  return (
    <>
      <Header />

      <div className="container mx-auto max-w-6xl p-4 pb-8 md:px-8 md:pb-8">
        <div className="mb-12 max-w-2xl pt-16 md:pt-32">
          <h1 className="brand mb-4 text-4xl text-gray-900 md:text-5xl">
            Things I&apos;ve built.
          </h1>

          <p className="text-lg text-gray-600">
            A grab-bag of products, side projects, and small open-source
            libraries — from full apps with real users to the tiny
            utilities that quietly keep things running.
          </p>
        </div>

        <div className="grid grid-flow-dense auto-rows-fr grid-cols-1 gap-4 pb-8 md:grid-cols-2 md:gap-5 lg:grid-cols-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.name}
              project={project}
            />
          ))}
        </div>
      </div>

      <Footer />
    </>
  )
}
