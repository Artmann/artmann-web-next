import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { ReactElement } from 'react'

import Footer from '../components/footer'
import { Article, articleService } from '../lib/article-service'
import { loadArticles } from '../lib/article-service/article-loader'

interface Project {
  title: string
  blurb: string
  href: string
  tag: string
}

const featuredProjects: Project[] = [
  {
    title: 'PMKIN',
    blurb:
      'Effortless content creation. Centralize content, integrate with Next.js, ship updates without bottlenecks.',
    href: 'https://pmkin.io/',
    tag: 'Product'
  },
  {
    title: 'Pull Panda',
    blurb: 'Delightful code reviews for teams that ship.',
    href: 'https://pullpanda.io/',
    tag: 'Tooling'
  },
  {
    title: 'Esix',
    blurb: 'A really slick ORM for MongoDB. TypeScript-first.',
    href: 'https://esix.netlify.app/',
    tag: 'Library'
  },
  {
    title: 'Bitesized',
    blurb:
      'Digital menu platform. Beautiful mobile-friendly QR menus restaurants update instantly from their phone.',
    href: 'https://www.bitesized.app/',
    tag: 'Product'
  }
]

interface HomeProps {
  articles: Article[]
}

export const getStaticProps: GetStaticProps = async () => {
  const articles = await loadArticles()

  return {
    props: {
      articles
    }
  }
}

export default function Home({ articles }: HomeProps): ReactElement {
  const [feature, ...rest] = articles
  const issueDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  })

  return (
    <>
      <Head>
        <title>Christoffer Artmann — Issue Nº 04</title>
      </Head>

      <div className="bg-paper text-ink min-h-screen">
        <Masthead issueDate={issueDate} />

        <Hero article={feature} />

        <SectionRule
          number="01"
          label="Writing"
        />
        <ArticlesStrip articles={rest} />

        <SectionRule
          number="02"
          label="Building"
        />
        <ProjectsStrip projects={featuredProjects} />

        <Footer />
      </div>
    </>
  )
}

function Masthead({ issueDate }: { issueDate: string }): ReactElement {
  return (
    <header className="border-b-4 border-ink">
      <div className="flex items-center justify-between px-6 md:px-12 py-3 text-xs tabular-nums uppercase tracking-widest">
        <span>Issue Nº 04</span>
        <span className="hidden md:block">
          A magazine of writing & building
        </span>
        <span>{issueDate}</span>
      </div>

      <div className="border-t border-ink/30 flex items-stretch px-6 md:px-12 py-6 md:py-10 gap-6">
        <div className="flex-1">
          <h1 className="font-display text-5xl md:text-8xl lg:text-9xl leading-none tracking-tight">
            ARTMANN.
          </h1>
        </div>
        <div className="hidden md:flex flex-col items-end justify-between text-right">
          <div className="flex gap-1">
            <span className="block w-4 h-4 bg-accent-red" />
            <span className="block w-4 h-4 bg-accent-yellow" />
            <span className="block w-4 h-4 bg-accent-blue" />
            <span className="block w-4 h-4 bg-ink" />
          </div>
          <nav className="flex gap-6 text-sm uppercase tracking-widest font-semibold">
            <Link href="/">Posts</Link>
            <Link href="/projects">Projects</Link>
            <a href="https://linktr.ee/chrisartmann">Contact</a>
          </nav>
        </div>
      </div>
    </header>
  )
}

function Hero({ article }: { article: Article }): ReactElement {
  if (!article) {
    return <div />
  }

  return (
    <section className="border-b-4 border-ink px-6 md:px-12 py-12 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
        <div className="md:col-span-5 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="block w-8 h-8 bg-accent-red" />
            <span className="text-xs uppercase tracking-widest font-semibold">
              Cover Story
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[0.95] tracking-tight uppercase break-words hyphens-auto">
            <Link href={articleService.getPath(article)}>{article.title}</Link>
          </h2>
          <p className="text-lg md:text-xl max-w-md leading-snug">
            {article.blurb}
          </p>
          <Link
            href={articleService.getPath(article)}
            className="self-start inline-flex items-center gap-3 bg-ink text-paper px-5 py-3 text-sm uppercase tracking-widest font-bold hover:bg-accent-red"
          >
            Read the story →
          </Link>
        </div>

        <div className="md:col-span-7 relative">
          <div className="absolute -top-4 -left-4 w-24 h-24 md:w-32 md:h-32 bg-accent-yellow z-0" />
          <div className="absolute -bottom-4 -right-4 w-16 h-16 md:w-24 md:h-24 bg-accent-blue z-0" />
          <img
            alt={article.title}
            className="relative z-10 w-full aspect-[4/3] object-cover border-4 border-ink"
            src={article.imageUrl}
          />
        </div>
      </div>
    </section>
  )
}

function SectionRule({
  number,
  label
}: {
  number: string
  label: string
}): ReactElement {
  return (
    <div className="bg-ink text-paper px-6 md:px-12 py-4 flex items-center gap-6">
      <span className="font-display text-2xl md:text-3xl tabular-nums">
        {number}
      </span>
      <span className="text-sm md:text-base uppercase tracking-[0.3em] font-semibold">
        {label}
      </span>
      <span className="flex-1 border-t border-paper/40" />
    </div>
  )
}

function ArticlesStrip({ articles }: { articles: Article[] }): ReactElement {
  const accents = ['bg-accent-yellow', 'bg-accent-red', 'bg-accent-blue']

  return (
    <section className="px-6 md:px-12 py-12 md:py-16 border-b-4 border-ink">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
        {articles.map((article, index) => (
          <ArticleTile
            key={article.title}
            article={article}
            number={String(index + 2).padStart(2, '0')}
            accent={accents[index % accents.length]}
          />
        ))}
      </div>
    </section>
  )
}

function ArticleTile({
  article,
  number,
  accent
}: {
  article: Article
  number: string
  accent: string
}): ReactElement {
  return (
    <article className="flex flex-col gap-4">
      <div className="relative">
        <div className={`absolute -top-3 -left-3 w-12 h-12 ${accent} z-0`} />
        <img
          alt={article.title}
          className="relative z-10 w-full aspect-[4/3] object-cover border-2 border-ink"
          loading="lazy"
          src={article.imageUrl}
        />
      </div>
      <div className="flex items-baseline gap-3 text-xs uppercase tracking-widest">
        <span className="font-display text-lg tabular-nums">{number}</span>
        <span className="font-semibold">Essay</span>
      </div>
      <h3 className="font-display text-2xl md:text-3xl leading-[0.95] uppercase tracking-tight">
        <Link
          href={articleService.getPath(article)}
          className="hover:text-accent-red"
        >
          {article.title}
        </Link>
      </h3>
      <p className="text-base leading-snug">{article.blurb}</p>
    </article>
  )
}

function ProjectsStrip({
  projects
}: {
  projects: Project[]
}): ReactElement {
  if (projects.length === 0) {
    return <div />
  }

  const [hero, ...others] = projects

  return (
    <section className="px-6 md:px-12 py-12 md:py-16 border-b-4 border-ink">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
        <a
          href={hero.href}
          className="lg:col-span-2 bg-accent-yellow border-4 border-ink p-8 md:p-12 flex flex-col justify-between min-h-[20rem] hover:bg-accent-red hover:text-paper transition-colors"
        >
          <span className="text-xs uppercase tracking-widest font-bold">
            Featured · {hero.tag}
          </span>
          <div className="flex flex-col gap-4 mt-12">
            <h3 className="font-display text-5xl md:text-7xl leading-[0.9] uppercase tracking-tight">
              {hero.title}
            </h3>
            <p className="text-lg max-w-xl leading-snug">{hero.blurb}</p>
            <span className="text-sm uppercase tracking-widest font-bold mt-2">
              Visit →
            </span>
          </div>
        </a>

        <div className="flex flex-col gap-6 md:gap-8">
          {others.map((project) => (
            <a
              key={project.title}
              href={project.href}
              className="border-4 border-ink p-6 flex-1 flex flex-col gap-2 hover:bg-ink hover:text-paper transition-colors"
            >
              <span className="text-xs uppercase tracking-widest font-bold">
                {project.tag}
              </span>
              <h4 className="font-display text-2xl md:text-3xl uppercase leading-[0.95]">
                {project.title}
              </h4>
              <p className="text-sm leading-snug">{project.blurb}</p>
            </a>
          ))}
        </div>
      </div>

      <div className="mt-10 flex justify-end">
        <Link
          href="/projects"
          className="inline-flex items-center gap-3 bg-ink text-paper px-5 py-3 text-sm uppercase tracking-widest font-bold hover:bg-accent-red"
        >
          See all projects →
        </Link>
      </div>
    </section>
  )
}
