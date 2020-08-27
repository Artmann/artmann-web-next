import React, { ReactElement, Fragment } from 'react';

import Footer from '../footer';
import Header from '../header';

interface ContainerProps {
  children: string | ReactElement | ReactElement[];
}

export default function Container(props: ContainerProps): ReactElement {
  return (
    <Fragment>
      <div className="container mx-auto p-4 pb-8 md:py-8 max-w-4xl">
        <Header />

        { props.children }
      </div>

      <Footer />
    </Fragment>
  );
}
