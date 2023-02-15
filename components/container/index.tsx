import React, { ReactElement, Fragment } from 'react'

import Footer from '../footer'

interface ContainerProps {
  children: string | ReactElement | ReactElement[]
}

export default function Container(props: ContainerProps): ReactElement {
  return (
    <Fragment>
      <div className="container mx-auto p-4 pb-8 md:py-8 max-w-4xl">
        { props.children }
      </div>

      <Footer />
    </Fragment>
  )
}
