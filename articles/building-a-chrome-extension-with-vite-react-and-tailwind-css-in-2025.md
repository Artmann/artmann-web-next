---
title: Building a Chrome Extension with Vite, React, and Tailwind CSS in 2025
blurb:
  Chrome extensions are one of the most powerful ways to customize your browser
  experience, but getting started with modern development tools can be tricky.
  In this guide, I'll walk you through creating a Chrome extension using Vite,
  React, and Tailwind CSS – my go-to stack for web development.
imageUrl: /images/covers/building-a-chrome-extension-with-vite-react-and-tailwind-css-in-2025.webp
publishedAt: 2025-04-16
status: Published
tags: TypeScript, React, JavaScript, Tailwind CSS, Vite, Chrome Extensions
---

[Chrome extensions](https://developer.chrome.com/docs/extensions/get-started)
are a cool way of automating things you do in the browser. Recently, Chrome
changed its guidelines and broke a bunch of extensions, so I had to recreate
some of the ones I use often. I haven't created Chrome extensions since 2020, so
it's been a while, and some of our preferred tools have changed. Now we have
Vite, and life is great!

I wanted to use my normal stack of React, Tailwind, and shadcn/ui. Even if you
don't need most of it for all extensions, it's better to have it and not need it
than to need it and not have it. Here are the steps you need to create a Chrome
extension using React, Tailwind, and Vite.

Nowadays, I usually use Bun to run my Typescript code. If you want to use Node
with yarn or npm, using Node 23 will make your life a lot easier as it comes
with built-in typescript support, and you don't need to deal with as many ESM
issues.

> 💡 **Vibe Coding Tip:** If you're looking to speed up your Chrome extension
> development, Claude Code is super helpful once you have your project structure
> set up the way you like it. I've found it especially good at helping write
> components, suggesting fixes for manifest issues, and explaining Chrome's
> APIs. Just describe what you want your extension to do, and Claude can help
> you implement it step by step!

## Step 1: Create a Vite Project

First, let's initialize a new Vite project with React and TypeScript support:

```bash
npx create vite@latest --template react-ts my-chrome-extension
cd my-chrome-extension

```

This creates a new project with React and TypeScript all ready to go. Super
convenient, right? The template gives you a basic setup that we'll tweak for our
Chrome extension.

## Step 2: Create the Manifest File

Every Chrome extension needs a manifest file - it's like the ID card for your
extension. Create a file named `manifest.json` in the root of your project with
the following content:

```json
{
  "name": "Vibe Extension",
  "description": "Good vibes in Chrome.",
  "version": "1.0",
  "manifest_version": 3,
  "action": {
    "default_popup": "dist/index.html"
  }
}
```

This is a super minimal manifest that just creates a popup extension. The
`action` field tells Chrome to load our popup from the `dist/index.html` file
that Vite will generate when we build. You can add more stuff later like
permissions and background scripts, but this is all we need to get started.

## Step 3: Configure Vite for Extension Development

Here's the tricky part - Vite normally builds files with absolute paths, but
Chrome extensions need relative paths to work properly. Let's fix the Vite
config to make it extension-friendly.

Create or update the `vite.config.ts` file in your project root:

```typescript
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  build: {
    assetsInlineLimit: 0,
    outDir: 'dist',
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      },
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  },
  plugins: [react()]
})
```

This configuration does a few key things:

- Changes the base path to `./` so assets load from relative paths (super
  important!)
- Sets the build output folder to `dist` to match our manifest
- Makes the file names prettier and easier to debug
- Tells Vite which file to start with (`index.html`)

## Step 4: Add Tailwind CSS

Now let's add Tailwind for styling:

```bash
bun add -D  tailwindcss @tailwindcss/vite
```

Update your `src/index.css` file to import Tailwind:

```css
@import 'tailwindcss';
```

Now let's update our Vite config to include Tailwind.

```typescript
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  build: {
    assetsInlineLimit: 0,
    outDir: 'dist',
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      },
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  },
  plugins: [react(), tailwindcss()]
})
```

## Step 5: Create a Simple React Component

Let's make our extension actually do something! Update the `src/App.tsx` file
with some Tailwind classes:

```tsx
import { useState } from 'react'

function App() {
  const [message, setMessage] = useState('Hello from Chrome Extension!')

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Vibe Extension
        </h1>
        <p className="text-gray-600 mb-6">{message}</p>
        <button
          className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded"
          onClick={() => setMessage('Spreading good vibes!')}
        >
          Activate Good Vibes
        </button>
      </div>
    </div>
  )
}

export default App
```

This creates a simple popup with a gradient background, a card, and a button
that changes the message when you click it. You can customize this part with
whatever UI components you need for your extension.

## Step 6: Build Your Extension

Now, let's build the extension:

```bash
bun run build
```

This command will generate the distribution files in the `dist` directory:

```
dist/
  index.html
  main.css
  main.js
```

## Step 7: Load Your Extension in Chrome

Now for the fun part - let's see it in action!

1. Open Chrome and go to `chrome://extensions/`
2. Turn on "Developer mode" with the toggle in the top-right corner
3. Click "Load unpacked" and pick your project folder (the one with the
   `manifest.json` file)

Your extension should show up in the list. Click the extension icon in your
toolbar and you'll see your React app in a popup!

Remember to run `bun run build` whenever you make changes to your code. After
building, go back to the Extensions page and click the refresh icon next to the
**on**/**off** toggle to reload your extension with the latest changes.

## Troubleshooting Common Issues

You can open the developer tools for the extension to see if there are any
errors. You can do this by right-clicking on your extension popup and selecting
"Inspect".

### My Extension Isn't Showing Up!

If you don't see your extension after loading it:

- Double-check your `manifest.json` file - a missing comma or bracket can break
  everything
- Make sure the path to your `index.html` in the manifest points to where your
  build output actually is

### My CSS and JS Aren't Loading!

If your extension loads but looks broken:

- Make sure you have that `base: './'` setting in your Vite config - this is the
  #1 issue
- Check the file names in your build output match what you expect

---

_Found this useful? Drop a comment and let me know what kind of extension you're
building!_
