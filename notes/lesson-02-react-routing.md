# Lesson 2: React Routing

## What is Routing?

**Routing** means showing different pages depending on the URL, inside a single-page app.

**Analogy:** A mall directory. The mall (your app) stays the same, but the directory sends you to different shops (pages) depending on where you point.

- `/` shows the Home page
- `/about` shows the About page
- `/contact` shows the Contact page

> The browser **never reloads**. React Router swaps only the part of the screen that needs to change.

---

## Installing React Router

Run this **inside the project folder**:

```bash
cd my-react-app
npm i react-router-dom
```

Check that it is installed in the right place:

```bash
npm ls react-router-dom
```

You should see `react-router-dom@7.x.x` listed under `my-react-app`.

> Running `npm i` in the parent folder installs the library in the wrong place. Always check the terminal prompt first.

---

# Part 1: Routes (show a page for a URL)

## The Pieces

| Piece | Job |
|---|---|
| `BrowserRouter` | Turns on routing for the whole app. Wrap `<App />` with it **once** |
| `Routes` | A container that holds all the rules and picks the matching one |
| `Route` | One rule: "when the URL is **path**, show **element**" |

## Step 1: Create the page components

A page in React is just a component: a function that returns what to show. Create `Home.jsx` and `About.jsx` inside `src/`.

### Shortcut: the `rfce` snippet

Instead of typing a component from scratch, VS Code can write it for you.

1. Create a new empty file, for example `Home.jsx`.
2. Type `rfce`.
3. Press **Tab** (or **Enter**) on the suggestion that appears.

It generates this:

```jsx
import React from 'react'

function Home() {
  return (
    <div>Home</div>
  )
}

export default Home
```

- `rfce` stands for **R**eact **F**unction **C**omponent with **E**xport.
- The component name is taken from the **file name** automatically (`Home.jsx` gives `Home`).
- Change the text inside the `<div>` to whatever the page should show.

> `import React from 'react'` is not needed in modern React, so it is safe to delete. It does no harm if you leave it.

> The shortcut comes from the VS Code extension **ES7+ React/Redux/React-Native snippets**. If typing `rfce` does nothing, open the **Extensions** icon in the left sidebar, search for that name and click **Install**.

| Shortcut | What it creates |
|---|---|
| `rfce` | A function component with `export default` |
| `rafce` | The same, but written as an arrow function |

After editing, the two pages look like this:

**Home.jsx**
```jsx
function Home() {
  return <h1>Home Page</h1>
}

export default Home
```

**About.jsx**
```jsx
function About() {
  return <h1>About Page</h1>
}

export default About
```

- `function Home()` creates the component. Its name **must start with a capital letter**.
- `return <h1>...</h1>` is what the page shows.
- `export default Home` lets other files import it.

## Step 2: Turn on routing in main.jsx

Import `BrowserRouter` and wrap `<App />` with it:

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

> `BrowserRouter` watches the address bar so React knows which page to show.

## Step 3: Add the routes in App.jsx

```jsx
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import About from './About'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  )
}

export default App
```

- The imports bring in the router tools and the pages. The paths (`./Home`) must match where the files are.
- `Routes` is the container for all the rules.
- Each `Route` is one rule. `path` is the URL, and `element` is the page to show.
- `path="/"` is the home URL, so `localhost:5173/` shows `Home`.
- `element={<About />}` needs the curly braces and the tag form `<About />`.

## Test it by typing the URL

- `localhost:5173/` shows **Home Page**.
- `localhost:5173/about` shows **About Page**.

There are no clickable links yet, so typing the URL in the address bar is the test.

## Debugging a Blank Page

A blank page in React usually means an error. The browser hides it, so look in the console.

1. Press **Cmd + Option + J** in Chrome.
2. Find the **red** error.
3. Read the file name and line number, for example `App.jsx:13`.
4. Check that line and the imports above it.

**Errors that happened while building this lesson:**

| Error | Cause | Fix |
|---|---|---|
| `About is not defined` | The `import About ...` line was missing or misspelled | Add or fix the import |
| `imprt` instead of `import` | Typo | Fix the spelling |

---

# Part 2: Links (move between pages by clicking)

## The Link Component

| Piece | Job |
|---|---|
| `Link` | A clickable link that changes the URL **without reloading** the page |

## Step 4: Add a navigation bar with Links

Add `Link` to the import and put a `nav` above `Routes`:

```jsx
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './Home'
import About from './About'

function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  )
}

export default App
```

- `<Link to="/about">` is the clickable link. `to` is the URL, matching the `path` in a `Route`.
- The `|` is only a visual separator between the links.
- `<>` ... `</>` is a **Fragment**. A component must return one parent element, and a Fragment groups elements without adding an extra `div`.

**Expected output:** a "Home | About" bar at the top. Clicking a link changes the content and the URL, and the browser's reload icon does not flash.

### Link vs `<a>`

| | `<a href>` | `<Link to>` |
|---|---|---|
| Page reload | Yes, the whole page reloads | No reload |
| React state | Lost on every click | Kept |
| Use in React apps | Only for external websites | For pages inside your app |

### Error that happened here

| Error | Cause | Fix |
|---|---|---|
| `Link is not defined` | Imported `link` (small l) but used `<Link>`. JavaScript is case-sensitive | Import it as `Link` |

## Step 5: Add a third page (Contact)

Adding any new page always takes the same four things:

1. **Create the page file**, `Contact.jsx` in `src/` (use `rfce`, then edit the text):

```jsx
function Contact() {
  return <h1>Contact Page</h1>
}

export default Contact
```

2. **Import it** in `App.jsx`: `import Contact from './Contact'`
3. **Add a `Route`**: `<Route path="/contact" element={<Contact />} />`
4. **Add a `Link`** in the `nav`: `<Link to="/contact">Contact</Link>`

---

## Final App.jsx

```jsx
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Contact from './Contact'

function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/contact">Contact</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  )
}

export default App
```

---

## Common Mistakes

| Mistake | What happens | Fix |
|---|---|---|
| Forgetting `BrowserRouter` in `main.jsx` | Error: `useRoutes() may be used only in the context of a <Router>` | Wrap `<App />` with `BrowserRouter` |
| Using `<a href>` for internal pages | The page reloads on every click | Use `<Link to="...">` |
| Writing `element={Home}` | Nothing renders | Write `element={<Home />}` |
| Lowercase component names (`home`) | React treats it as an HTML tag | Start names with a capital letter |
| Wrong import path | Blank page or "Failed to resolve import" | Match the path to the real file location |
| Typing `link` instead of `Link` | `Link is not defined` | Import and use the exact name `Link` |
| Installing in the wrong folder | Cannot find module `react-router-dom` | Run `npm i` inside `my-react-app` |

---

## Quick Reference

| Code | Meaning |
|---|---|
| `npm i react-router-dom` | Install React Router |
| `rfce` + Tab | Generate a component skeleton in VS Code |
| `<BrowserRouter>` | Enable routing (once, in `main.jsx`) |
| `<Routes>` | Container for all the rules |
| `<Route path="/x" element={<X />} />` | When URL is `/x`, show component `X` |
| `<Link to="/x">` | Link to `/x` without reloading |

---

## Interview Questions

**1. What is routing in React?**
Showing different components for different URLs without reloading the page.

**2. What does `BrowserRouter` do?**
It enables routing for the app by watching the browser's URL. It is used once, around `<App />`.

**3. What is the difference between `Routes` and `Route`?**
`Routes` is the container that picks the matching rule. Each `Route` is one rule that maps a `path` to an `element`.

**4. What is the difference between `<Link>` and `<a>`?**
`<a>` reloads the whole page and loses React state. `<Link>` changes the URL and swaps the content without a reload.

**5. Why do React component names start with a capital letter?**
React treats lowercase names as HTML tags, and capitalized names as components.