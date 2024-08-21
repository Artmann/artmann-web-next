---
title: Using React Portals with TypeScript
blurb:
  In React, components are typically rendered within their parent DOM hierarchy,
  but sometimes you need more control. React Portals allow you to break out of
  the standard DOM structure, letting you render components anywhere on the
  page. This post shows how to use Portals for flexible rendering.
imageUrl: /images/covers/toast-portal.webp
publishedAt: 2024-08-20
status: Published
tags: TypeScript, React, JavaScript, Toast
---

Normally, when you work in a React app, you don't have to think too much about
the DOM and your place in it. You just create your elements, and React will make
sure that they end up in the right place in the tree.

This is usually an awesome part of React, but sometimes, you need to break out
of your component and render a component somewhere else. You might want to
render a modal and its overlay at the top level of the page, or you might want
to render a tooltip outside of its parent to avoid clipping. Here is where
Portals come in handy. A React Portal is a function that lets you take your JSX
and render it as a child of another element anywhere in the DOM.

The `react-dom` package contains a
[createPortal](https://react.dev/reference/react-dom/createPortal) function that
we can use:

```tsx
createPortal(children, domNode, key?)

```

Let's say that we have a `<Toast />` component, and we want to render it as a
child of the `<body>` tag, regardless of where in the component stack it's
rendered. We can wrap our JSX inside of the `createPortal` function and pass
`window.document.body` as the second argument:

```tsx
import { ReactPortal } from 'react'
import { createPortal } from 'react-dom'

interface ToastProps {
  isVisible: boolean
  message: string
}

export const Toast = ({
  isVisible,
  message
}: ToastProps): ReactPortal | null => {
  if (!isVisible) {
    return null
  }

  return createPortal(
    <div className="toast">{message}</div>,
    window.document.body
  )
}
```

> Notice that the `ReactPortal` type comes from the `react` package while the
> `createPortal` function is provided by `react-dom`.

Even though we render the `<Toast />` inside the app `<div>` when you inspect
the page, you will see that the toast element is added as a child to the body.

```tsx
import { Toast } from './Toast'

import './styles.css'

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Toast
        isVisible={true}
        message="This is a toast."
      />
    </div>
  )
}
```

We can add even more control to where the `<Toast />` is rendered by adding a
Ref parameter to its properties.

```tsx
import { ReactPortal, RefObject } from 'react'
import { createPortal } from 'react-dom'

interface ToastProps {
  containerRef?: RefObject<HTMLElement>
  isVisible: boolean
  message: string
}

export const Toast = ({
  containerRef,
  isVisible,
  message
}: ToastProps): ReactPortal | null => {
  if (!isVisible) {
    return null
  }

  const container = containerRef?.current ?? window.document.body

  return createPortal(<div className="toast">{message}</div>, container)
}
```

Now that our `<Toast />` component accepts a ref, we can create a container and
a respective ref and pass it to the `<Toast />` component.

> Remember that you have to pass `null` as a parameter to `createRef()` to get
> the correct type.

```tsx
import { useRef } from 'react'
import { Toast } from './Toast'

import './styles.css'

export default function App() {
  const toastContainerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <div ref={toastContainerRef} />
      <Toast
        containerRef={toastContainerRef}
        isVisible={true}
        message="This is a toast."
      />
    </div>
  )
}
```

Even though our container `<div>` and our `<Toast />` components are rendered
side by side in the React world when you look to add the DOM, the toast element
will be rendered inside the container.

<img alt="A cube coming out of a portal" height="auto" loading="lazy" src="/images/box-in-portal.webp" width="100%" />
