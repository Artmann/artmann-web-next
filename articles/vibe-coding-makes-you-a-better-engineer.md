---
title: Vibe Coding Makes You a Better Engineer
blurb:
  I'm an AI-first developer now, with most of my code coming from coding agents.
  I don't think AI makes me faster. Instead, it's making me
  a better engineer by forcing me to level up the skills that actually matter.
imageUrl: /images/covers/vibe-coding-makes-you-a-better-engineer.webp
publishedAt: 2025-06-24
status: Published
tags: AI, Engineering, Software Development, Agile, Productivity
---

I would classify myself as a vibe coding enthusiast, starting with Copilot and
V0, then Devin, Cursor, and now Claude Code. I've also been writing code since I
was 13 years old.

I guess I'm an AI-first developer now. I'm not really sure when it happend but
the majority of my code comes from a coding agent, but that doesn't mean I
copy-paste an issue description somewhere and leave the agent to its own
devices. Far from it, actually.

I still own the problem-solving process completely. I'm the one figuring out
what needs to be built and why. I'm thinking through the tricky bits, deciding
how data should flow through the system, and making sure all the pieces will
play nicely together. Then Claude handles the implementation. It's like being an
architect who sketches the blueprint and lets skilled craftspeople handle the
construction. You're still deeply involved in the creative process, just at a
different level of abstraction.

Does it make you faster? I don't think so. Maybe a little bit? But Chris! I've
been told that we'll be able to 100x our engineering teams!?!

I think most of us are pretty skeptical when we hear those kinds of numbers, but
I've also worked with enough slow processes to know that you can make
improvements of several orders of magnitude. In my experience, these changes are
often organizational and workflow-related, not technical. There might be
technical changes that enable the transformation, but a new tool is probably not
going to make you that much faster on its own.

One of my favorite examples is when the
[CEO of Gumroad talks about how he can now build things 40 times faster](https://www.youtube.com/watch?v=KVZ3vMx_aJ4).
He explains that if he wanted something "relatively trivial" fixed in one of
their products, he would need to write a spec, send it over to a designer, who
would send it to an engineer, and it would take two weeks of back and forth
before it was shipped. Now he can do it in hours. I haven't double-checked the
math, but that is a great improvement! But here's the thing: if you can't ship a
trivial change the same day, you have either a product problem or an engineering
problem, and probably both. I would bet it wasn't the AI that made them faster,
but that changing tools made them look at how they work and improve it. The AI
was the spark, not the cure.

This brings me to an interesting observation: AI tools and agents have become a
driver of good engineering practices. Think about it. If you can create a quick
code change, you'll want to deploy it quickly as well. Are you telling me we
have to wait until next week for a deploy? Why can't we do it now? The friction
becomes more apparent when the code creation is so smooth.

As there's more AI-generated code, there's also more need for tests, and fewer
excuses not to write them. When your AI assistant can write comprehensive test
suites in minutes, suddenly that "we'll add tests later" excuse doesn't fly
anymore. All of a sudden, I'm talking to people about writing documentation,
because they want the AI to understand the codebase better. It's funny how
giving our tools better context has made us better at documenting our own work.
Our CEO has been spending time making our CI pipeline faster, so that Devin will
run faster. The tools are pushing us to fix the problems we've been ignoring for
years.

<img alt="Cleaning up your project" loading="lazy" src="/images/cleaning-up.webp" />

I wouldn't expect AI tools to make your engineers much faster individually, but
We can use the introduction of these tools as a catalyst for change in how we
work, invest in our processes and our tooling to build better software and ship
it more often. The real speed improvements come from removing the organizational
cruft that's been slowing us down all along.

So we're not looking at raw programming speed, but I think there's something to
say about consistency. If you have a slow day, Claude still keeps going. We all
have those days where our brain feels like molasses, where even simple tasks
feel insurmountable. Your AI assistant doesn't have those days. It also helps
with your cognitive load and avoiding energy-draining tasks.

The other day, I changed how we set up one of our orchestrators and created a
`createOrchestrator` function that would make sure you always get the right kind
of orchestrator, depending on your environment, your feature flags, etc. Then I
had to update 40 to 50 tests and change how the orchestrators were mocked.
That's the kind of task that's just miserable, will probably take you the rest
of the afternoon, and you won't get anything else done that day. It's the kind
of work that makes you question your career choices. Now that you can offload
those tasks to your agent, you can spend your energy on more important work. You
can focus on the interesting problems while your assistant handles the tedious
refactoring.

As you become a more senior engineer, you are not just writing code anymore. You
spend more of your time designing solutions, describing work to be done, and
planning future projects. Transferring what's in your head to a piece of paper
or to your colleagues can be challenging and sometimes frustrating. You know
exactly what needs to be built, but articulating it in a way that others can
understand and implement is a skill that takes years to develop.

When you work with agents, you get so much more practice doing this. You get to
work your explainer muscle so much more than you normally get to do, and with
much smaller stakes. If your explanation to Claude isn't clear, you'll know
immediately when the output doesn't match your vision. Instead of writing a
one-sentence prompt, practice shaping the problem space, describe what routes
you want there to be, or which flows you expect. Talk about how you want your
components to be structured or what background jobs will be needed, but avoid
the implementation details. You can leave that up to the agent, just like you
would for another developer. You can always improve it later.

This practice translates directly to working with human developers. The skills
you develop explaining technical concepts to an AI make you better at technical
communication in general. You learn to anticipate misunderstandings, provide
necessary context, and structure your thoughts more clearly.

<img alt="Training your feedback muscle" loading="lazy" src="/images/running.webp" />

That brings us to the next muscle we get to train: our feedback muscle. Giving
good, actionable feedback is hard, and with your agent, you'll get an almost
instant response, making feedback rounds quick and fun. I've noticed that I've
raised my bar, and things that I would leave unsaid, I now bring up because with
AI, addressing minor things becomes very low cost. You can say "this works, but
could we make the variable names more descriptive?" or "let's extract this into
a separate function for better readability" without worrying about hurting
someone's feelings or seeming nitpicky.

This habit of giving precise, constructive feedback carries over to code reviews
with your human colleagues. You become more comfortable pointing out
improvements, and you learn to frame your feedback in ways that are helpful
rather than critical.

Personally, I was only using Copilot's code completions for a long time. Even
though I think what Cursor and Devin enable is impressive, I don't think they
are very good products. They feel more like tech demos than tools I want to use
every day. Instead, it's been
[Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview) and
[OpenCode](https://github.com/sst/opencode) that have been a real joy to use,
and I'm not even a terminal kind of guy. They are really polished and work great
as everyday coding assistants. The difference is in the details - how they
handle context, how they recover from mistakes, how they integrate into your
existing workflow. If you haven't given them a try yet, you definitely should.

~ Good vibes
