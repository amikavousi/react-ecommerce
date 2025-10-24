import { Routes, Route } from 'react-router';
import { HomePage } from './pages/HomePage.jsx';
import { CheckoutPage } from './pages/CheckoutPage.jsx';
import './App.css';

function App() {

  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='/checkout' element={<CheckoutPage />} />
        <Route path='/test' element={<div>test</div>} />
      </Routes>
    </>
  )
}

export default App
