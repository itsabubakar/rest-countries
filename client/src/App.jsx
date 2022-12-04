import { Routes, BrowserRouter as Router, Route } from 'react-router-dom'
import Country from './components/Country'
import HomePage from "./components/HomePage"

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route exact path='/' element={<Home />} /> */}
        <Route exact path='/' element={<HomePage />} />
        <Route path='/country/:id' element={<Country />} />
      </Routes>
    </Router>
  )
}
export default App