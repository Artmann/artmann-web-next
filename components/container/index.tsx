import React, { ReactElement } from 'react';
import Header from '../header';

interface ContainerProps {
  children: string | ReactElement | ReactElement[];
}

export default function Container(props: ContainerProps): ReactElement {
  return (
    <div className="container mx-auto p-4 pb-16 md:py-8 max-w-4xl">
      <Header />

      { props.children }
    </div>
  );
}
