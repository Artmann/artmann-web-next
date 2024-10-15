---
title: Building a Javascript Countdown Timer
blurb: Learn how to build a countdown timer for your app using Javascript.
imageUrl: /images/covers/countdown-timer.webp
publishedAt: 2018-11-26
status: Published
tags: requestAnimationFrame, Javascript
---

How do you build a countdown timer for your app that allows you to pause it and
start it again, and design it in such a way it's easy to extend with different
events in the future?

<p data-height="265" data-theme-id="light" data-slug-hash="qQqbOa" data-default-tab="result" data-user="Artmann" data-pen-title=" Countdown Timer" class="codepen">See the Pen <a href="https://codepen.io/Artmann/pen/qQqbOa/"> Countdown Timer</a> by Christoffer Artmann (<a href="https://codepen.io/Artmann">@Artmann</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

The simplest approach I can imagine is to save the time the user clicked the
start button, then use `setInterval` to continuously update the label.

```js
const duration = 10
let startTime

const label = document.querySelector('.time')

document.querySelector('button').addEventListener('click', () => {
  startTime = Date.now()

  setInterval(() => {
    const t = Math.ceil(duration - (Date.now() - startTime) / 1000)
    label.innerHTML = Math.max(0, t)
  }, 200)
})
```

This solution works well but if we want to expand on our timer like adding the
ability to pause the countdown, for example, we will quickly see that this
approach has a lot of limitations.

The other thing that bugs me about this approach is the use of `setInterval`. I
used an arbitrary interval of 200 milliseconds here, and this value will always
we a compromise.

To increase the accuracy of our timer, we want that value to be as low as
possible, setting it to zero would be awesome as it would be executed on the
next run of the event loop. But as we lower the value we also negatively impact
the performance of our page.

Fortunately for us, there is another function we can use and it's.
**window.requestAnimationFrame**. As the name implies it's primary use is to
give you a callback that you can use for animations. After calling
`requstAnimationFrame` with a callback, the next time the browser wants to do a
repaint it will run your callback before it continues to the repaint. This is
perfect when we want to do to animations that feels really smooth at a higher
framerate. The added bonus is that calls to `requestAnimationFrame` are paused
in most browsers when running in background tabs or hidden Iframes in order to
improve performance and battery life.

So now we have a better way to handle the timing, but we still need a more
stable approach to keep track of the elapsed time. What we can do is that every
time we run our function, we calculate the time since the last time we ran it.
This is usually called the **Delta time**. Then at every iteration, we aggregate
the delta time with all the previous delta times.

```js
const elapsed = 0
const lastTimestamp = 0

const tick = () => {
  const timestamp = Date.now()
  const deltaTime = timestamp - lastTimestamp
  lastTimestamp = timestamp

  elapsed += deltaTime / 1000

  window.requestAnimationFrame(tick)
}

tick()
```

Now it's super easy for us to control if the timer should run or not.

```js
if (isActive) {
  elapsed += deltaTime / 1000
}
```

We also have a good place to hook in when we want to update the DOM.

```js
const label = document.querySelector('.time');
const onTick = time => {
	label.innerHTML = Math.ceil(time);
}

...

if (isActive) {
	elapsed += deltaTime / 1000;
	const time = Math.max(duration - elapsed, 0);
	onTick(time);
}
```

Adding all the pieces together and encapsulating it in a class, it looks
something like this.

<p data-height="265" data-theme-id="light" data-slug-hash="qQqbOa" data-default-tab="js" data-user="Artmann" data-pen-title=" Countdown Timer" class="codepen">See the Pen <a href="https://codepen.io/Artmann/pen/qQqbOa/"> Countdown Timer</a> by Christoffer Artmann (<a href="https://codepen.io/Artmann">@Artmann</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

If you have any questions or found this helpful, please leave a comment below!
😃 👋
