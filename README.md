# Hikمa Essence

*A scent that becomes you.* Single-page website for Hikمa Essence luxury fragrances.

Plain HTML, CSS and JavaScript (ES modules). No build step, no dependencies.

## Run locally

ES modules need to be served over HTTP (opening the file directly won't load the scripts):

```bash
npx serve .
# or
python -m http.server 8000
```

## Deploy

Push to GitHub and import the repo in Vercel (framework preset: **Other**, no build command, output directory `.`). Netlify and GitHub Pages work the same way.

## Editing content

Everything that changes often is in [`js/data.js`](js/data.js):

| What | Where |
| --- | --- |
| WhatsApp number, Snapchat handle | `CONTACT` |
| Products (name, house, notes, mood, occasion, colours) | `PRODUCTS` |
| FAQ questions and answers | `FAQS` |

**Product photos:** add a photo to `assets/products/` and set `image: 'assets/products/your-file.webp'` on the product. Without one, the site draws an illustrated bottle in the product's colours.

**Scent finder:** each product's `mood` and `occasion` lists decide which scent is recommended.

## Structure

```
index.html        page markup and section layout
css/styles.css    design tokens (pink and gold palette) and all styles
js/data.js        editable content
js/bottle.js      illustrated bottle SVGs
js/main.js        nav, scroll reveal, counters, scent finder, FAQ, contact form
assets/           favicon (product photos go in assets/products/)
```
