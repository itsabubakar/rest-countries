import { Routes, BrowserRouter as Router, Route } from 'react-router-dom'
import Country from './components/Country'
import Home from "./components/Home"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/country/:id' element={<Country />} />
      </Routes>
    </Router>
  )
}
export default App