import './App.css'
import Background from './components/background/background'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login';



function App() {

  return (
    <>
      <Background/>
      <BrowserRouter>
        <div className='routes'>
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
