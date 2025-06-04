import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  Script
} from 'next/document'

import { Fragment } from 'react'
import { trackingId } from '../lib/google-analytics'

export default class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    const isProduction = process.env.NODE_ENV === 'production'

    return {
      ...initialProps,
      isProduction
    }
  }

  render() {
    const { isProduction } = this.props as any

    return (
      <Html>
        <Head>
          <link
            rel="preconnect"
            href="https://fonts.googleapis.com"
          />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />

          {isProduction && (
            <Fragment>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', '${trackingId}', {
                      page_path: window.location.pathname,
                    });
                  `
                }}
              />
            </Fragment>
          )}

          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&family=Special+Elite&display=swap"
            rel="stylesheet"
          />

          <meta
            name="og:title"
            content="Christoffer Artmann"
          />
          <meta
            name="description"
            content="I'm a software engineer and product builder. I write about software development, product management, and personal growth."
          />
          <meta
            name="og:description"
            content="I'm a software engineer and product builder. I write about software development, product management, and personal growth."
          />
          <meta
            name="og:type"
            content="website"
          />
          <meta
            name="og:url"
            content="https://artmann.co"
          />
          <meta
            name="og:image"
            content="https://www.artmann.co/images/artmann-og-image.png"
          />
        </Head>
        <body className="text-gray-700 antialiased">
          <Main />
          <NextScript />

          <Script
            id="analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `!(function(t,e){var o,n,p,r;e.__SV||(window.analytics=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)));}};((p=t.createElement("script")).type="text/javascript",p.async=!0,p.src="https://nick-barth.github.io/browser/browser.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r));var u=e;for(void 0!==a?u=e[a]=[]:a="analytics",u.toString=function(t){var e="analytics";return"analytics"!==a&&(e+="."+a),t||(e+=" (stub)"),e},o="init track pageview".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a]);},e.__SV=1);})(document,window.analytics||[]);window.analytics.init('eyJhbGciOiJIUzI1NiJ9.eyJwcm9qZWN0SWQiOiIwM2NlZmNlYS0zNDEwLTQ2YjAtYTMyOS0yNmUzYTg2ZmIyNGEiLCJpYXQiOjE3NDkwNzA0MTksImV4cCI6MTc4MDYyODAxOX0.1B9wjQ9acIb2hCyemRvh0Wu1zAfutJVnbeap7OrZeZA');`,
            }}
          />
        </body>
      </Html>
    )
  }
}
