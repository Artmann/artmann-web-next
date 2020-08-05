import { ReactElement } from 'react';

import 'highlight.js/styles/gruvbox-dark.css';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }): ReactElement {
  return (
      <Component {...pageProps} />
  );
}
