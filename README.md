# Surya’s Portfolio

A minimal, Apple-inspired personal portfolio built with plain HTML, CSS, and JavaScript. No frameworks, no build step, no dependencies.

I’m a Computer Science student who learns by building. This site shows my side quests, and two of them run live right in the page.

## Features

- **Live project demos.** Try my Python projects in the browser:
  - **Password generator:** pick letters, numbers, and symbols with sliders, see a strength meter, and copy the result.
  - **Finding factorial:** calculate factorials from 0 to 1000 as you type, with exact results for huge numbers.
- **Scroll-driven design.** The hero fades as you scroll, sections fade in, and the About text lights up word by word.
- **Small details.** A rotating hero line, a cursor glow, card spotlights, and a blurred navigation bar.
- **Responsive.** Works on phones, tablets, and desktops.
- **Accessible.** Keyboard focus styles, labeled controls, and reduced-motion support.

## Tech stack

- HTML5
- CSS3 (custom properties, grid, flexbox)
- Vanilla JavaScript (IntersectionObserver, Web Crypto API, BigInt)

## Project structure

```
.
├── index.html   # Page structure and content
├── style.css    # All styling
├── script.js    # Interactions and the two live demos
└── README.md
```

## Run it locally

1. Clone the repository:
   ```bash
   git clone https://github.com/t9m487cjd8-creator/YOUR-REPO-NAME.git
   cd YOUR-REPO-NAME
   ```
2. Open the folder in VS Code.
3. Install the **Live Server** extension if you don’t have it.
4. Right-click `index.html` and choose **Open with Live Server**.

You can also just double-click `index.html` to open it in your browser.

## Deploy with GitHub Pages

1. Make sure `index.html`, `style.css`, and `script.js` are at the **root** of the repository.
2. On GitHub, go to **Settings > Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Choose the `main` branch and the `/ (root)` folder, then click **Save**.
5. After a minute or two, your site is live at `https://t9m487cjd8-creator.github.io/YOUR-REPO-NAME/`.

Tip: if you name the repository `t9m487cjd8-creator.github.io`, the site is served at `https://t9m487cjd8-creator.github.io` with no extra path.

## Customize it

- **Text and links:** edit `index.html`.
- **Colors and fonts:** change the variables at the top of `style.css`.
- **Add a project:** copy one `<article class="card">` block in `index.html`, then update the title, description, and GitHub link.
- **Hero phrases:** edit the `phrases` list at the top of `script.js`.

## Projects featured

| Project | Language | What it does |
| --- | --- | --- |
| [Password_generator](https://github.com/t9m487cjd8-creator/Password_generator) | Python | Generates strong, randomized passwords from custom counts of letters, numbers, and symbols. |
| [Finding_Factorial](https://github.com/t9m487cjd8-creator/Finding_Factorial) | Python | Calculates factorials with a simple loop. |

## Connect

- GitHub: [t9m487cjd8-creator](https://github.com/t9m487cjd8-creator)
- LinkedIn: [chalasani-surya](https://www.linkedin.com/in/chalasani-surya-a32b663a8/)
- Instagram: [@surya_o_o](https://www.instagram.com/surya_o_o/)

## License

This project is open source. Feel free to use it as inspiration for your own portfolio. If you add a license file, update this section to match it.