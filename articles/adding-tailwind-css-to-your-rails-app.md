---
title: Adding Tailwind CSS to Your Rails App
blurb:
  I recently started using Tailwind CSS and it really struck a chord with me.
  Here's how you add it to your Rails App.
imageUrl: /images/covers/tailwind-rails.webp
publishedAt: 2018-01-10
status: Published
tags: CSS, Ruby on Rails, Tailwind CSS, Post CSS
---

We recently decided to use [Tailwind CSS](https://tailwindcss.com/) for our
Ember app at work and it really struck a chord with me. That's why I decided to
try it in Ruby on Rails.

As you are here you are probably already hyped to get started with Tailwind CSS
in your Rails app but if you still need convincing A wrote Adam Wathan about it,
[CSS Utility Classes and "Separation of Concerns](https://adamwathan.me/css-utility-classes-and-separation-of-concerns/).

If you want to create a new app you can pass the `--webpack` option as of Rails
5.1

```shell
rails new myapp --webpack
```

Otherwise just add the _webpacker_ gem.

```ruby
# Gemfile
gem 'webpacker', '~> 3.0'

bundle
bundle exec rails webpacker:install
```

Then install `autoprefixer` and `tailwindcss`

```shell
yarn add --dev autoprefixer tailwindcss
```

Webpacker lives in `app/javascript` as default. Lets create some new folders
there to keep things organized and create the default tailwind configuration
file.

```shell
mkdir -p app/javascript/src app/javascript/styles

node_modules/.bin/tailwind init app/javascript/src/tailwind.js
```

Then we add the tailwind config to `application.css`. You can find it at
<https://tailwindcss.com/docs/installation>

```css
# app/javascript/styles/application.css

@tailwind base;

@tailwind components;

@tailwind utilities;
```

Now we need to add our post css plugins to webpacker.

```yml
# .postcssrc.yml

plugins:
  postcss-import: {}
  postcss-cssnext: {}
  autoprefixer: {}
  tailwindcss: './app/javascript/src/tailwind.js'
```

And add our new folders to `resolved_paths` in `webpacker.yml`.

```yml
# config/webpacker.yml

resolved_paths: ['app/javascript/src', 'app/javascript/styles']
```

Import the css file in webpackers entrypoint.

```js
// app/javascript/packs/application.js

import 'application.css'
```

And then link to the new files

```erb
# app/views/layouts/application.html.erb

<%= javascript_pack_tag 'application' %>
<%= stylesheet_pack_tag 'application' %>
```

## Heroku

If you are running your app on Heroku you'll have to adjust some settings to
make it work with Webpacker and Tailwind.

First of, with later versions of Webpacker you'll have to add the Node buildpack
and then the ruby one.

```shell
heroku buildpacks:clear
heroku buildpacks:set heroku/nodejs
heroku buildpacks:add heroku/ruby
```

Then you'll have to update the config var `YARN_PRODUCTION` to `false`.

That's it, folks. You can now use Tailwind CSS classes in your markup.

You can find a reference app at
<https://github.com/artmann/rails-tailwind-example>
