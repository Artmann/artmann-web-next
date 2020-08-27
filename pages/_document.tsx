import Document, { DocumentContext, Head, Main, NextScript } from 'next/document';
import { Fragment } from 'react';
import { trackingId } from '../lib/google-analytics';

export default class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const isProduction = process.env.NODE_ENV === 'production';

    return {
      ...initialProps,
      isProduction,
    }
  }

  render() {
    const { isProduction } = this.props as any;

    return (
      <html lang="en">
        <Head>
          {isProduction && (
            <Fragment>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${ trackingId }`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', '${ trackingId }', {
                      page_path: window.location.pathname,
                    });
                  `,
                }}
              />
            </Fragment>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
