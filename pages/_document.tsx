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
      <Html lang="en">
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

          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
          <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&family=Special+Elite&display=swap"
            rel="stylesheet"
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
