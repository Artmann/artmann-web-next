---
title: Building a Recipe Site with Next.js and Claude Code Skills
blurb:
  I built fullsendkitchen.com to collect restaurant-style recipes from TV cooking
  shows. Here's why I kept the data model dead simple, chose Vercel for the
  boring stuff, and used a Claude Code skill to write all the content.
imageUrl: /images/covers/building-a-recipe-site-with-nextjs-and-claude-code-skills.webp
publishedAt: 2026-04-13
status: Draft
tags: Next.js, AI, Claude Code, Vercel, Side Projects
---

I've been watching a lot of cooking shows lately. [Top Chef](https://www.bravotv.com/top-chef),
[Culinary Class Wars](https://en.wikipedia.org/wiki/Culinary_Class_Wars) — the kind of shows
where chefs make these incredible, ambitious dishes under pressure. Restaurant-style food.
Fine dining plating. Techniques I've never heard of. And every time I see a dish I want to
make, I run into the same problem: the show gives you maybe 30 seconds of screen time for
something that took the chef four hours. You see the finished plate, you hear a few
ingredients mentioned, and that's it. If you actually want to cook the dish, you're on your
own, piecing it together from food blogs, YouTube videos, and guesswork.

So I built [Full Send Kitchen](https://fullsendkitchen.com/) to fix that. The idea is simple:
collect these restaurant-style recipes, fill in the gaps, and make them approachable for home
cooks. Not dumbed down, but translated. The goal isn't to simplify the food — it's to give
you enough context and technique to actually pull it off in a home kitchen.

<img alt="A recipe on Full Send Kitchen" loading="lazy" src="/images/blog/full-send-kitchen-recipe.webp" />

I've actually built a recipe site before. [Gustavs Kitchen](https://gustavskitchen.se/) is
focused on everyday Swedish cooking — the kind of food you make on a Tuesday when you just
need to get dinner on the table. Full Send Kitchen is the opposite end of the spectrum. This
is what you cook when you have friends coming over on Saturday night and you want to do
something special, or when you're trying to impress someone on a date. There's a weird gap
in the recipe internet: on one end you have "30-minute weeknight chicken" blogs, and on the
other end you have Michelin restaurant cookbooks that assume you have a brigade and a
Pacojet. There's not much for the ambitious home cook in between.

This is a content website and we're not doing anything complicated, so
[Next.js](https://nextjs.org/) feels like a natural fit. Put it on
[Vercel](https://vercel.com/) and you get all their platform stuff out of the box — preview
branches, image optimization, caching, CDN. I spent way too much time on Gustavs Kitchen
optimizing images and trying to get caching to work correctly. I really value having that
just work. Now that I do more and more from my phone via
[Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview), preview branches have
become super valuable. I can push a branch and see the result on a real URL before merging
anything. No laptop needed. It's one of those things that sounds minor but completely changes
how you work.

The rest of the setup is bare bones on purpose. Each recipe is two files: a markdown file for
the free-text content — the story, the technique explanations, the context — and a JSON file
for the structured data like ingredients, steps, categories, and tags. The JSON gets used for
building the category and tag pages and for displaying the recipe steps and ingredient lists.

Here's where it gets opinionated. The urge as an engineer is to build a proper data model for
ingredients. Normalized names, amounts, and units. Separate fields for quantity, measurement,
and item so you can scale recipes, convert between metric and imperial, and compare
ingredients across dishes. I know because I've done it before, and it was a constant source
of bugs. Bad pluralization ("1 tomatoes"), weird edge cases ("a pinch of salt" — what unit is
"pinch"?), and degraded experiences for no real benefit. I never ended up using any of the
fancy features it was supposed to enable. So this time, ingredients and steps are just string
arrays. `"2 cups heavy cream"` is a string. `"1 vanilla bean, split and scraped"` is a
string. They exist to be displayed, not computed over. Do you really need a normalized
ingredient model if you're never going to calculate with it?

For the content itself, I've kept it just as simple. I've previously written a few different
CLIs and agent loops for generating content, but I'm more and more bearish on writing your
own agents. The existing harnesses are good, and they're where I spend most of my time
anyway. I want my recipe writing to happen there too.

Instead, I built an "add recipe" [skill](https://agentskills.io/home). I like skills. The
idea of turning the agent from a very general tool, doing average things, into a focused
workflow follower is compelling to me. The skill covers what the inputs should be — normally
just a short description of a dish — and then prompts for references or images so we can
narrow down what to write. We describe the output format and what we want the content to read
like: educational but inspirational, ambitious but grounded in the reality that we're writing
for home cooks, not restaurant kitchens. It's all about adding guard rails and narrowing the
scope of the agent so it does the one thing well.

<img alt="The add-recipe skill" loading="lazy" src="/images/blog/full-send-kitchen-skill.webp" />

I didn't go to culinary school, but Claude probably knows most cooking techniques, especially
all the French ones I struggle to pronounce. Since the whole point of this project is to
become a better cook and learn these skills, I had Claude create a set of reference files
describing techniques — blanching, brining, mounting, tempering, and so on — explaining what
they are and when to use them. The skill references these files, which means every recipe
that mentions "mount with butter" explains it consistently, and I get to learn the concept
properly. It's basically a style guide, but for cooking knowledge instead of prose.

<img alt="Cooking technique reference files in the skill" loading="lazy" src="/images/blog/full-send-kitchen-techniques.webp" />

So does it work? I made a
[Coconut Bread Pudding with Pineapple Cream](https://fullsendkitchen.com/recipes/coconut-bread-pudding-pineapple-cream)
from Top Chef, and it was delicious.

<img alt="Coconut Bread Pudding with Pineapple Cream" loading="lazy" src="/images/blog/full-send-kitchen-bread-pudding.webp" />

Building things for yourself is still one of the best reasons to write code. Not everything
needs to be a startup or have a growth strategy. Sometimes you just want to cook a great meal
for your friends, and you need a good recipe to get there.

~ Good vibes
