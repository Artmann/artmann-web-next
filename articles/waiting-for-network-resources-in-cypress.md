---
title: Waiting for network resources in Cypress
blurb: When you are dynamically loading resources such as Javascript and CSS, you might run into timing issues. Here we take a look at what we can do to combat those issues.
imageUrl: /images/covers/cypress-waiting.png
publishedAt: 2019-06-20
status: Published
tags: Javascript, Cypress, Performance, Testing
---

As our app consists of a couple of different bundles and a bunch of chunks, we noticed that our Cypress test suite was a bit flaky. Dynamically loading different Javascript and CSS files caused our test to fail due to timing issues.

Looking into a bit more we found that when we are calling `cy.visit()` to navigate to a page, we were ending up with tests that were randomly failing due to not all Javascript being loaded yet.

If you look at the documentation for `cy.visit` it says

> cy.visit() yields the window object after the page finishes loading.

While this is true, if you dig a bit deeper you'll realize that it yields on the window's on-load event. This will probably work well in most cases but as we are throttling our Javascript load we encounter some problems where not all the code that we need is downloaded when the on-load event is called.

Cypress has a `route` command that can be used to wait for and/or mock requests, but it only triggers on XHR request so it will do us no good as we are loading resources using link and script tags.

If you are curious about which request works with the `route` command you can use the `whitelist` property of `cy.server` to list them.

```js
cy.server({
  whitelist: request => {
     console.log(request);

     return false;
  };
});

cy.visit('/');
```

The Cypress team are working on a new network stubbing layer that will give us more control and granularity and that would probably make this task a lot easier but it still seems to be quite far away from being released.

If you are interested you can find out more in [Issue 687](https://github.com/cypress-io/cypress/issues/687).

It looks like we will have to build our own command, that will wait for resources to load. At first, it might be a bit unclear on how to track which resources are loaded via Javascript, at least it was for me. The idea of using a Service Worker to track the completion of requests and signal the app via `postMessage` was floated but seemed a bit too complicated.

We are in luck though, as the new Performance API has functions for measuring the loading time of different resources, and for us to be able to measure the time, the resource has to be loaded, right?

Using the `performance.getEntriesByType` function, we will end up with a list of already loaded resources, such as Javascript and CSS files.

If we continuously query the Performance API we'll know when a resource has been added to the list and we can continue on with our test case.

With a quick look at the Cypress documentation, we were are able to come up with a [custom command](https://docs.cypress.io/api/cypress-api/custom-commands.html) that waits for a resource to load.

```js
function waitForResourceToLoad(fileName, type) {
  const resourceCheckInterval = 40;

  return new Cypress.Promise(resolve => {
    const checkIfResourceHasBeenLoaded = () => {
      const resource = cy.state('window')
        .performance.getEntriesByType('resource')
        .filter(entry => !type || entry.initiatorType === type)
        .find(entry => entry.name.includes(fileName));

      if (resource) {
        resolve();

        return;
      }

      setTimeout(checkIfResourceHasBeenLoaded, resourceCheckInterval);
    };

    checkIfResourceHasBeenLoaded();
  });
}

Cypress.Commands.add('waitForResource', waitForResource);
```

We do a couple of things here that might be worth noting. First, we access the window object by using `cy.state`. This is due to the nature of the Cypress test runner. Using the global window object we will be operating on the test runners window, which won't have the data we need. By accessing it via `cy.state` we are able to get the applications window object, which lives within an iframe.

As well as a `fileName` of the resource we are waiting for, we also pass a `type` argument to the function. This is because when you are using Webpack's dynamic imports to load Javascript, it will use a link tag to preload the content and this will cause our Promise resolve once the script is preloaded and not when it's loaded.

Therefore, when we wait for dynamic imports we have to make sure we wait for the resource initiated by the script tag.

```js
cy.waitForResourceToLoad('dynamicly-loaded-bundle.js', 'script');
```

We can also use this command to wait for CSS files whose loading is deferred, to make sure that all our styles are applied before continuing.

```js
cy.visit('/');
cy.scrollTo(0, 500);

cy.waitForResourceToLoad('below-the-fold.css');
```

With this new command, we were able to replace a lot of arbitrary `cy.wait` commands from our tests, while making it more reliable.

I would love to know if you found this helpful and what kind of scenarios with dynamic resource loading you encountered writing Cypress tests for your application. Please leave a comment below. 😄
