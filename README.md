# Portfolio — Shreehan Santosh Kate

Static, dependency-free site (HTML/CSS/vanilla JS). Built to host on GitHub Pages.

## File structure
```
index.html
assets/
  css/style.css
  js/main.js
  images/hero.jpg
```

## Host it on GitHub Pages (takes ~5 min)

1. **Create a repo on GitHub.**
   - Go to github.com → New repository.
   - For a *user site* (lives at `https://<username>.github.io`), name it exactly `<your-username>.github.io`.
   - For a *project site* (lives at `https://<username>.github.io/portfolio`), name it `portfolio` (or anything).

2. **Push these files.** From this folder, run:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```

3. **Turn on Pages.**
   - In the repo: Settings → Pages.
   - Under "Build and deployment", set Source = `Deploy from a branch`, Branch = `main`, folder = `/ (root)`.
   - Save. GitHub gives you a live URL in ~1 minute.

4. **Done.** Re-push anytime to update the live site (`git add . && git commit -m "update" && git push`).

## Customizing
- All copy lives directly in `index.html` — edit text in place.
- Colors/fonts/spacing are CSS variables at the top of `assets/css/style.css` (`:root { ... }`).
- Swap the photo by replacing `assets/images/hero.jpg` (keep the same filename, or update the `src` in `index.html`).
