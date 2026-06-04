# HAWK 2030 Landing Page

Static landing page for "HAWK 2030". The project is a single-page HTML site with local image and font assets.

## Requirements

- A modern browser
- Internet access when previewing the page, because `index.html` loads Tailwind CSS from `https://unpkg.com/@tailwindcss/browser@4`
- Optional: Python 3 if you want to serve the page locally

No package installation or build step is required.

## Project Structure

```text
.
|-- index.html
|-- assets/
|   |-- fonts/
|   |   |-- FiraSans-Regular_1697536294.otf
|   |   |-- FiraSans-Medium_1577936052.otf
|   |   `-- FiraSans-SemiBold_4232715620.otf
|   `-- images/
|       |-- diagram-1.svg
|       |-- diagram-2.svg
|       |-- kurzportrait-*.jpg
|       |-- logo-hawk2030.svg
|       |-- querschnittsthemen.jpg
|       `-- wissensspeicher.jpg
`-- README.md
```

## Run Locally

You can open `index.html` directly in a browser for a quick preview.

For a local web server, run:

```sh
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Editing Notes

- Main markup, styling, and JavaScript live in `index.html`.
- Local fonts are declared with `@font-face` in the page head and loaded from `assets/fonts/`.
- Images and diagrams are referenced with relative paths under `assets/images/`.
- Keep asset paths relative to `index.html` so the page works both locally and after static deployment.

## Deployment

Deploy the site as static files. Upload `index.html` and the full `assets/` directory together, preserving the folder structure.

Because Tailwind is loaded from a CDN at runtime, deployments need outbound access to `unpkg.com` unless Tailwind is replaced with compiled local CSS.
