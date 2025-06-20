import Router from 'next/router'
import { ReactElement } from 'react'

import { pageView } from '../lib/google-analytics'
import { Analytics } from '../components/analytics'

import 'highlight.js/styles/github-dark-dimmed.min.css'

import '../styles/globals.css'

Router.events.on('routeChangeComplete', (url: string) => {
  pageView(url)
})

export default function MyApp({ Component, pageProps }): ReactElement {
  return (
    <>
      <Analytics />
      <Component {...pageProps} />
    </>
  )
}
