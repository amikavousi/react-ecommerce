import { Routes, Route } from 'react-router';
import { HomePage } from './pages/HomePage.jsx';
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='/test' element={<div>test</div>} />
      </Routes>
    </>
  )
}

export default App
