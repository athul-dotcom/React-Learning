# Lesson 1: React Introduction and Project Creation

## What is React?

**React** is a JavaScript library for building user interfaces (the part of a website the user sees and clicks). It was created at Facebook (now Meta).

> React is a *library*, not a full framework. It handles the UI only. You choose other tools for routing, data and so on.

**Analogy:** LEGO. You don't carve a toy house from one block. You build small reusable pieces (a window, a door) and snap them together. In React, each piece is a **component**.

---

## Key Terms

| Term | Meaning |
|---|---|
| **Component** | A reusable piece of UI, written as a JavaScript function |
| **JSX** | HTML-like syntax written inside JavaScript |
| **State** | Data that can change over time (for example, a counter's number) |
| **Virtual DOM** | React's lightweight copy of the page. React compares old and new copies and updates only what changed |
| **SPA** | Single Page Application: the browser loads one HTML page, and React swaps the content without reloading |

---

## Plain JavaScript vs React

**Plain JavaScript (imperative: you update the page yourself):**
```js
let count = 0;
const button = document.querySelector("#btn");

button.addEventListener("click", () => {
  count = count + 1;
  button.textContent = "Count is " + count; // YOU update the page
});
```

**React (declarative: you describe the result):**
```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count is {count}
    </button>
  );
}
```

> In React you never touch the page directly. You change the data (`count`), and **React updates the screen**.

---

## Creating a React Project (Step by Step)

### Step 1: Check Node.js and npm
```bash
node -v
npm -v
```
Both should print version numbers.

> React's tools need Node **20.19 or newer**. npm comes with Node and downloads libraries.

### Step 2: Open a terminal in the folder where the project should be created

For example, the `React` folder. The new project folder is created inside whichever folder the terminal is in.

### Step 3: Create the project with Vite
```bash
npm create vite@latest my-react-app
```

- `npm create vite@latest` runs Vite's project creator (the newest version).
- `my-react-app` is the **project name**. It becomes the folder name, so choose any name you like.
- If it asks `Ok to proceed? (y)`, type `y` and press Enter.

### Step 4: Answer the questions

Use the **arrow keys** to move and **Enter** to choose.

| Question | Choose |
|---|---|
| Select a framework | **React** |
| Select a variant | **JavaScript** |
| Which linter to use | **Oxlint** |
| Install with npm and start now | **Yes** |

> **Vite** is the tool that builds and runs the project quickly. **Oxlint** is a fast code checker that points out mistakes.

Choosing **Yes** at the last question does two things for you: it runs `npm install` (downloads the libraries) and `npm run dev` (starts the server).

### Step 5: See the app

When the terminal shows this, the server is running:

```
VITE v8.x.x  ready in 300 ms

➜  Local:   http://localhost:5173/
```

Open **http://localhost:5173/** in the browser. The Vite + React starter page appears with a counter button.

---

## Running the Project Again Later

If you closed the terminal or pressed **Control + C**, the server has stopped. To start it again:

```bash
cd my-react-app
npm run dev
```

- `cd my-react-app` moves the terminal into the project folder. Check that the prompt shows `my-react-app %`.
- `npm run dev` starts the development server.
- `npm install` is only needed if the `node_modules` folder is missing, for example after downloading the project from GitHub.

> Press **Control + C** in the terminal to stop the server.

### Commands in order (summary)

```bash
node -v                                  # check Node
npm create vite@latest my-react-app      # create the project (choose React, JavaScript, Oxlint, Yes)
cd my-react-app                          # go into the project folder
npm install                              # download libraries (done automatically if you chose Yes)
npm run dev                              # start the server
```

---

## Project Structure

```
my-react-app/
├── node_modules/     downloaded libraries (never edit, never upload)
├── public/           static files served as they are
├── src/              YOUR code lives here
│   ├── assets/
│   ├── App.css
│   ├── App.jsx       the main component
│   ├── index.css
│   └── main.jsx      the entry point: starts React
├── .gitignore        files Git should skip (like node_modules)
├── .oxlintrc.json    Oxlint settings
├── index.html        the one HTML page of the whole app
├── package.json      the project's ID card
├── package-lock.json exact versions of installed libraries
├── README.md
└── vite.config.js    Vite settings
```

---

## How the Page Starts

1. The browser opens `index.html`. It holds an empty box, `<div id="root"></div>`, and a script pointing to `/src/main.jsx`.
2. `main.jsx` tells React to draw `App` inside that box:

```jsx
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(<App />)
```

- `import App ...` brings in the main component.
- `document.getElementById('root')` finds the empty box in `index.html`.
- `createRoot(...).render(<App />)` draws `App` inside that box.

3. `App.jsx` is a component: a function that returns what to show.

> The whole app is one empty `<div>` that React fills.

---

## package.json

- **scripts**: shortcuts for commands. `"dev": "vite"` is why `npm run dev` starts Vite.
- **dependencies**: the libraries the project uses.

> `npm i something` edits the `package.json` **in the folder you are standing in**. Always check your terminal prompt first.

---

## HMR (Hot Module Replacement)

When you save a file, Vite updates the browser instantly without a full reload. The terminal shows lines like:

```
hmr update /src/App.jsx
```

---

## Common Mistakes

| Mistake | Fix |
|---|---|
| Running `npm` commands in the wrong folder | Check the prompt: it must say `my-react-app %` |
| Typing `npm dev` | The command is `npm run dev` |
| Typing `mpn` instead of `npm` | Read the error message, it suggests the correct command |
| Pressing Control + C and wondering why the page is dead | Control + C stops the server. Run `npm run dev` again |

---

## Quick Reference

| Command | What it does |
|---|---|
| `node -v` / `npm -v` | Check Node and npm versions |
| `npm create vite@latest my-react-app` | Create a new React project |
| `npm install` | Download the project's libraries |
| `npm run dev` | Start the development server |
| Control + C | Stop the server |

---

## Interview Questions

**1. What is React?**
A JavaScript library for building user interfaces from reusable components.

**2. What is the Virtual DOM?**
A lightweight copy of the page that React compares with the new version, so it updates only what changed.

**3. Which file starts a React app?**
`main.jsx` creates the root and renders `App` inside the `<div id="root">` of `index.html`.