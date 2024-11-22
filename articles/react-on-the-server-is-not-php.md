---
title: React on the server is not PHP
blurb:
  Is server-side JavaScript just PHP all over again? Not so fast! Dive into the
  evolution of web development from PHP to modern full-stack JavaScript
  frameworks. Discover why this isn't a step backward but a leap forward in
  building powerful, efficient web applications.
imageUrl: /images/covers/react-on-the-server-is-not-php.webp
publishedAt: 2024-10-04
status: Published
tags: TypeScript, React, JavaScript, SSR, PHP
---

Today, I wanted to talk about a topic that's been buzzing around Twitter and dev
circles lately. You've probably heard people say, **"Now that we're server-side
rendering JavaScript, it's just PHP all over again!"** 🤔 Well, I want to
explain why I don't think that's quite the case – and why it's actually, it's
pretty darn exciting!

Remember when Internet Explorer was still a thing? (I know, I'm aging myself
here). We were all writing PHP to our heart's content, and life seemed simpler.
But things were different: we weren't building the complex, ambitious apps we
are today. We were solving smaller problems, and that's what people often miss
when they get nostalgic.

Back then, we'd use server-side languages like PHP, Java, or – if you were
really living on the edge – Perl. We'd follow the
[MVC model](https://guides.rubyonrails.org/getting_started.html#mvc-and-you),
popularized by frameworks like Rails and Code Igniter. Our controllers would
fetch data from the database, pass it to a view, and voila, you had rendered a
page. When you visited a URL, you'd get a bunch of HTML, the browser would
render it, and everything was hunky-dory.

But what about interactivity? Well, that's where JavaScript came into play. We'd
use it to enhance the existing elements rendered on the server. Remember
"unobtrusive JavaScript"? 😂 It was all about making the UI work with native
browser primitives and then sprinkling some JS magic on top. Looking back, I
think it might've been an excuse to avoid writing too much JavaScript – and
honestly, who could blame us?

My experience with early JS was a bit of a mixed bag. jQuery made it easy to add
functionality, but the language, much like PHP, wasn't pleasant to work with.
Before ES6, it was pretty terrible to work with. Raise your hand if you remember
`var self2 = this`. And don't even get me started on browser compatibility! 🙈
We tried our best to write as little JavaScript as possible, using it in places
where it was absolutely necessary.

But here's the thing. We wanted to build more stuff. More impressive apps. We
need better functions for our users, and as our apps got more and more
ambitious, we couldn't escape JavaScript. It's the language of the web, after
all! As we built larger and more complex applications in the browser, we started
running into some serious headaches.

For starters, creating your UI on the server and then editing it at runtime with
JavaScript was like trying to pat your head and rub your belly simultaneously –
possible, but not exactly graceful. 😅 Imagine having a blog post like this one
with a commenting system. You would loop over all the comments in your template
and create the HTML structure on the server. But what happens when the user
posts a new comment, and you need to create a DOM element in the browser? You'd
either have to recreate the comment structure with the same tags and classes in
JavaScript (hello, maintenance nightmare!), or you would create a hidden
template element, clone that element, and then populate the right divs with the
correct data and hopefully, no one had changed the class names in the template.
It was... not ideal, to say the least.

We also realized that using imperative code for building UIs was as fun as
trying to herd cats. We wanted our UIs to be declarative and based on state, and
we wanted reusable components. That way, we could always render the UI correctly
without worrying about things getting out of sync.

So, we moved everything to the client. Single-page applications became all the
rage, and we had rich interactivity at our fingertips. It was amazing... until
it wasn't...

We could now build amazing user experiences, but that came with a new set of
challenges. First off, we had to reinvent navigation. No more simple URL hits
and HTML returns – now we needed routing frameworks to handle page loads and
transitions. Sure, we gained some superpowers like keeping state between pages,
but with great power comes great responsibility. I've lost count of how many
"links" I've seen in SPAs that are just buttons with click handlers. 🤦‍♂️

Now, we are loading our data from our API so we can show and modify data with
ease, but we have to figure out how to deal with loading states and waterfalls.

Then came the performance. When your entire app lives on the client, it's now up
to your device to create the whole UI. It's not exactly speedy, and having the
server render an empty div and a script tag for each page is not exactly great
for SEO.

However, perhaps the biggest drawback was how it solidified the divide between
front-end and back-end developers. Back in the day, we were all just "web
developers." Sure, you might have preferred centering divs to writing database
queries, but working across the stack was common. This division created
communication barriers and, I believe, led to worse products overall. After all,
how can you create a unified experience when your teams are not?

![Sunrise](/images/sunrise.webp)

Now, here's where it gets exciting! We're not going back to PHP – we're moving
forward with full-stack JavaScript frameworks like
[Next.js](https://nextjs.org/), [Remix](https://remix.run/), and
[SvelteKit](https://kit.svelte.dev/). 🚀 These frameworks give us a unified
stack with JavaScript all the way, baby! We can handle routing and data-loading
on the server. We can build our UIs using state-of-the-art, declarative
components and create amazing user experiences using the best of both worlds.

I know what you're thinking. Isn't React Server Components with SQL queries just
like the old PHP code we all hated? What happened to the separation of concerns?
Well, not quite! Sure, at first glance, it might look like that crazy PHP code,
where we would mix SQL, HTML, and CSS, stick it in index.php, and call it a day.
But here's the difference: we've developed solid principles for building UIs,
and now we have a unified language and toolkit to create great user experiences,
utilizing both what the server is good at and what the browser excels at.

We're not going backward – we're taking all the lessons we've learned and
creating something even better. It's like we've taken the best parts of our PHP
days and supercharged them with everything we love about modern JavaScript. We
can now build really ambitious applications and frameworks like Next.js and
Remix allows us to utilize the server for more than just serializing JSON.

But here's where it gets really exciting: these full-stack JavaScript frameworks
are helping us close the gap between frontend and backend developers. 🌉
Remember that artificial divide we created? Well, it's starting to crumble, and
that's a good thing! With a unified language and toolset, it's becoming easier
for a single developer to build an end-to-end feature. No more awkward handoffs
between teams or lost-in-translation moments. You can now handle everything from
database queries to UI interactions in one seamless flow. It's like being a web
development superhero with powers on both sides of the stack! I don't think it
will make development more efficient but also lead to more cohesive products.
After all, when you understand both the server and client side, you can make
smarter decisions about where to put logic and how to optimize performance. It's
bringing us back to the "full-stack developer" ideal but with way cooler tools
and without the spaghetti code nightmares of the past. So, if you've been
feeling pigeonholed as a "frontend" or "backend" dev, now's your chance to break
free and embrace the full spectrum of web development!

It's a fantastic time to be in our field! If you haven't dived into modern
JavaScript frameworks yet, what are you waiting for? Today's the day! 🚀 We've
come a long way from nesting PHP in HTML, and while it might look similar on the
surface, we're building on years of UI development principles and best
practices.

I'd love to hear your thoughts on this! Have you made the switch to full-stack
JavaScript? Are you still holding onto PHP for dear life? Please drop a comment
below and let's chat!
