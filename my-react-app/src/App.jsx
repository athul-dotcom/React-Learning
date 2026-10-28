
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Contact from './Contact'

function App() {

  return (
    <>
      <div>
        <nav>
          <Link to="/">Home </Link> | <Link to="/about">About</Link> | <Link to ="/Contact">Contact</Link>
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path = "/contact" element = {<Contact/>} />
      </Routes>
    </>
  )
}

export default App
