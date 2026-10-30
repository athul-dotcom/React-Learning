# Lesson 3: React Props and Instagram Sidebar

## What are Props?

**Props** (short for "properties") are inputs you give to a component, so one component can show different data. They work like function arguments.

**Analogy:** An ID card template. The layout is the same for everyone, but the name and photo change for each person. The template is the component; the name and photo are the props.

---

## Step 1: A component that receives props

**Greeting.jsx**
```jsx
function Greeting(props) {
  return <h1>Hello, {props.name}</h1>
}

export default Greeting
```

- `props` is an object holding everything passed to the component.
- `props.name` reads one value from it.
- Curly braces `{ }` mean "this is JavaScript, not plain text". Without them, the page shows the words `props.name`.

## Step 2: Passing props

**Home.jsx**
```jsx
import Greeting from './Greeting'

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <Greeting name="Athul" />
      <Greeting name="Rahul" />
    </div>
  )
}

export default Home
```

- `<Greeting name="Athul" />` sends a prop, written like an HTML attribute.
- The same component is reused with different values.

> A component can return only **one parent element**. Wrap everything in a `<div>` or a Fragment `<> ... </>`. Otherwise you get the error: *Adjacent JSX elements must be wrapped in an enclosing tag*.

---

## Step 3: Multiple props and destructuring

```jsx
function Greeting({ name, city }) {
  return <h2>Hello, {name} from {city}</h2>
}

export default Greeting
```

```jsx
<Greeting name="Athul" city="Kochi" />
<Greeting name="Rahul" city="Chennai" />
```

| | Meaning |
|---|---|
| **Props** | The values you send in when using the component: `name="Athul"` |
| **Destructuring** | The `{ name, city }` syntax inside the component that pulls values out of the props object |

> Destructuring saves writing `props.name` and `props.city` every time. You write `{name}` and `{city}` instead.

---

## Step 4: One row of the sidebar

**Sidebar.jsx**
```jsx
function Sidebar({ icon, label }) {
  return (
    <div className="sidebar-item">
      <span>{icon}</span> <span>{label}</span>
    </div>
  )
}

export default Sidebar
```

- `icon` holds an emoji (just text), `label` holds the name.
- `<span>` holds a small piece of text inline.

---

## Step 5: Rendering a list with map

### What `map` does

`map` goes through an array **one item at a time**, does something with each item, and returns a **new array** with the results.

```js
const numbers = [1, 2, 3]
const doubled = numbers.map((num) => num * 2)
console.log(doubled)   // [2, 4, 6]
```

- `(num) => num * 2` runs once for each item. `num` is the current item.
- The original array does not change.

### map in React

In React, `map` turns each piece of **data** into a piece of **UI**:

```jsx
const items = [
  { id: 1, icon: "🏠", label: "Home" },
  { id: 2, icon: "🔍", label: "Search" },
  { id: 3, icon: "💬", label: "Messages" },
]
```

```jsx
{items.map((item) => (
  <Sidebar key={item.id} icon={item.icon} label={item.label} />
))}
```

- For each `item`, `map` returns one `<Sidebar />`.
- `icon={item.icon}` uses curly braces because the value is JavaScript, not a fixed string.
- **`key={item.id}`** is a unique label for each item, so React can tell them apart when the list changes. Without it, the console shows a warning.
- The outer `{ }` are needed because `map` is JavaScript inside JSX.

> Add a new object to the array and a new row appears, with no new JSX. Write the row once; the data decides how many appear.

**Naming tip:** call the array plural (`items`) and one element singular (`item`), so `items.map((item) => ...)` reads naturally.

---

## Step 6: Passing an array as a prop

**Sidebarmenu.jsx** (the whole list)
```jsx
import Sidebar from './Sidebar'
import './Sidebar.css'

function Sidebarmenu({ items }) {
  return (
    <div className="sidebar-menu">
      <h2 className="sidebar-logo">Instagram</h2>
      {items.map((item) => (
        <Sidebar key={item.id} icon={item.icon} label={item.label} />
      ))}
    </div>
  )
}

export default Sidebarmenu
```

**Home.jsx** (holds the data and sends it down)
```jsx
import Greeting from './Greeting'
import Sidebarmenu from './Sidebarmenu'

function Home() {
  const items = [
    { id: 1, icon: "🏠", label: "Home" },
    { id: 2, icon: "🔍", label: "Search" },
    { id: 3, icon: "💬", label: "Messages" },
  ]

  return (
    <div>
      <Sidebarmenu items={items} />

      <div className="main-content">
        <h1>Home Page</h1>
        <Greeting name="Athul" city="Kochi" />
        <Greeting name="Rahul" city="Chennai" />
      </div>
    </div>
  )
}

export default Home
```

- `items={items}`: the left `items` is the **prop name**, the right `{items}` is the **variable**.
- Data is defined **above** `return`, inside the function. Code cannot go inside the JSX.

### One-way data flow

```
Home  →  Sidebarmenu  →  Sidebar
(data)   (loops with map)  (draws one row)
```

> Data flows **from parent to child**. `Home` keeps the data and sends it down, which makes `Sidebarmenu` **reusable**: it can show any list it is given.

---

## Step 7: Styling with className

### className vs class

| HTML | React (JSX) |
|---|---|
| `class="xyz"` | `className="xyz"` |
| `id="xyz"` | `id="xyz"` (unchanged) |

> React uses `className` because `class` is a reserved word in JavaScript. `id` is not reserved, so it stays the same.

### Three parts must connect

1. **CSS file defines the style** (with a dot): `.sidebar-item { ... }`
2. **Component imports the CSS file**: `import './Sidebar.css'`
3. **Element uses the name** (without a dot): `<div className="sidebar-item">`

If any part is missing, the style does not show.

**Sidebar.css**
```css
.sidebar-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 240px;
  height: 100vh;
  padding: 24px 12px;
  border-right: 1px solid #333;
  text-align: left;
  box-sizing: border-box;
}

.sidebar-logo {
  font-size: 24px;
  margin: 0 0 24px 12px;
}

.sidebar-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}

.sidebar-item:hover {
  background-color: #262626;
}

.main-content {
  margin-left: 240px;
  padding: 24px;
}
```

- `position: fixed` with `left: 0` pins the sidebar to the left edge.
- A fixed element takes no space, so `.main-content` uses `margin-left: 240px` to stop the page content sliding underneath.
- `:hover` highlights a row when the mouse is over it.

> A CSS file imported in one component applies to the **whole app**. Use specific class names (like `sidebar-item`) to avoid clashes.

---

## Quick Reference

| Code | Meaning |
|---|---|
| `<Comp name="x" />` | Send a prop |
| `function Comp({ name })` | Receive a prop with destructuring |
| `items={items}` | Send an array as a prop |
| `items.map((item) => <X key={item.id} />)` | Render a list |
| `className="xyz"` | Apply a CSS class |
| `import './File.css'` | Load a CSS file |

---

## Interview Questions

**1. What are props in React?**
Inputs passed from a parent component to a child, so the same component can display different data.

**2. Can a child component change its props?**
No. Props are read-only. Data flows one way, from parent to child.

**3. What is destructuring in props?**
Pulling values out of the props object directly, like `function Greeting({ name })`, instead of writing `props.name`.

**4. How do you render a list in React?**
Use `map` on an array to return one element or component per item.

**5. Why does each list item need a `key`?**
So React can identify each item and update the list correctly when items are added, removed or reordered.

**6. Why does React use `className` instead of `class`?**
Because `class` is a reserved word in JavaScript, and JSX is JavaScript.

---

## Practice

1. In `About.jsx`, create a `friends` array (id, name, city) and use `map` to show "Arun lives in Kochi" for each friend.
2. Add an `About.css` file with a `.friend` class and apply it with `className`.
3. Add two more items to the sidebar (for example ❤️ Notifications, 👤 Profile) by editing only the array.
