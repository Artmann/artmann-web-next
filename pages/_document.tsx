import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext
} from 'next/document'
import Script from 'next/script'


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

        </body>
      </Html>
    )
  }
}
